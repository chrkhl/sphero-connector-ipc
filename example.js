const ipc = require('node-ipc');

ipc.config.id = 'sphero-connector-ipc-client';
ipc.config.retry = 1500;
ipc.config.silent = true;
ipc.connectTo('sphero-connector-ipc', () => {
  ipc.of['sphero-connector-ipc'].on('connect', () => {
    ipc.of['sphero-connector-ipc'].emit('connectSpheroMini');
    setTimeout(() => {
      ipc.of['sphero-connector-ipc'].emit('setMainLedColor', 'green');
    }, 10000);
  });
});
