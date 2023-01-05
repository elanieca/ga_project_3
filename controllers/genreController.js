import Genre from '../models/genre.js';
import Book from '../models/book.js';

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
    const genre = await Genre.findById(req.params.genreId).populate('books');
    return res.status(200).json(genre);
  } catch (e) {
    next(e);
  }
}

async function createNewGenre(req, res, next) {
  try {
    if (!req.currentUser.isAdmin) {
      return res.status(403).send({ message: 'Unauthorized' });
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
}

async function deleteGenre(req, res, next) {
  try {
    if (!req.currentUser.isAdmin) {
      return res.status(403).json({ message: 'unauthorized' });
    }

    const genre = await Genre.findById(req.params.genreId);

    await Book.updateMany({ genre: genre.name }, { $set: { genre: 'Other' } });

    await Genre.updateOne(
      { name: 'Other' },
      { $push: { books: { $each: genre.books } } }
    );

    await Genre.findByIdAndDelete(req.params.genreId);

    return res
      .status(200)
      .send({ message: `You have successfully deleted ${genre.name}!` });
  } catch (error) {
    next(error);
  }
}

export default {
  createNewGenre,
  getAllGenres,
  getAllBooksForGenre,
  deleteGenre
};
