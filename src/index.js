import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import models, { connectDb } from './models';
import Book from './models/book'; 
import bookRoutes from './routes/book';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/books', bookRoutes);

// Create
app.post('/', (req, res) => { 
  return res.send('Received POST request');
});

// Read/Retrieve
app.get('/:bookIsbn', async (req, res) => {
  console.log(req.params.bookIsbn);
  const book = await Book.findByBookIsbn(req.params.bookIsbn);
  console.log(book);
  // for (let earlId of Object.keys(earls)) {
  //   const earl = earls[earlId];
  //   const user = users[earl.userId];
  //   console.log(user);
  //   if (earl.shortCode === req.params.shortCode) {
  //     return res.redirect(earl.target);
  //   }
  // }
  // return res.status(404).send('EARL not found');
});

// Create
app.post('/users', (req, res) => { 
  return res.send('Received POST request');
});

// Read/Retrieve
app.get('/users', (req, res) => { 
  return res.send(users);
});

app.get('/users/:userId', (req, res) => {
  const user = users[req.params.userId];
  const userBooks = {};

  for (let bookId of Object.keys(books)) {
    const book = books[bookId];
    if (book.bookId === book.id) {
      userBooks[book.id] = book;
    }
  }

  user.books = userBooks;

  return res.send(user);
});

app.get('/users/:param1/:param2', (req, res) => {
  return res.send(`Received GET users request on user/${req.params.userId1}`);
});

// Update
app.put('/users/:userId', (req, res) => { 
  return res.send(`Received PUT users request on user/${req.params.userId}`);
});

// Delete
app.delete('/users/:userId', (req, res) => { 
  return res.send(`Received DELETE users request on user/${req.params.userId}`);
});

const eraseDataOnConnect = process.env.NODE_ENV !== 'production';

connectDb().then(async () => {
  if (eraseDataOnConnect) {
    console.log('Creating default data');
    await Promise.all([
      models.User.deleteMany({}),
      models.Book.deleteMany({}),
    ]);

    createUsersWithBooks();
  }
  app.listen(PORT, () => {
    console.log(`BOOK is running on port ${PORT}!`);
  });
}).catch(err => {
  console.error(err.message);
});

const createUsersWithBooks = async () => {
    const user1 = new models.User({
    bookName: 'To Kill a Mockingbird',
    bookIsbn: '9780446310789',
    bookYear: 'July 11, 1960',
    bookAuthor: 'Harper Lee',
  });
  await user1.save();

  const book1 = new Book({
    bookId: user1.id,
  });
  await book1.save();
};
