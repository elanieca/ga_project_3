// import Brewery from '../models/brewery.js';
import Genre from '../models/genre.js';
import Book from '../models/book.js';
import mongoose from 'mongoose';

async function createNewGenre(req, res, next) {
  
  if (req.currentUser.isAdmin) {
    try {
      const genre = await Genre.create(req.body);

      await Book.updateMany(
        { _id: genre.books },
        { $push: { genre: genre.name } }
      );
      return res.status(201).json(genre);
    } catch (e) {
      next(e);
    }
  }
  return res.status(301).send({ message: 'Unauthorized' });
}


async function getAllGenres(_req, res, next) {
  try {
    const genres = await Genre.find();
    return res.status(200).json(genres);
  } catch (e) {
    next(e);
  }
}

async function getAllBooksForGenre(req, res, next) {
  try {
    const genre = await Genre.findById(req.params.id).populate('books');
    return res.status(200).json(genre);
  } catch (e) {
    next(e);
  }
}

async function deleteGenre(req, res, next) {
  if (req.currentUser.isAdmin) {
    try {
      const genre = await Genre.findById(req.params.genreId);

      await Genre.findByIdAndDelete(req.params.genreId);
      await Book.updateMany(
        { genre: genre.name },
        { $unset: { genre: 1 } }
      );
      
      return res.status(200).send({ message: `You have successfully deleted ${genre.name}!` });
    } catch (error) {
      next(error);
    }
  }
  return res.status(301).send({ message: 'Unauthorized' });
}

export default {
  createNewGenre,
  getAllGenres,
  getAllBooksForGenre,
  deleteGenre,
};
