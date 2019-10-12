import express from 'express';
import mongoose from 'mongoose';
import * as gamePost from './controllers/gamestate';
import * as chatPost from './controllers/chat';
import * as enemyPost from './controllers/enemyboard';
import * as playerPost from './controllers/playerboard';
import SocketIO from 'socket.io';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as gameID from './controllers/game';
import http from 'http';
import { addUser, removeUser, getUser, getUsersInRoom } from './controllers/room';

const app = express();
const httpApp = new http.Server(app);
const io = SocketIO(httpApp);

const port = process.env.PORT || 5005;

io.on('connect', (socket: any) => {
  socket.on('join', (name: any, room: any) => {
    console.log('Username: ' + name + ', room id: ' + room);
    socket.join(room);

    socket.broadcast.to(room).emit('message', `${name} has joined the game.`);
  });
  socket.on('sendMessage', (message: any, roomid: any, user: any) => {
    io.to(roomid).emit('message', message, user);
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

const gsp = io.of('/play');

gsp.on('connection', (socket: any) => {
  console.log('Connected on play');
  socket.on('join', (roomid: any) => {
    socket.join(roomid);
    console.log('Play joined room ' + roomid);
  });

  socket.on('gameStep', (gameState: any) => {
    const roomid = gameState.roomID;
    console.log('Game step in game room ' + gameState.roomID);
    gsp.to(roomid).emit('gameMessage', gameState);
  });
  socket.on('playerBoard', (board: any, room: any) => {
    gsp.to(room).emit('setEnemyBoard', board);
    //console.log(board);
  });
  socket.on('enemyMove', (room: any, x: number, y: number, name: string) => {
    gsp.to(room).emit('enemySendMove', x, y, name);
  });
  socket.on('disconnect', () => {
    console.log('disconnected in play');
  });
});

app.use(cors());
app.use(bodyParser.json());
app.use('/api/gamestate', gamePost.GameRouter);
app.use('/api/chat', chatPost.ChatRouter);
app.use('/api/enemyBoard', enemyPost.EnemyRouter);
app.use('/api/playerBoard', playerPost.PlayerRouter);
app.use(express.static(path.join(__dirname, '/../client/build')));
//app.get('/', (req: any, res: any) => res.sendFile(__dirname + '/../client/build/index.html'));
app.get('/api/gameID', gameID.game);
mongoose.set('useFindAndModify', false);

mongoose.connect(
  'mongodb+srv://rsuser:6kTBc9bPcXUUXAN@reactships-k0rxr.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to DB, +10 points'),
);
app.set('port', port);
httpApp.listen(port, () => console.log('Server Running on port ' + port));
