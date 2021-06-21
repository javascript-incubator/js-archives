function itms() {
  const events = {};

  function on(evt, fn) {
    events[evt] = fn;
    navigator.serviceWorker.addEventListener('message', event => {
      events[`itms-evt-${event.data.message}`]();
    });
  }

  function emit(evt) {
    navigator.serviceWorker.controller.postMessage(`itms-evt-${evt}`);
  }

  return { on, emit };
}

export default itms;
