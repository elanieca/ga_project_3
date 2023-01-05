import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';
import mongooseHidden from 'mongoose-hidden';
import { emailRegex } from '../lib/stringTesters.js';

const userSchema = new mongoose.Schema({
  isAdmin: { type: Boolean },
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (email) => emailRegex.test(email)
  },
  password: {
    type: String,
    required: true,
    validate: (pw) =>
      /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(pw)
  },
  myBooks: [{ type: mongoose.Schema.ObjectId, ref: 'Book' }],
  favoriteBooks: [{ type: mongoose.Schema.ObjectId, ref: 'Book' }]
});

userSchema.pre('save', function encryptPassword(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.plugin(
  mongooseHidden({
    defaultHidden: { password: true, email: true, isAdmin: true }
  })
);

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);
