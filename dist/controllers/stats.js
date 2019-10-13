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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const room_1 = require("./room");
exports.StatRouter = express_1.Router();
const moveStats = { Hits: 0, Misses: 0 };
/** Sends Hits, misses and player count to the client */
exports.StatRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const obj = {
            ActiveUsers: room_1.GetUsers(),
            Hits: moveStats.Hits,
            Misses: moveStats.Misses,
        };
        res.json(obj);
    }
    catch (err) {
        res.json({ message: err });
    }
}));
exports.statHit = () => {
    moveStats.Hits = moveStats.Hits + 1;
    console.log(moveStats);
};
exports.statMiss = () => {
    moveStats.Misses = moveStats.Misses + 1;
};
