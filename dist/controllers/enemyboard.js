"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EnemyBoard_1 = __importDefault(require("../models/EnemyBoard"));
exports.EnemyRouter = express_1.Router();
exports.EnemyRouter.get('/:gameID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mid = req.params.gameID.indexOf('&');
        const id = req.params.gameID.slice(0, mid);
        const name = req.params.gameID.slice(mid + 1, req.params.gameID.length);
        const posts = yield EnemyBoard_1.default.findOne({ roomID: id, player: name });
        res.json(posts);
    }
    catch (err) {
        res.json({ message: err });
    }
}));
exports.EnemyRouter.post('/:gameID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = {
        roomID: req.params.gameID,
        player: req.body.player,
        boardCell: req.body.boardCell,
        lastMoveResult: req.body.lastMoveResult,
        enemyBoard: req.body.enemyBoard,
        importBoard: req.body.importBoard,
        shipCount: req.body.shipCount,
        state: req.body.state,
    };
    try {
        const savedPost = yield EnemyBoard_1.default.findOneAndUpdate({ roomID: req.params.gameID, player: req.body.player }, post, {
            upsert: true,
            new: true,
            runValidators: true,
        });
        res.json(savedPost);
    }
    catch (err) {
        res.json({ message: err });
    }
}));
