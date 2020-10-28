import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import models, { connectDb } from './models';
import Book from './models/book'; 
import bookRoutes from './routes/book';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/books', bookRoutes);

// POST   
//Steps 
// npm Start   
//Use POSTMAN POST > http://localhost:3001/TestBook123/ISBN123/Aug-3-2020/NoBodyImportant
// Use MongoDB to view newly created book.   
app.post('/:bookName/:bookIsbn/:bookYear/:bookAuthor', async (req, res) => { 
  const bookAdded = await Book.addNewBook(req.params.bookName, req.params.bookIsbn, req.params.bookYear, req.params.bookAuthor);
  console.log("book has been inserted" + bookAdded)
});

// GET    
//npm Start
//Use POSTMAN  GET > http://localhost:3001/book1   
//the book1 is hardcoded in index.js,  console log will return the book has been found + book name
app.get('/:bookName', async (req, res) => {
  const bookFound = await Book.findByBookName(req.params.bookName);
  console.log("book has been found" + bookFound)
  });

//erase data on connect
const eraseDataOnConnect = process.env.NODE_ENV !== 'production';

//connect to db and console if it connects and create book 
connectDb().then(async () => {
  if (eraseDataOnConnect) {
    console.log('Creating hardcoded data to test');
    await Promise.all([
      models.Book.deleteMany({}),
    ]);

    createBooks(); 
  }
  app.listen(PORT, () => {
    console.log(`BOOK is running on port ${PORT}!`);
  });
}).catch(err => {
  console.error(err.message);
});

//created hardcoded book function
const createBooks = async () => {
  const book1 = new models.Book({
    bookName: 'book1',
    bookIsbn: '9780446310789',
    bookYear: 'July 11, 1960',
    bookAuthor: 'Harper Lee',
  });
  await book1.save();
}; 
