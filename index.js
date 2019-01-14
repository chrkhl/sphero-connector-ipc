#!/usr/bin/env node
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');
const connector = require('./src/sphero-connector');
const { readConnectorConfig } = require('./src/config-reader');
const { startServer } = require('./server');

updateNotifier({ pkg }).notify();

(async () => {
  const config = await readConnectorConfig();

  if (config.connectOnStart) {
    await connector.connectToy(config.connectOnStart.toyType, config.connectOnStart.toyName);
  }

  startServer(connector, config.serviceId);
})();
