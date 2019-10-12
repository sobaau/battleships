import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const EnemyBoard = new Schema({
  roomID: String,
  player: String,
  boardCell: [
    {
      c: String,
      h: Number,
      hit: Boolean,
      hover: Boolean,
      owner: String,
      w: Number,
      x: Number,
      y: Number,
      part: String,
    },
  ],
  lastMoveResult: String,
  importBoard: [],
  shipCount: {
    Carrier: Number,
    Battleship: Number,
    Cruiser: Number,
    Submarine: Number,
    Destroyer: Number,
  },
  state: {
    GameStatus: Number,
    CurrentTurn: String,
    ShipsRemaining: Number,
  },
});

export default mongoose.model('EnemyBoard', EnemyBoard);
