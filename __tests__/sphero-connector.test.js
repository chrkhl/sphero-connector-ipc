const connector = require('../src/sphero-connector');
const core = require('../../sphero-connector-core/index.js');

jest.mock('../../sphero-connector-core/index.js', () => ({
  connectSpheroMini: jest.fn(),
  connectSpheroMiniWithName: jest.fn(),
  connectLightningMcQueen: jest.fn(),
  connectR2D2: jest.fn(),
  connectR2Q5: jest.fn(),
  connectBB9E: jest.fn(),
  connectToy: jest.fn(),
  wake: jest.fn(),
  sleep: jest.fn(),
  setMainLedColor: jest.fn()
}));

describe('sphero-connector', () => {
  const exampleToy = {
    wake: jest.fn(),
    sleep: jest.fn(),
    setMainLedColor: jest.fn()
  };

  beforeEach(() => {
    core.connectSpheroMini.mockReset();
    core.connectSpheroMiniWithName.mockReset();
    core.connectLightningMcQueen.mockReset();
    core.connectR2D2.mockReset();
    core.connectR2Q5.mockReset();
    core.connectBB9E.mockReset();
    core.connectToy.mockReset();
    core.wake.mockReset();
    core.sleep.mockReset();
    core.setMainLedColor.mockReset();
    exampleToy.wake.mockReset();
    exampleToy.sleep.mockReset();
    exampleToy.setMainLedColor.mockReset();
  });

  describe('connectSpheroMini', () => {
    it('returns false when no toy found', async () => {
      core.connectSpheroMini.mockResolvedValue(null);
      expect(await connector.connectSpheroMini()).toBe(false);
    });

    it('returns false when toy scanning throws error', async () => {
      core.connectSpheroMini.mockRejectedValue(null);
      expect(await connector.connectSpheroMini()).toBe(false);
    });

    it('returns true when toy found', async () => {
      core.connectSpheroMini.mockResolvedValue(exampleToy);
      expect(await connector.connectSpheroMini()).toBe(true);
    });
  });

  describe('connectSpheroMiniWithName', () => {
    it('returns false when no toy found', async () => {
      core.connectSpheroMiniWithName.mockResolvedValue(null);
      expect(await connector.connectSpheroMiniWithName('SM-0815')).toBe(false);
    });

    it('returns false when toy scanning throws error', async () => {
      core.connectSpheroMiniWithName.mockRejectedValue(null);
      expect(await connector.connectSpheroMiniWithName('SM-0815')).toBe(false);
    });

    it('returns true when toy found', async () => {
      core.connectSpheroMiniWithName.mockResolvedValue(exampleToy);
      expect(await connector.connectSpheroMiniWithName('SM-0815')).toBe(true);
    });
  });

  describe('connectLightningMcQueen', () => {
    it('returns false when no toy found', async () => {
      core.connectLightningMcQueen.mockResolvedValue(null);
      expect(await connector.connectLightningMcQueen()).toBe(false);
    });

    it('returns false when toy scanning throws error', async () => {
      core.connectLightningMcQueen.mockRejectedValue(null);
      expect(await connector.connectLightningMcQueen()).toBe(false);
    });

    it('returns true when toy found', async () => {
      core.connectLightningMcQueen.mockResolvedValue(exampleToy);
      expect(await connector.connectLightningMcQueen()).toBe(true);
    });
  });

  describe('connectR2D2', () => {
    it('returns false when no toy found', async () => {
      core.connectR2D2.mockResolvedValue(null);
      expect(await connector.connectR2D2()).toBe(false);
    });

    it('returns false when toy scanning throws error', async () => {
      core.connectR2D2.mockRejectedValue(null);
      expect(await connector.connectR2D2()).toBe(false);
    });

    it('returns true when toy found', async () => {
      core.connectR2D2.mockResolvedValue(exampleToy);
      expect(await connector.connectR2D2()).toBe(true);
    });
  });

  describe('connectR2Q5', () => {
    it('returns false when no toy found', async () => {
      core.connectR2Q5.mockResolvedValue(null);
      expect(await connector.connectR2Q5()).toBe(false);
    });

    it('returns false when toy scanning throws error', async () => {
      core.connectR2Q5.mockRejectedValue(null);
      expect(await connector.connectR2Q5()).toBe(false);
    });

    it('returns true when toy found', async () => {
      core.connectR2Q5.mockResolvedValue(exampleToy);
      expect(await connector.connectR2Q5()).toBe(true);
    });
  });

  describe('connectBB9E', () => {
    it('returns false when no toy found', async () => {
      core.connectBB9E.mockResolvedValue(null);
      expect(await connector.connectBB9E()).toBe(false);
    });

    it('returns false when toy scanning throws error', async () => {
      core.connectBB9E.mockRejectedValue(null);
      expect(await connector.connectBB9E()).toBe(false);
    });

    it('returns true when toy found', async () => {
      core.connectBB9E.mockResolvedValue(exampleToy);
      expect(await connector.connectBB9E()).toBe(true);
    });
  });

  describe('connectToy', () => {
    it('returns false when no toy found', async () => {
      core.connectToy.mockResolvedValue(null);
      expect(await connector.connectToy('SpheroMini', 'SM-0815')).toBe(false);
    });

    it('returns false when toy scanning throws error', async () => {
      core.connectToy.mockRejectedValue(null);
      expect(await connector.connectToy('SpheroMini', 'SM-0815')).toBe(false);
    });

    it('returns true when toy found', async () => {
      core.connectToy.mockResolvedValue(exampleToy);
      expect(await connector.connectToy('SpheroMini', 'SM-0815')).toBe(true);
    });
  });

  describe('wake', () => {
    it('returns false when no toy connected', async () => {
      core.connectSpheroMini.mockResolvedValue(null);
      await connector.connectSpheroMini();

      expect(connector.wake()).toBe(false);
    });

    it('returns false when toy connected and wake throws error', async () => {
      core.connectSpheroMini.mockResolvedValue(exampleToy);
      exampleToy.wake.mockImplementation(() => {
        throw new Error();
      });
      await connector.connectSpheroMini();

      expect(connector.wake()).toBe(false);
    });

    it('returns true when toy connected and wake does not throw error', async () => {
      core.connectSpheroMini.mockResolvedValue(exampleToy);
      await connector.connectSpheroMini();

      expect(connector.wake()).toBe(true);
    });
  });

  describe('sleep', () => {
    it('returns false when no toy connected', async () => {
      core.connectSpheroMini.mockResolvedValue(null);
      await connector.connectSpheroMini();

      expect(connector.sleep()).toBe(false);
    });

    it('returns false when toy connected and sleep throws error', async () => {
      core.connectSpheroMini.mockResolvedValue(exampleToy);
      exampleToy.sleep.mockImplementation(() => {
        throw new Error();
      });
      await connector.connectSpheroMini();

      expect(connector.sleep()).toBe(false);
    });

    it('returns true when toy connected and sleep does not throw error', async () => {
      core.connectSpheroMini.mockResolvedValue(exampleToy);
      await connector.connectSpheroMini();

      expect(connector.sleep()).toBe(true);
    });
  });

  describe('setMainLedColor', () => {
    it('returns false when no toy connected', async () => {
      core.connectSpheroMini.mockResolvedValue(null);
      await connector.connectSpheroMini();

      expect(connector.setMainLedColor('#ACADDB')).toBe(false);
    });

    it('returns false when toy connected and setMainLedColor throws error', async () => {
      core.connectSpheroMini.mockResolvedValue(exampleToy);
      exampleToy.setMainLedColor.mockImplementation(() => {
        throw new Error();
      });
      await connector.connectSpheroMini();

      expect(connector.setMainLedColor('#ACADDB')).toBe(false);
    });

    it('returns true when toy connected and setMainLedColor does not throw error', async () => {
      core.connectSpheroMini.mockResolvedValue(exampleToy);
      await connector.connectSpheroMini();

      expect(connector.setMainLedColor('#ACADDB')).toBe(true);
    });
  });
});
