function itms(events = {}) {
  function on(evt, fn) {
    return itms({ ...events, [evt]: fn });
  }

  function off(evt) {
    return itms({ ...events, [evt]: undefined });
  }

  function deploy() {
    navigator.serviceWorker.addEventListener('message', event => {
      events[event.data.message]();
    });
  }

  return { on, off, deploy };
}

export default itms;
