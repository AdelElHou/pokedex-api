import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ownedPokemons: [{
    type: Number,
    ref: 'Pokemon'
  }]
  
});

export default mongoose.model('User', userSchema);
