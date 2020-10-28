import { Router } from 'express';
import Book from '../models/book';

const router = Router();

// POST
router.post('/', async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  return res.send(book);
});

// GET
router.get('/', async (req, res) => { 
  const books = await Book.find({ });
  return res.send(books);
});

// //get book id 
// router.get('/:bookId', async (req, res) => { 
//   const book = await Book.findById(req.params.bookId);
//   return res.send(book);
// });

//export 
export default router;