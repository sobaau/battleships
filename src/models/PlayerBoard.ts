import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PlayerBoard = new Schema({
  roomID: String,
  player: String,
  exported: Boolean,
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
  state: [
    {
      GameStatus: Number,
      ShipRemaining: Number,
      ShipParts: {
        Carrier: Number,
        Battleship: Number,
        Cruiser: Number,
        Submarine: Number,
        Destroyer: Number,
      },
      screen: {
        width: Number,
        height: Number,
      },
      CurrentShip: String,
      clicks: Number,
    },
  ],
  currentShip: {
    c: String,
    name: String,
    size: Number,
  },
  ships: [
    {
      size: Number,
      name: String,
      c: String,
    },
  ],
  shipCells: [
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
  ship: Number,
});

export default mongoose.model('PlayerBoard', PlayerBoard);
