import express from 'express';
import http from 'http';
import createGame from './public/suite.js';
import * as io from "socket.io";

const app = express();
const server = http.createServer(app);
const sockets = new io.Server(server);

app.use(express.static('public'));


const game = createGame();
// game.start();

game.subscribe((command) => {
  console.log('> Emitting', `${command.type}`);
  sockets.emit(command.type, command);
});
console.log('display:block;', game.state.screen.width)


sockets.on('connection', (socket) => {
  const playerId = socket.id;
  console.log('> Player connected on Server with', playerId);
  game.addPlayer({
    playerId: playerId
  });
  game.addTeleport({
    teleportId: "t1",
    teleportX: 0,
    teleportY: 0
  });
  game.addTeleport({
    teleportId: "t2",
    teleportX: game.state.screen.width - 1,
    teleportY: 0
  });
  game.addTeleport({
    teleportId: "t3",
    teleportX: game.state.screen.width - 1,
    teleportY: game.state.screen.height - 1
  });
  game.addTeleport({
    teleportId: "t4",
    teleportX: 0,
    teleportY: game.state.screen.height - 1
  });
  socket.emit('setup', game.state);

  socket.on('disconnect', () => {
    game.removePlayer({playerId: playerId});
    console.log('remove player');
  });
  socket.on('move-player', (commnad) => {
      commnad.playerId = playerId;
      commnad.type = 'move-player';
      game.movePlayer(commnad);
  });
});


server.listen(3000, () => {
  console.log('Listening port: 3000');
});
