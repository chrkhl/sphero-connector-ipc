const cosmiconfig = require('cosmiconfig');
const { readConnectOnStartConfig } = require('./sphero-connector');

const defaultConfig = {
  serviceId: 'sphero-ipc-server',
  connectOnStart: null
};

const isServiceIdValid = serviceId => {
  if (typeof serviceId !== 'string') {
    return false;
  }
  const sanitizedServiceId = serviceId.trim();

  return sanitizedServiceId.length >= 5 && sanitizedServiceId.length <= 30;
};

const readConnectorConfig = async () => {
  const foundConfig = await cosmiconfig('sphero-connector-ipc', { searchPlaces: [ 'package.json' ]}).search();

  if (!foundConfig || !foundConfig.config) {
    console.log('no config found -> using default config');

    return defaultConfig;
  }

  if (!isServiceIdValid(foundConfig.config.serviceId)) {
    throw new Error('serviceId is invalid (must be a string with 5 to 30 characters)');
  }

  return {
    serviceId: foundConfig.config.serviceId,
    connectOnStart: readConnectOnStartConfig(foundConfig.config)
  };
};

module.exports = { read: readConnectorConfig };
