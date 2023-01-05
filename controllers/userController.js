import jwt from 'jsonwebtoken';
import User from '../models/user.js';

import { SECRET } from '../config/environment.js';

const registerUser = async (req, res, next) => {
  try {
    if (req.body.password !== req.body.passwordConfirmation) {
      return res.status(422).json({ message: 'Passwords do not match' });
    }

    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: 'unauthorized' });
    }

    const isValidPassword = user.validatePassword(req.body.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      SECRET,
      { expiresIn: '6h' }
    );

    return res.status(202).send({ token, message: 'login successful' });
  } catch (e) {
    next(e);
  }
};

const getAllUsers = async (_req, res, next) => {
  try {
    const users = await User.find({}, { favoriteBooks: 0 });

    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const getBooksFromUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId, {
      favoriteBooks: 0
    }).populate('myBooks');

    return user
      ? res.status(200).json(user)
      : res
          .status(404)
          .json({ message: `no user with id ${req.params.userId} found` });
  } catch (error) {
    next(error);
  }
};

const getFavoriteBooksFromUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId, {
      myBooks: 0
    }).populate('favoriteBooks');

    if (!user) {
      return res
        .status(404)
        .json({ message: `no user with id ${req.params.userId} found` });
    }

    const isOwner = req.currentUser._id.equals(user._id);

    if (!isOwner) {
      return res.status(403).json({ message: 'unauthorized' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

const addRemoveFavorite = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: `no user with id ${req.params.userId} found` });
    }

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
};

export default {
  registerUser,
  loginUser,
  getAllUsers,
  getBooksFromUser,
  getFavoriteBooksFromUser,
  addRemoveFavorite
};
