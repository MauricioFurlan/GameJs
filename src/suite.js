export default function createGame() {

  const state = {
    players: {},
    fruits: {},
    screen: {
      width: 10,
      height: 10
    }
  };

  function addPlayer(command) {
    const playerId = command.playerId;
    const playerX = command.playerX || 0;
    const playerY = command.playerY || 0;
    state.players[playerId] = {
      x: playerX,
      y: playerY
    };
  }

  function removePlayer(command) {
    const playerId = command.playerId;
    delete state.players[playerId];
  }

  function addFruit(command) {
    const fruitId = command.fruitId;
    const fruitX = command.fruitX || 0;
    const fruitY = command.fruitY || 0;
    state.fruits[fruitId] = {
      x: fruitX,
      y: fruitY
    };
  }

  function removeFruit(command) {
    const fruitId = command.fruitId;
    delete state.fruits[fruitId];
  }

  function movePlayer(command) {
    const player = state.players[command.playerId];
    const acceptedMoves = {
      ArrowUp(player) {
        if (player.y - 1 >= 0) {
          player.y = player.y - 1;
        }
      },
      ArrowRight(player) {
        if (player.x + 1 < state.screen.width) {
          player.x = player.x + 1;
        }
      },
      ArrowDown(player) {
        if (player.y + 1 < state.screen.width) {
          player.y = player.y + 1;
        }
      },
      ArrowLeft(player) {
        if (player.x - 1 >= 0) {
          player.x = player.x - 1;
        }
      }
    };
    const playerId = command.playerId;
    const keyPressed = command.keyPressed;
    const moveFunction = acceptedMoves[keyPressed];
    if (player && moveFunction) {
      moveFunction(player);
    }

  }

  return {
    state,
    addPlayer,
    addFruit,
    removePlayer,
    removeFruit,
    movePlayer
  };
}
