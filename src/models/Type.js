import mongoose from 'mongoose';

const typeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  }
});

export default mongoose.model('Type', typeSchema);
