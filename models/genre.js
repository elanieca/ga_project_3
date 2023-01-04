import mongoose from 'mongoose';

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  books: [{ type: mongoose.Schema.ObjectId, ref: 'Book' }]
});

export default mongoose.model('Genre', genreSchema);
