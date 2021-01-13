export default function createKeyboardListener() {
  const state = {
    observers: [],
    playerId: null
  };

  function registerPlayerId(playerId){
      state.playerId = playerId;
  }

  function subscribe(observerFn) {
    state.observers.push(observerFn);
  }

  function notifyAll(command) {
    console.log(`Notifying ${state.observers.length} observers`);
    for (const observerFn of state.observers) {
      observerFn(command);
    }
  }
  document.addEventListener('keydown', (event) => {
    const keyPressed = event.key;

    const command = {
      playerId: state.playerId,
      keyPressed
    };
    notifyAll(command);

  });
  return {
    subscribe,
    registerPlayerId
  };
}
