const ipc = require('node-ipc');
const connector = require('../sphero-connector-core/index.js');

let connectedToy = null;

ipc.config.id = 'sphero-connector-ipc';
ipc.config.retry = 1500;
ipc.config.silent = true;
ipc.serve(() =>
  {
    ipc.server.on('connectSpheroMini', async () => {
      console.log(`received message 'connectSpheroMini'`);
      connectedToy = await connector.connectSpheroMini();
    });

    ipc.server.on('connectSpheroMiniWithName', async name => {
      console.log(`received message 'connectSpheroMiniWithName'`);
      connectedToy = await connector.connectSpheroMiniWithName(name);
    });

    ipc.server.on('wake', () => {
      console.log(`received message 'wake'`);
      if (connectedToy) {
        connectedToy.wake();
      }
    });

    ipc.server.on('sleep', () => {
      console.log(`received message 'sleep'`);
      if (connectedToy) {
        connectedToy.sleep();
      }
    });

    ipc.server.on('setMainLedColor', hexColor => {
      console.log(`received message 'setMainLedColor' (hexColor: ${hexColor})`);
      if (connectedToy) {
        connectedToy.setMainLedColor(hexColor);
      }
    });
  }
);

ipc.server.start();
