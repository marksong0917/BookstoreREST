const viewPath = "books";
const Book = require("../models/Book");
const User = require("../models/user");

exports.index = async (req, res) => {
  try {
    const books = await Book.find()
      .populate("bookName")
      //.sort({ updatedAt: "desc" });

    res.status(200).json(Books);
  } catch (error) {
    res
      .status(400)
      .json({ message: "there was an error fetching the books", error });
  }
};

exports.show = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("user");

    res.status(200).json(book);
  } catch (error) {
    res
      .status(400)
      .json({ message: "there was an error fetching the books", error });
  }
};

exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: "New Book",
  });
};

exports.create = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({ email: email });

    const book = await Book.create({ user: user._id, ...req.body });

    res.status(200).json(book);
  } catch (error) {
    res
      .status(400)
      .json({ message: "There was an error creating the book", error });
  }
};

exports.edit = async (req, res) => {
  try {
    const book = await book.findById(req.params.id);
    res.render(`${viewPath}/edit`, {
      pageTitle: book.bookName,
      formBook: book,
    });
  } catch (error) {
    req.flash("danger", `There was an error accessing this boo: ${error}`);
    res.redirect("/");
  }
};

exports.update = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({ email: email });

    let book = await Book.findById(req.body.id);
    if (!book) throw new Error("book could not be found");

    const attributes = { user: user._id, ...req.body };
    await Book.validate(attributes);
    await Book.findByIdAndUpdate(attributes.id, attributes);

    req.flash("success", "The book was updated successfully");
    res.redirect(`/books/${req.body.id}`);
  } catch (error) {
    req.flash("danger", `There was an error updating this book: ${error}`);
    res.redirect(`/books/${req.body.id}/edit`);
  }
};

exports.delete = async (req, res) => {
  try {
    console.log(req.body);
    await Book.deleteOne({ _id: req.body.id });
    res.status(200).json({ message: "Yeah" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "there was an error deleting the book", error });
  }
};
