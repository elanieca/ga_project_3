import mongoose from 'mongoose';

const genreSchema = new mongoose.Schema({
  genreName: { type: String, required: true },
  books: [{ type: mongoose.Types.ObjectId, ref: 'Book' }]
});

export default mongoose.model('Genre', genreSchema);
