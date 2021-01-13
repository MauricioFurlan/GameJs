export default function createKeyboardListener() {
  const state = {
    observers: []
  };

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
      playerId: 'player1',
      keyPressed
    };
    notifyAll(command);

  });
  return {
    subscribe
  };
}
