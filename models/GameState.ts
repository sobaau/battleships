import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  CurrentTurn: String,
  Moves: [{ Player: String, Move: String }],
  GameStatus: Number,
  ResP: Boolean,
  ResE: Boolean,
  PlayerName: String,
  EnemyName: String,
  Winner: String,
  EnemyShipsR: Number,
  PlayerShipsR: Number,
  SetupMessages: String,
});

export default mongoose.model('GameState', GameSchema);
