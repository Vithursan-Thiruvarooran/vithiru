import mongoose from 'mongoose';

var Schema = mongoose.Schema;

const gameSchema = mongoose.Schema({
    //username: { type: String, required: ture },
    //players: [{ type: Schema.Types.ObjectId, ref: 'PLayer' }],
    mode: { type: Schema.Types.ObjectId, ref: 'Game_Mode', required: true },
    vp: { type: Number, required: true },
    cardStack: { type: Boolean, required: true },
    winner: { type: Schema.Types.ObjectId, ref: 'Player', required: true},
    duration: { type: Number, required: true }, 
    id: { type: String }
  },
  {
    timestamps: true
  }
);

const Game = mongoose.model('Game', gameSchema);

export default Game;