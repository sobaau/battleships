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
const GameState_1 = __importDefault(require("../models/GameState"));
exports.GameRouter = express_1.Router();
/** Gets and saves data relating to the game State */
exports.GameRouter.get('/:gameID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mid = req.params.gameID.indexOf('&');
        const id = req.params.gameID.slice(0, mid);
        const name = req.params.gameID.slice(mid + 1, req.params.gameID.length);
        const posts = yield GameState_1.default.findOne({ roomID: id });
        res.json(posts);
    }
    catch (err) {
        res.json({ message: err });
    }
}));
exports.GameRouter.post('/:gameID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = {
        roomID: req.params.gameID,
        player: req.body.PlayerName,
        state: req.body.state,
    };
    try {
        const savedPost = yield GameState_1.default.findOneAndUpdate({ roomID: req.params.gameID }, post, {
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
