"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
exports.default = mongoose_1.default.model('EnemyBoard', EnemyBoard);
