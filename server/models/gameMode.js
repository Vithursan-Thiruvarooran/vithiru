import mongoose from 'mongoose';

const modeSchema = mongoose.Schema({
  label: { type: String, required: true },
  id: { type: String }
});

const GameMode = mongoose.model('Game_Mode', modeSchema);

export default GameMode;