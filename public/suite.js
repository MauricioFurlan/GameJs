export default function createGame() {
  const state = {
    players: {},
    fruits: {},
    teleport: {},
    screen: {
      width: 40,
      height: 40
    }
  };

  const observers = [];
  function start() {
    const frequency = 2000;

    setInterval(addFruit, frequency);
  }
  function subscribe(observerFn) {
    observers.push(observerFn);
  }

  function notifyAll(command) {
    console.log(`Notifying ${observers.length} observers`);
    for (const observerFn of observers) {
      observerFn(command);
    }
  }

  function setState(newState){
    Object.assign(state, newState);
  }

function addTeleport(command) {
  const teleportId = command.teleportId;
  const teleportX = command.teleportX;
  const teleportY = command.teleportY;
  state.teleport[teleportId] = {
    x: teleportX,
    y: teleportY
  };
}

  function addPlayer(command) {
    const playerId = command.playerId;
    const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * state.screen.width);
    const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * state.screen.height);
    state.players[playerId] = {
      x: playerX,
      y: playerY
    };
    notifyAll({
      type: 'add-player',
      playerId: playerId,
      playerX: playerX,
      playerY: playerY
    });
  }

  function removePlayer(command) {
    const playerId = command.playerId;
    delete state.players[playerId];

    notifyAll({
      type: 'remove-player',
      playerId: playerId
    });
  }

  function addFruit(command) {
    const fruitId = command ? command.fruitId : Math.floor(Math.random() * 10000000);
    const fruitX = command ? command.fruitX : Math.floor(Math.random() * state.screen.width);
    const fruitY = command ? command.fruitY : Math.floor(Math.random() * state.screen.height);
    state.fruits[fruitId] = {
      x: fruitX,
      y: fruitY
    };
        notifyAll({
          type: 'add-fruit',
          fruitId: fruitId,
          fruitX: fruitX,
            fruitY: fruitY
        });
  }

  function removeFruit(command) {
    const fruitId = command.fruitId;
    delete state.fruits[fruitId];
          notifyAll({
            type: 'remove-fruit',
            fruitId: fruitId,
          });
  }

  function movePlayer(command) {
    notifyAll(command);
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

    const keyPressed = command.keyPressed;
    const moveFunction = acceptedMoves[keyPressed];
    if (player && moveFunction) {
      moveFunction(player);
      checkForFruitCollision();
      checkForTeleportCollision();
    }
  }

  function checkForFruitCollision() {
    for (const playerId in state.players){
      const player = state.players[playerId];
      for (const fruitId in state.fruits) {
      const fruit = state.fruits[fruitId];
        if (player.x === fruit.x && player.y === fruit.y){
          removeFruit({
            fruitId: fruitId
          });
        }
      }
    }
  }

  function position(player, type) {
    const dict = {
      'tp1': () => {
        player.x = state.screen.width - 1;
        player.y = state.screen.height - 1;
      },
      'tp2': () => {
        player.x = 0;
        player.y = 0;
      },
      'tp3': () => {
        player.x = state.screen.width - 1;
        player.y = 0;
      },
      'tp4': () => {
        player.x = 0;
        player.y = state.screen.height - 1;
      }
    };
    dict[type]();
  }
  function checkForTeleportCollision() {
    for (const playerId in state.players) {
      const player = state.players[playerId];
      if (player.x === 0 && player.y == 0) {
          position(player, 'tp1');
      } else if (player.x === 39 && player.y == 39) {
          position(player, 'tp2');
      } else if (player.x === 0 && player.y == 39) {
        position(player, 'tp3');
      } else if (player.x === 39 && player.y == 0) {
        position(player, 'tp4');
      }
  }}


  return {
    state,
    start,
    addTeleport,
    addPlayer,
    addFruit,
    removePlayer,
    removeFruit,
    movePlayer,
    setState,
    subscribe
  };
}
