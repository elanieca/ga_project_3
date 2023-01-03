import express from 'express';

const Router = express.Router();

Router.route('/books').get().post();

Router.route('/books/search').get();

Router.route('/books/:id').get().delete();

Router.route('/genres').get().post();

Router.route('/genres/:id/books').get().delete();

Router.route('/register').post();

export default Router;
