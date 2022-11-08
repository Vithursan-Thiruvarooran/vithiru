import mongoose from 'mongoose';

var Schema = mongoose.Schema;

const gameDiceSchema = mongoose.Schema({
    game: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
    two: { type: Number, required: true },
    three: { type: Number, required: true },
    four: { type: Number, required: true },
    five: { type: Number, required: true },
    six: { type: Number, required: true },
    seven: { type: Number, required: true },
    eight: { type: Number, required: true },
    nine: { type: Number, required: true },
    ten: { type: Number, required: true },
    eleven: { type: Number, required: true },
    twelve: { type: Number, required: true },
  },
  {
    timestamps: true
  }
);

const GameDice = mongoose.model('Game_Dice', gameDiceSchema);

export default GameDice;