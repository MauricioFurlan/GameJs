import express from 'express';
import http from 'http';
import createGame from './public/suite.js';
import * as io from "socket.io";

const app = express();
const server = http.createServer(app);
const sockets = new io.Server(server);

app.use(express.static('public'));


const game = createGame();
game.start();
game.subscribe((command) => {
  console.log('> Emitting', `${command.type}`);
  sockets.emit(command.type, command);
});

game.addPlayer({
  playerId: 'player1'
});
game.movePlayer({playerId:'player1', keyPressed: 'ArrowRight'});
console.log(game.state);

sockets.on('connection', (socket) => {
  const playerId = socket.id;
  console.log('> Player connected on Server with', playerId);
  game.addPlayer({
    playerId: playerId
  });
  console.log(game.state);
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
