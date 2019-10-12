"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
exports.default = mongoose_1.default.model('GameState', GameSchema);
