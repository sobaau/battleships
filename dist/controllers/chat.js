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
const ChatHistory_1 = __importDefault(require("../models/ChatHistory"));
exports.ChatRouter = express_1.Router();
exports.ChatRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield ChatHistory_1.default.find();
        res.json(posts);
    }
    catch (err) {
        res.json({ message: err });
    }
}));
exports.ChatRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = new ChatHistory_1.default({
        messages: req.body.messages,
    });
    try {
        const savedPost = yield post.save();
        res.json(req.body);
    }
    catch (err) {
        res.json({ message: err });
    }
}));
exports.ChatRouter.get('/:gameId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield ChatHistory_1.default.findById(req.params.gameId);
        res.json(post);
    }
    catch (err) {
        res.json({ message: err });
    }
}));
exports.ChatRouter.patch('/:gameId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatePost = yield ChatHistory_1.default.updateOne({ _id: req.params.gameId }, { $set: { messages: req.body.messages } });
        res.json(updatePost);
    }
    catch (err) {
        res.json({ message: err });
    }
}));
