import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: mongoose.Schema.ObjectId, ref: 'Genre', required: true },
    image: { type: String, required: true },
    timeRead: { type: String },
    rating: { type: Number, required: true },
    diaryEntry: { type: String, required: true, min: 1, max: 500 },
    addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Book', bookSchema);
