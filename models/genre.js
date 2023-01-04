import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  books: [{ type: mongoose.Schema.ObjectId, ref: 'Book' }]
});

genreSchema.plugin(uniqueValidator);

export default mongoose.model('Genre', genreSchema);

