## ITMS

_Inter Tabs Messaging System._

#### Setup and Usage

- Add itms worker script in your `service-worker.js`.

`importScripts('https://firebasestorage.googleapis.com/v0/b/firebase-gluon.appspot.com/o/itms-worker.js?alt=media&token=f63e1284-bad7-4079-9242-5fc6daf9219f');`

- Make sure you have included serviceworker in your script using,

`navigator.serviceWorker.register('service-worker.js');`

```javascript
import Itms from 'itms';

const itms = Itms();

// Add Event Listener
itms.on('logout', e =>
  app.setState({
    login: false,
  }),
);

itms.on('login', e =>
  app.setState({
    login: true,
  }),
);

//Emit Events
itms.emit(this.state.login ? 'logout' : 'login');
```
