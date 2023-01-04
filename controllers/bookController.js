import book from '../models/book.js';
import Book from '../models/book.js';
import Genre from '../models/genre.js';
import User from '../models/user.js';

// TODO: addBook, deleteSingleBook, search

const getAllBooks = async (_req, res, next) => {
  try {
    const books = await Book.find();

    return res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

const getSingleBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.bookId);

    return book
      ? res.status(200).json(book)
      : res
          .status(404)
          .json({ message: `No book with id ${req.params.bookId} found` });
  } catch (err) {
    next(err);
  }
};

const addNewBook = async (req, res, next) => {
  try {
    const book = await Book.create({
      ...req.body,
      addedBy: req.currentUser._id
    });

    await Genre.updateOne({ name: book.genre }, { $push: { books: book._id } });

    await User.updateOne(
      { _id: req.currentUser._id },
      { $push: { myBooks: book._id } }
    );

    return res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

const deleteSingleBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.bookId);
    const isAdmin = req.currentUser.isAdmin;
    const isOwner = req.currentUser._id.equals(book.addedBy);

    if (!isAdmin && !isOwner) {
      return res.status(301).json({ message: 'unauthorized' });
    }

    await Genre.updateOne(
      { books: book._id },
      { $pull: { books: { $in: book._id } } }
    );

    await User.updateOne(
      { myBooks: book._id },
      { $pull: { myBooks: { $in: book._id } } }
    );

    await Book.findByIdAndDelete(req.params.bookId);

    return res
      .status(200)
      .json({ message: `deleted book with id ${req.params.bookId}` });
  } catch (err) {
    next(err);
  }
};

const searchBooks = async (req, res, next) => {
  try {
    const { q } = req.query;
    const books = await Book.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { author: { $regex: q, $options: 'i' } },
        { genres: { $regex: q, $options: 'i' } }
      ]
    });

    return res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

export default {
  getAllBooks,
  addNewBook,
  getSingleBook,
  deleteSingleBook,
  searchBooks
};
