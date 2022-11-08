import mongoose from 'mongoose';

var Schema = mongoose.Schema;

const gamePlayersSchema = mongoose.Schema({
    game: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
    player: { type: Schema.Types.ObjectId, ref: 'Player' },
    vp: { type: Number, required: true },
    dcVp: { type: Number, required: true },
    exVp: { type: Number, required: true },
    knights: { type: Number, required: true },
    largestArmy: { type: Boolean, required: true },
    roads: { type: Number, required: true },
    longestRoad: { type: Number, required: true },
    hasLongestRoad: { type: Boolean, required: true },
    cities: { type: Number, required: true },
    settlements: { type: Number, required: true },
    robbed: { type: Number },
    trades: { type: Number },
    id: { type: String }
  },
  {
    timestamps: true
  }
);

const GamePlayer = mongoose.model('Game_Players', gamePlayersSchema);

export default GamePlayer;