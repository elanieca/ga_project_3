import express from 'express';
import secureRoute from '../middleware/secureRoute.js';
import booksController from '../controllers/bookController.js';
import genreController from '../controllers/genreController.js';
import userController from '../controllers/userController.js';

const Router = express.Router();

Router.route('/books')
  .get(booksController.getAllBooks)
  .post(secureRoute, booksController.addNewBook);

Router.route('/books/latest').get(booksController.getLatestBooks);

Router.route('/books/search').get(booksController.searchBooks);

Router.route('/books/:bookId')
  .get(booksController.getSingleBook)
  .delete(secureRoute, booksController.deleteSingleBook);

Router.route('/genres')
  .get(genreController.getAllGenres)
  .post(secureRoute, genreController.createNewGenre);

Router.route('/genres/names').get(genreController.getGenreNames);

Router.route('/genres/:genreId/books')
  .get(genreController.getAllBooksForGenre)
  .delete(secureRoute, genreController.deleteGenre);

Router.route('/register').post(userController.registerUser);

Router.route('/login').post(userController.loginUser);

Router.route('/users').get(userController.getAllUsers);

Router.route('/users/:userId/books').get(userController.getBooksFromUser);

Router.route('/users/:userId/favoriteBooks')
  .get(secureRoute, userController.getFavoriteBooksFromUser)
  .post(secureRoute, userController.addRemoveFavorite);

export default Router;
