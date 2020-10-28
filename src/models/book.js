import mongoose from 'mongoose';
import shortid from 'shortid';

//model for bookschema 
const bookSchema = new mongoose.Schema({
  bookName:{
    type: String,
    required: true,
  },
    bookIsbn:{
    type: String,
    required: true,
  },
    bookYear:{
    type: String,
    required: true,
    },
    bookAuthor:{
        type: String,
        required: true,
    },
    bookId: String,
}, {
  timestamps: true,
  collection: 'Books',
});

//function for find by book ID
bookSchema.statics.findByUserId = async function (bookId) {
  return await this.find({ bookId });
};

//function for find one book by book ISBN 
bookSchema.statics.findByBookIsbn = async function (bookIsbn) {
  console.log(bookIsbn);
  const book = await Book.findOne({
    bookIsbn
  });
  console.log(book);
  return await this.findOne({ bookIsbn });
};

// hmmm   shorter isbn ?  
bookSchema.pre('save', function (next) {
  const book = this;
  if (!book.bookIsbn) {
    book.bookIsbn = shortid.generate();
  }
  next();
});

// 
const Book = mongoose.model('Book', bookSchema);

//export
export default Book;