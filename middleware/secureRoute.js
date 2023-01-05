import jwt from 'jsonwebtoken';
import User from '../models/user.js';

import { SECRET } from '../config/environment.js';

const secureRoute = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith('Bearer')) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    const token = authToken.substring(7);

    jwt.verify(token, SECRET, async (err, data) => {
      if (err) {
        return res.status(401).json({ message: 'unauthorized' });
      }

      const user = await User.findById(data.userId);

      if (!user) {
        return res.status(401).json({ message: 'unauthorized' });
      }

      req.currentUser = user;

      next();
    });
  } catch (err) {
    next(err);
  }
};

export default secureRoute;
