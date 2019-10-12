"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
exports.default = mongoose_1.default.model('PlayerBoard', PlayerBoard);
