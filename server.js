const ipc = require('node-ipc');

const startServer = connector => {
  ipc.config.id = 'sphero-connector-ipc';
  ipc.config.retry = 1500;
  ipc.config.silent = true;
  ipc.serve(() =>
  {
    console.log('server [sphero-connector-ipc] started...');

    ipc.server.on('connectSpheroMini', connector.connectSpheroMini);

    ipc.server.on('connectSpheroMiniWithName', connector.connectSpheroMiniWithName);

    ipc.server.on('wake', connector.wake);

    ipc.server.on('sleep', connector.sleep);

    ipc.server.on('setMainLedColor', connector.setMainLedColor);
  });

  ipc.server.start();
};

module.exports = startServer;
