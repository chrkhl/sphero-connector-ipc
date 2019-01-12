#!/usr/bin/env node
'use strict';

const connector = require('./sphero-connector');
const startServer = require('./server');

(async() => {
  await connector.connectSpheroMini();
  connector.setMainLedColor('#FFFFFF');
  startServer(connector);
})();
