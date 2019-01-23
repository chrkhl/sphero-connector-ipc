const cosmiconfig = require('cosmiconfig');
const { readConnectorConfig } = require('../src/config-reader');

jest.mock('sphero-connector-core', () => ({
  readConnectOnStartConfig: jest.fn().mockReturnValue(null)
}));
jest.mock('cosmiconfig', () => jest.fn());

describe('config-reader', () => {
  describe('readConnectorConfig', () => {
    beforeEach(() => {
      cosmiconfig.mockReset();
    });

    it('calls cosmiconfig with expected parameters', async () => {
      cosmiconfig.mockReturnValue({
        search: () => null
      });
      try {
        await readConnectorConfig();
      } catch (error) {} // eslint-disable-line

      expect(cosmiconfig).toHaveBeenCalledWith('sphero-connector', { searchPlaces: [ 'package.json' ]});
    });

    it('throws error when config not found', async () => {
      let thrownError;

      cosmiconfig.mockReturnValue({
        search: () => null
      });

      try {
        await readConnectorConfig();
      } catch (error) {
        thrownError = error;
      }

      expect(thrownError.message).toBe('config \'sphero-connector\' not found in package.json');
    });

    it('throws error when config missed property config', async () => {
      let thrownError;

      cosmiconfig.mockReturnValue({
        search: () => ({})
      });

      try {
        await readConnectorConfig();
      } catch (error) {
        thrownError = error;
      }

      expect(thrownError.message).toBe('config \'sphero-connector\' not found in package.json');
    });

    it('throws error when configured type is not ipc', async () => {
      let thrownError;

      cosmiconfig.mockReturnValue({
        search: () => ({
          config: {
            type: 'carrierPigeon'
          }
        })
      });

      try {
        await readConnectorConfig();
      } catch (error) {
        thrownError = error;
      }

      expect(thrownError.message).toBe(`'sphero-connector' type is not set to 'ipc'`);
    });

    it('throws error when serviceId is not a string', async () => {
      let thrownError;

      cosmiconfig.mockReturnValue({
        search: () => ({
          config: {
            type: 'ipc',
            serviceId: 666
          }
        })
      });

      try {
        await readConnectorConfig();
      } catch (error) {
        thrownError = error;
      }

      expect(thrownError.message).toBe('serviceId is invalid (must be a string with 5 to 30 characters)');
    });

    it('throws error when serviceId has less than 5 characters', async () => {
      let thrownError;

      cosmiconfig.mockReturnValue({
        search: () => ({
          config: {
            type: 'ipc',
            serviceId: '1234'
          }
        })
      });

      try {
        await readConnectorConfig();
      } catch (error) {
        thrownError = error;
      }

      expect(thrownError.message).toBe('serviceId is invalid (must be a string with 5 to 30 characters)');
    });

    it('throws error when serviceId has more than 30 characters', async () => {
      let thrownError;

      cosmiconfig.mockReturnValue({
        search: () => ({
          config: {
            type: 'ipc',
            serviceId: '0123456789012345678901234567890'
          }
        })
      });

      try {
        await readConnectorConfig();
      } catch (error) {
        thrownError = error;
      }

      expect(thrownError.message).toBe('serviceId is invalid (must be a string with 5 to 30 characters)');
    });

    it('returns expected object with default service \'sphero-ipc-server\' when no other serviceId configured', async () => {
      cosmiconfig.mockReturnValue({
        search: () => ({
          config: {
            type: 'ipc'
          }
        })
      });

      const actual = await readConnectorConfig();
      const expected = {
        serviceId: 'sphero-ipc-server',
        connectOnStart: null
      };

      expect(actual).toEqual(expected);
    });
  });
});
