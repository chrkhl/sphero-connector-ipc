const cosmiconfig = require('cosmiconfig');
const { readConnectOnStartConfig } = require('./sphero-connector');

const isServiceIdValid = serviceId => {
  if (typeof serviceId !== 'string') {
    return false;
  }
  const sanitizedServiceId = serviceId.trim();

  return sanitizedServiceId.length >= 5 && sanitizedServiceId.length <= 30;
};

const readConnectorConfig = async () => {
  const foundConfig = await cosmiconfig('sphero-connector', { searchPlaces: [ 'package.json' ]}).search();

  if (!foundConfig || !foundConfig.config) {
    throw new Error(`config 'sphero-connector' not found in package.json`);
  }

  if (foundConfig.config.type !== 'ipc') {
    throw new Error(`'sphero-connector' type is not set to 'ipc'`);
  }

  const serviceId = foundConfig.config.serviceId || 'sphero-ipc-server';

  if (!isServiceIdValid(serviceId)) {
    throw new Error('serviceId is invalid (must be a string with 5 to 30 characters)');
  }

  return {
    serviceId,
    connectOnStart: readConnectOnStartConfig(foundConfig.config)
  };
};

module.exports = { read: readConnectorConfig };
