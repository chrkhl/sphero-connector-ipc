const connector = require('../sphero-connector-core/index.js');

let connectedToy = null;

const connectSpheroMini = async () => {
  console.log('received message \'connectSpheroMini\'');
  connectedToy = await connector.connectSpheroMini();
};

const connectSpheroMiniWithName = async name => {
  console.log('received message \'connectSpheroMiniWithName\'');
  connectedToy = await connector.connectSpheroMiniWithName(name);
};

const connectLightningMcQueen = async () => {
  console.log('received message \'connectLightningMcQueen\'');
  connectedToy = await connector.connectLightningMcQueen();
};

const connectR2D2 = async () => {
  console.log('received message \'connectR2D2\'');
  connectedToy = await connector.connectR2D2();
};

const connectBB9E = async () => {
  console.log('received message \'connectBB9E\'');
  connectedToy = await connector.connectBB9E();
};

const connectToy = async (toyType, toyName) => {
  console.log('received message \'connectToy\'');
  connectedToy = await connector.connectToy(toyType, toyName);
};

const wake = () => {
  console.log('received message \'wake\'');
  if (connectedToy) {
    connectedToy.wake();
  }
};

const sleep = () => {
  console.log('received message \'sleep\'');
  if (connectedToy) {
    connectedToy.sleep();
  }
};

const setMainLedColor = hexColor => {
  console.log(`received message 'setMainLedColor' (hexColor: ${hexColor})`);
  if (connectedToy) {
    connectedToy.wake();
    connectedToy.setMainLedColor(hexColor);
  }
};

module.exports = {
  connectSpheroMini,
  connectSpheroMiniWithName,
  connectBB9E,
  connectR2D2,
  connectLightningMcQueen,
  connectToy,
  wake,
  sleep,
  setMainLedColor,
  isToySupported: connector.isToySupported,
  readConnectOnStartConfig: connector.readConnectOnStartConfig
};
