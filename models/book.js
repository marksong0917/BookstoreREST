import mongoose from 'mongoose';

const mongoose = require("mongoose");

//model for bookschema 
const bookSchema = new mongoose.Schema(
  {
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
  },
  {
  timestamps: true,
  collection: 'Books',
}
);


//function for find one book by book name  / needs the book name to find one
bookSchema.statics.findByBookName = async function (book) 
{
  const myBook = await Book.findOne({bookName: book});
  return await myBook;
}
  
//function for find one book by book name  
bookSchema.statics.addNewBook =  async function (one, two, three, four) 
{
  const myBook = new Book({ bookName: one, bookIsbn: two, bookYear: three, bookAuthor: four });
  return await myBook.save() 
}

bookSchema.statics.deleteOneBook =  async function (book) 
{
  const myBook = await Book.findOneAndDelete({ bookName: book});
  return await myBook.save() 
}

bookSchema.statics.updateOneBook =  async function (book, newBookName) 
{
  const myBook = await Book.findOneAndUpdate({ bookName: book, bookName: newBookName});
  return await myBook.save() 
}

// 
// const Book = mongoose.model('Book', bookSchema);


// //export
// export default Book;

module.exports = mongoose.model("book", BookSchema);