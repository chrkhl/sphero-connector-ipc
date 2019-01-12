#!/usr/bin/env node
const updateNotifier = require('update-notifier');
const connector = require('./sphero-connector');
const connectorConfig = require('./connector-config');
const pkg = require('./package.json');
const startServer = require('./server');

updateNotifier({ pkg }).notify();

(async () => {
  const config = await connectorConfig.read();

  if (config.connectOnStart) {
    await connector.connectToy(config.connectOnStart.toyType, config.connectOnStart.toyName);
  }

  startServer(connector, config.serviceId);
})();
