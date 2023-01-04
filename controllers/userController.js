import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Book from '../models/book.js';
import { SECRET } from '../config/environment.js';

async function registerUser(req, res, next) {
  try {
    if (req.body.password !== req.body.passwordConfirmation) {
      return res.status(422).json({ message: 'Passwords do not match' });
    }

    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (e) {
    next(e);
  }
}

async function loginUser(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: 'Unauthorized' });
    }

    const isValidPassword = user.validatePassword(req.body.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      SECRET,
      { expiresIn: '6h' }
    );

    return res.status(202).send({ token, message: 'Login Successful!' });
  } catch (e) {
    next(e);
  }
}

async function getBooksFromUser(req, res, next) {
  try {
    const user = await User.findById(req.params.userId).populate('myBooks');
    return user
      ? res.status(200).json(user)
      : res.status(404).json({ message: 'No user found' });
  } catch (error) {
    next(error);
  }
}

async function getFavoriteBooksFromUser(req, res, next) {
  try {
    const user = await User.findById(req.currentUser._id).populate(
      'favoriteBooks'
    );
    return user
      ? res.status(200).json(user)
      : res.status(404).json({ message: 'No user found' });
  } catch (error) {
    next(error);
  }
}

async function getAllUsers(_req, res, next) {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
}

async function addRemoveFavorite(req, res, next) {
  try {
    const user = User.findById(req.params.userId);

    const isOwner = req.currentUser._id.equals(user._id);
    const isFavorite = user.favoriteBooks.includes(req.body.bookId);

    if (!isOwner) {
      return res.status(403).json({ message: 'unauthorized' });
    }

    if (!isFavorite) {
      await User.updateOne(
        { _id: user._id },
        { $push: { favoriteBooks: req.body.bookId } }
      );

      return res.status(200).json({
        message: `added book with id ${req.body.bookId} to favorites`
      });
    }

    if (isFavorite) {
      await User.updateOne(
        { _id: user._id },
        { $pull: { favoriteBooks: { $in: req.body.bookId } } }
      );

      return res.status(200).json({
        message: `removed book with id ${req.body.bookId} from favorites`
      });
    }
  } catch (err) {
    next(err);
  }
}

export default {
  registerUser,
  loginUser,
  getBooksFromUser,
  getFavoriteBooksFromUser,
  addRemoveFavorite,
  getAllUsers
};
