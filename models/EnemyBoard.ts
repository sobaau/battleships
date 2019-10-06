import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const EnemyBoard = new Schema({
  player: String,
  Ship: [
    { type: String, size: Number, number: Number },
    { type: String, size: Number, number: Number },
    { type: String, size: Number, number: Number },
    { type: String, size: Number, number: Number },
    { type: String, size: Number, number: Number },
  ],
  board: [Number],
});

export default mongoose.model('EnemyBoard', EnemyBoard);
