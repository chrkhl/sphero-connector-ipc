const connector = require('../sphero-connector-core/index.js');

let connectedToy = null;

const connectSpheroMini = async () => {
  console.log(`received message 'connectSpheroMini'`);
  connectedToy = await connector.connectSpheroMini();
};

const connectSpheroMiniWithName = async name => {
  console.log(`received message 'connectSpheroMiniWithName'`);
  connectedToy = await connector.connectSpheroMiniWithName(name);
}

const wake = () => {
  console.log(`received message 'wake'`);
  if (connectedToy) {
    connectedToy.wake();
  }
};

const sleep = () => {
  console.log(`received message 'sleep'`);
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
  wake,
  sleep,
  setMainLedColor
};
