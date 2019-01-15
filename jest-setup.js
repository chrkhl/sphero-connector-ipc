const noop = () => {}; // eslint-disable-line

const muteLogging = () => {
  console.info = noop;
  console.log = noop;
  console.error = noop;
  console.warn = noop;
  console.debug = noop;
};

muteLogging();
