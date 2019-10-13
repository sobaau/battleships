"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const gamePost = __importStar(require("./controllers/gamestate"));
const chatPost = __importStar(require("./controllers/chat"));
const enemyPost = __importStar(require("./controllers/enemyboard"));
const playerPost = __importStar(require("./controllers/playerboard"));
const statPost = __importStar(require("./controllers/stats"));
const socket_io_1 = __importDefault(require("socket.io"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const gameID = __importStar(require("./controllers/game"));
const http_1 = __importDefault(require("http"));
const room_1 = require("./controllers/room");
const app = express_1.default();
const httpApp = new http_1.default.Server(app);
const io = socket_io_1.default(httpApp);
const port = process.env.PORT || 5005;
/** Using Socket IO to send chat messages between the two clients */
io.on('connect', (socket) => {
    socket.on('join', (name, room) => {
        socket.join(room);
        socket.broadcast.to(room).emit('message', `${name} has joined the game.`);
        room_1.addUser({ name: name, room: room });
        room_1.addRoom({ room: room });
    });
    socket.on('sendMessage', (message, roomid, user) => {
        io.to(roomid).emit('message', message, user);
    });
    socket.on('disconnect', () => { });
});
const gsp = io.of('/play');
/** Using Socket IO to send game messages between the two clients */
gsp.on('connection', (socket) => {
    socket.on('join', (roomid) => {
        socket.join(roomid);
    });
    socket.on('gameStep', (gameState) => {
        const roomid = gameState.roomID;
        gsp.to(roomid).emit('gameMessage', gameState);
    });
    socket.on('playerBoard', (board, room) => {
        gsp.to(room).emit('setEnemyBoard', board);
    });
    socket.on('enemyMove', (room, x, y, name) => {
        gsp.to(room).emit('enemySendMove', x, y, name);
    });
    socket.on('hit', () => {
        console.log('hit');
        statPost.statHit();
    });
    socket.on('miss', () => {
        statPost.statMiss();
    });
    socket.on('disconnect', () => { });
});
app.use(cors_1.default());
app.use(body_parser_1.default.json());
/** Custom routes */
app.use('/api/gamestate', gamePost.GameRouter);
app.use('/api/chat', chatPost.ChatRouter);
app.use('/api/enemyBoard', enemyPost.EnemyRouter);
app.use('/api/playerBoard', playerPost.PlayerRouter);
app.use('/api/stats', statPost.StatRouter);
app.use(express_1.default.static(path_1.default.join(__dirname, '/../client/build')));
//app.get('/', (req: any, res: any) => res.sendFile(__dirname + '/../client/build/index.html'));
app.get('/api/gameID', gameID.game);
mongoose_1.default.set('useFindAndModify', false);
/** DB connection to atlas */
mongoose_1.default.connect('mongodb+srv://rsuser:6kTBc9bPcXUUXAN@reactships-k0rxr.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to DB'));
app.set('port', port);
httpApp.listen(port, () => console.log('Server Running on port ' + port));
