const Book = require("../models/Book");
const User = require("../models/user");

const getUser = async req => {
  const { user: email } = req.session.passport;
  return await User.findOne({email: email});
}

exports.index = async (req, res) => {
  try {
    const user = await getUser(req);

    const books = await Book
      .find({user: user._id})
      .populate('user')

    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(400).json({status: 'failed', message: `There was an error in retrieving the books.`, error});
  }
};

exports.show = async (req, res) => {
  try {
    const user = await getUser(req);

    const book = await Book
      .findOne({user: user._id, _id: req.params.id})
      .populate('user');
      
    if (!book) throw new Error('Book could not be found');
    
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(400).json({status: 'failed', message: `There was an error in retrieving the book.`, error});
  }
};

exports.create = async (req, res) => {
  try {
    const user = await getUser(req);

    const book = await Book.create({user: user._id, ...req.body});

    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(400).json({status: 'failed', message: `There was an error in creating the book.`, error});
  }
};

exports.update = async (req, res) => {
  try {
    const user = await getUser(req);
    let book = await Book
      .findOne({user: user._id, _id: req.body.id});
    
    if (!book) throw new Error('book could not be found');
    
    const attributes = {user: user._id, ...req.body};
    await Book.validate(attributes);   

    await Book.updateOne({_id: req.body.id, user: user._id}, {...req.body});

    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(400).json({status: 'failed', message: `There was an error in updating the book.`, error});
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await getUser(req);
    let book = await Book
      .findOne({user: user._id, _id: req.body.id});
      if (!book) throw new Error('Book could not be found');

    await Book.deleteOne({_id: req.body.id, user: user._id});

    res.status(200).json({message: 'Book was deleted successfully'});
  } catch (error) {
    console.error(error);
    res.status(400).json({status: 'failed', message: `There was an error in deleting the book.`, error});
  }
};

