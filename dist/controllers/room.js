"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const activeUsers = [];
const Rooms = [];
exports.addUser = ({ id, username, roomid }) => {
    const user = { id, username, roomid };
    activeUsers.push(user);
    return { user };
};
exports.addRoom = ({ roomid }) => {
    const room = { roomid };
    if (Rooms.includes(room.roomid)) {
        return;
    }
    Rooms.push(room);
};
exports.GetUsers = () => {
    return activeUsers.length;
};
exports.GetGames = () => {
    return activeUsers.length;
};
