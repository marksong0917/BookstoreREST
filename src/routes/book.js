import { Router } from 'express';
import Book from '../models/book';

const router = Router();

// Create
router.post('/', async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  return res.send(book);
});

// Read/Retrieve
router.get('/', async (req, res) => { 
  const books = await Book.find({});
  return res.send(books);
});

//get book id 
router.get('/:bookId', async (req, res) => { 
  const book = await Book.findById(req.params.bookId);
  return res.send(book);
});

// Update
router.put('/:bookId', async (req, res) => { 
  const book = await Book.updateOne({ _id: req.params.bookId }, { ...req.body });
  return res.send(`Received PUT books request on user/${req.params.bookId}`);
});

// Delete
router.delete('/:bookId', (req, res) => { 
  return res.send(`Received DELETE books request on user/${req.params.bookId}`);
});

//export 
export default router;