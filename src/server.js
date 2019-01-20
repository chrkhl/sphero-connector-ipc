const ipc = require('node-ipc');

const startServer = (connector, serviceId) => {
  ipc.config.id = serviceId;
  ipc.config.retry = 1500;
  ipc.config.silent = true;
  ipc.serve(() => {
    console.log(`ipc server [${serviceId}] started...`);

    ipc.server.on('connectSpheroMini', connector.connectSpheroMini);

    ipc.server.on('connectSpheroMiniWithName', connector.connectSpheroMiniWithName);

    ipc.server.on('connectLightningMcQueen', connector.connectLightningMcQueen);

    ipc.server.on('connectR2D2', connector.connectR2D2);

    ipc.server.on('connectR2Q5', connector.connectR2Q5);

    ipc.server.on('connectBB9E', connector.connectBB9E);

    ipc.server.on('wake', connector.wake);

    ipc.server.on('sleep', connector.sleep);

    ipc.server.on('setMainLedColor', connector.setMainLedColor);
  });

  ipc.server.start();
};

module.exports = {
  startServer
};
