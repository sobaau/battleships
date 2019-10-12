import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  roomID: String,
  player: String,
  state: {
    GameState: {
      CurrentShip: String,
      CurrentTurn: String,
      Moves: [{ Player: String, Move: String }],
      GameStatus: Number,
      Winner: String,
      EnemyShipsR: Number,
      PlayerShipsR: Number,
      SetupMessages: [String],
    },
  },
});

export default mongoose.model('GameState', GameSchema);
