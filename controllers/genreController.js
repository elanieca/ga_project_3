import Genre from '../models/genre.js';
import Book from '../models/book.js';

const getAllGenres = async (_req, res, next) => {
  try {
    const genres = await Genre.find();

    return res.status(200).json(genres);
  } catch (e) {
    next(e);
  }
};

const getGenreNames = async (_req, res, next) => {
  try {
    const genres = await Genre.find({}, { books: 0 });

    return res.status(200).json(genres);
  } catch (err) {
    next();
  }
};

const getAllBooksForGenre = async (req, res, next) => {
  try {
    const genre = await Genre.findById(req.params.genreId).populate('books');

    return genre
      ? res.status(200).json(genre)
      : res
          .status(404)
          .json({ message: `no genre with ${req.params.genreId} found` });
  } catch (e) {
    next(e);
  }
};

const createNewGenre = async (req, res, next) => {
  try {
    if (!req.currentUser.isAdmin) {
      return res.status(403).send({ message: 'unauthorized' });
    }

    const genre = await Genre.create(req.body);

    await Genre.updateMany(
      { $and: [{ _id: { $nin: genre._id } }, { books: { $in: genre.books } }] },
      { $pull: { books: { $in: genre.books } } }
    );

    await Book.updateMany(
      { _id: { $in: genre.books } },
      { $set: { genre: genre.name } }
    );

    return res.status(201).json(genre);
  } catch (e) {
    next(e);
  }
};

const deleteGenre = async (req, res, next) => {
  try {
    if (!req.currentUser.isAdmin) {
      return res.status(403).json({ message: 'unauthorized' });
    }

    const genre = await Genre.findById(req.params.genreId);

    if (!genre) {
      return res
        .status(404)
        .json({ message: `no genre with id ${req.params.genreId} found` });
    }

    await Book.updateMany({ genre: genre.name }, { $set: { genre: 'Other' } });

    await Genre.updateOne(
      { name: 'Other' },
      { $push: { books: { $each: genre.books } } }
    );

    await Genre.findByIdAndDelete(req.params.genreId);

    return res
      .status(200)
      .send({ message: `successfully deleted ${genre.name}` });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllGenres,
  getGenreNames,
  getAllBooksForGenre,
  createNewGenre,
  deleteGenre
};
