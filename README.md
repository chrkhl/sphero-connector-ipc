[![npm version](https://img.shields.io/npm/v/sphero-connector-ipc.svg?style=flat)](https://www.npmjs.org/package/sphero-connector-ipc)
[![Dependency Status](https://david-dm.org/chrkhl/sphero-connector-ipc.svg)](https://david-dm.org/chrkhl/sphero-connector-ipc)
[![devDependency Status](https://david-dm.org/chrkhl/sphero-connector-ipc/dev-status.svg)](https://david-dm.org/chrkhl/sphero-connector-ipc#info=devDependencies)
[![Build Status](https://travis-ci.org/chrkhl/sphero-connector-ipc.svg?branch=master)](https://travis-ci.org/chrkhl/sphero-connector-ipc)
[![Coverage](https://coveralls.io/repos/github/chrkhl/sphero-connector-ipc/badge.svg?branch=master)](https://coveralls.io/github/chrkhl/sphero-connector-ipc?branch=master)

<img src="https://rawcdn.githack.com/chrkhl/sphero-connector-ipc/b2db514ad709c1f32885d91300493acb3547d1ef/assets/sphero-connector-ipc.svg" alt="Sphero Connector IPC" width="400" />

# Sphero Connector IPC

This is a small CLI tool to run an [node-ipc](https://github.com/RIAEvangelist/node-ipc) based inter-process-communication service for connecting and controlling Sphero toys via IPC messages. It uses [Sphero Connector Core](https://github.com/chrkhl/sphero-connector-core), a tiny wrapper around the [unofficial Sphero V2 API](https://github.com/igbopie/spherov2.js) for communicating with Sphero toys.


## Getting Started

Install Sphero-Connector-IPC via [npm](https://docs.npmjs.com/cli/npm):

```bash
npm install --save sphero-connector-ipc
```

Add npm run script to your `package.json`:

```json
{
  "scripts": {
    "sphero-connector-ipc": "sphero-connector-ipc"
  }
}
```

Add the following section to your `package.json`:

```json
{
  "sphero-connector": {
    "type": "ipc"
  }
}
```

Finally, run `npm run sphero-connector-ipc` and sphero-connector-ipc will start an ipc service with id `sphero-ipc-server` listening for ipc messages.


## Configuration

### Service ID

By default, the ipc services started by sphero-connector-ipc is named `sphero-ipc-server`.
You can change the service id in the `sphero-connector` section of your package.json as follows:

```json
{
  "sphero-connector": {
    "type": "ipc",
    "serviceId": "my-custom-service-id"
  }
}
```

Note: valid `serviceId` values must be strings from 5 to 30 characters.


### Connect with toy on startup

To auto-connect with a Sphero toy on start, you can specify the toy type and name in your package.json.

```json
{
  "sphero-connector": {
    "type": "ipc",
    "connectOnStart": {
      "toyType": "SpheroMini",
      "toyName": "SM-0815"
    }
  }
}
```

Valid values for `toyType` are: `SpheroMini`, `LightningMcQueen`, `R2D2`, `R2Q5`, `BB9E`.
The `toyName` option is currently only supported for `toyType: "SpheroMini"`.


### Supported IPC messages

* `connectSpheroMini`
* `connectSpheroMiniWithName` (toyName: string)
* `connectLightningMcQueen`
* `connectR2D2`
* `connectR2Q5`
* `connectBB9E`
* `wake`
* `sleep`
* `setMainLedColor` (hexColor: string)


## Example: Connect Sphero Mini and set main LED to red

``` javascript
const ipc = require('node-ipc');
const delay = require('delay');

ipc.config.id = 'my-sphero-ipc-client';
ipc.config.retry = 1500;
ipc.config.silent = true;


ipc.connectTo('sphero-ipc-server', () => {
  ipc.of['sphero-ipc-server'].on('connect', async () => {
    ipc.of['sphero-ipc-server'].emit('connectSpheroMini');
    await delay(10000);
    ipc.of['sphero-ipc-server'].emit('setMainLedColor', '#FF0000');
  });
});

```

## License

Please be aware of the licenses of the components used in this project.
Everything else that has been developed by the contributions to this project is under [MIT License](LICENSE).
