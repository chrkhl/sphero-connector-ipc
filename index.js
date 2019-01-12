#!/usr/bin/env node
'use strict';

const pkg = require('./package.json');
const updateNotifier = require('update-notifier');
const connector = require('./sphero-connector');
const startServer = require('./server');
const cosmiconfig = require('cosmiconfig');

updateNotifier({ pkg }).notify();

(async() => {
  const foundConfig = await cosmiconfig('sphero-connector-ipc', { searchPlaces: [ 'package.json' ] }).search();

  if (!foundConfig) {
    return console.error('config not found!');
  }

  const connectorConfig = foundConfig.config;
  console.log('config stuff', connectorConfig);

  await connector.connectSpheroMini();
  connector.setMainLedColor('#FFFFFF');
  startServer(connector);
})();
