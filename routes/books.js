const { index, show, create, update, delete: _delete } = require('../controllers/BooksContrller');

module.exports = router => {
  router.get('/books', index);
  router.get('/books/:id', show);
  router.post('/books', create);
  router.post('/books/update', update);
  router.post('/books/delete', _delete);
};