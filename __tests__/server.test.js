const { startServer } = require('../src/server');
const ipc = require('node-ipc');

jest.mock('node-ipc', () => ({
  config: {},
  serve: callback => {
    callback();
  },
  server: {
    start: jest.fn(),
    on: jest.fn()
  }
}));

const connector = {
  connectSpheroMini: jest.fn(),
  connectSpheroMiniWithName: jest.fn(),
  connectLightningMcQueen: jest.fn(),
  connectR2D2: jest.fn(),
  connectR2Q5: jest.fn(),
  connectBB9E: jest.fn(),
  wake: jest.fn(),
  sleep: jest.fn(),
  setMainLedColor: jest.fn()
};

describe('server', () => {
  beforeEach(() => {
    ipc.config = {};
  });

  it('works', () => {
    const serviceId = 'sphero-ipc-server';

    startServer(connector, serviceId);

    expect(ipc.config.id).toBe(serviceId);
    expect(ipc.config.retry).toBe(1500);
    expect(ipc.config.silent).toBe(true);

    expect(ipc.server.on).toHaveBeenCalledWith('connectSpheroMini', connector.connectSpheroMini);
    expect(ipc.server.on).toHaveBeenCalledWith('connectSpheroMiniWithName', connector.connectSpheroMiniWithName);
    expect(ipc.server.on).toHaveBeenCalledWith('connectLightningMcQueen', connector.connectLightningMcQueen);
    expect(ipc.server.on).toHaveBeenCalledWith('connectR2D2', connector.connectR2D2);
    expect(ipc.server.on).toHaveBeenCalledWith('connectR2Q5', connector.connectR2Q5);
    expect(ipc.server.on).toHaveBeenCalledWith('connectBB9E', connector.connectBB9E);
    expect(ipc.server.on).toHaveBeenCalledWith('wake', connector.wake);
    expect(ipc.server.on).toHaveBeenCalledWith('sleep', connector.sleep);
    expect(ipc.server.on).toHaveBeenCalledWith('setMainLedColor', connector.setMainLedColor);

    expect(ipc.server.start).toHaveBeenCalledTimes(1);
  });
});
