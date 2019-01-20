const connector = require('../../sphero-connector-core/index.js');

let connectedToy = null;

const isToyConnected = () => Boolean(connectedToy);

const safeConnect = async connectAction => {
  try {
    connectedToy = await connectAction();

    return isToyConnected();
  } catch (error) {
    console.error('connect failed', error);

    return false;
  }
};

const safeToyAction = toyAction => {
  if (!isToyConnected()) {
    console.error('toy action not possible -> no toy connected');

    return false;
  }

  try {
    toyAction();

    return true;
  } catch (error) {
    console.error('toy action failed', error);

    return false;
  }
};

const connectSpheroMini = async () => await safeConnect(connector.connectSpheroMini);

const connectSpheroMiniWithName = async name => {
  const connectAction = async () => await connector.connectSpheroMiniWithName(name);

  return await safeConnect(connectAction);
};

const connectLightningMcQueen = async () => await safeConnect(connector.connectLightningMcQueen);

const connectR2D2 = async () => await safeConnect(connector.connectR2D2);

const connectR2Q5 = async () => await safeConnect(connector.connectR2Q5);

const connectBB9E = async () => await safeConnect(connector.connectBB9E);

const connectToy = async (toyType, toyName) => {
  const connectAction = async () => await connector.connectToy(toyType, toyName);

  return await safeConnect(connectAction);
};

const wake = () => safeToyAction(() => connectedToy.wake());

const sleep = () => safeToyAction(() => connectedToy.sleep());

const setMainLedColor = hexColor => {
  const toyAction = () => {
    connectedToy.wake();
    connectedToy.setMainLedColor(hexColor);
  };

  return safeToyAction(toyAction);
};

module.exports = {
  connectSpheroMini,
  connectSpheroMiniWithName,
  connectBB9E,
  connectR2D2,
  connectR2Q5,
  connectLightningMcQueen,
  connectToy,
  wake,
  sleep,
  setMainLedColor,
  isToySupported: connector.isToySupported,
  readConnectOnStartConfig: connector.readConnectOnStartConfig
};
