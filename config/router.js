import express from 'express';
import secureRoute from '../middleware/secureRoute.js';
import booksController from '../controllers/bookController.js';

const Router = express.Router();

// Router.route('/books').get().post();

// Router.route('/books/search').get();

// Router.route('/books/:bookId').get().delete();

// Router.route('/genres').get().post();

// Router.route('/genres/:genreId/books').get().delete();

// Router.route('/register').post();

// Router.route('/login').post();

// Router.route('/users/:userId/books').get();

// Router.route('/users/:userId/favorites').get().post() // post req body icludes bookId & if isLiked = true

Router.route('/books')
  .get(booksController.getAllBooks)
  .post(secureRoute, booksController.addNewBook);

Router.route('/books/search').get(booksController.searchBooks);

Router.route('/books/:bookId')
  .get(booksController.getSingleBook)
  .delete(secureRoute, booksController.deleteSingleBook);

Router.route('/genres')
  .get(genreController.getAllGenres)
  .post(secureRoute, genreController.createNewGenre);

Router.route('/genres/:genreId/books')
  .get(genreController.getAllBooksForGenre)
  .delete(secureRoute, genreController.deleteGenre);

export default Router;

