import mongoose from 'mongoose';

const playerSchema = mongoose.Schema({
  //username: { type: String, required: ture },
  username: { type: String, required: true },
  id: { type: String }
});

const Player = mongoose.model('Player', playerSchema);

export default Player;