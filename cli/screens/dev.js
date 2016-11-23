'use strict';

// ======================
// Depends
// ======================
const blessed = require('blessed');
const colors = require('colors');

/**
 * Dev mode screen
 * @param  {[type]} __CWD    [description]
 * @param  {[type]} __ROOT   [description]
 * @param  {[type]} compiler [description]
 * @return {[type]}          [description]
 */
module.exports = function(config = {}) {

  // Create a screen object.
  const screen = blessed.screen({
    smartCSR: true,
    dockBorders: false,
    autoPadding: true
  });

  screen.title = 'Rocket Ship';

  // top-left memory block
  const memoryBlock = blessed.box({
    parent: screen,
    content: colors.blue.bold(' Initialize '),
    scrollable: true,
    keys: true,
    label: colors.green.bold(' Memory: '),
    vi: true,
    alwaysScroll: true,
    scrollbar: {
      ch: ' ',
      bg: 'blue'
    },
    padding: 1,
    style: {
      fg: 'white',
      border: {
        fg: 'blue'
      }
    },
    border: {
      type: 'line'
    },
    width: '49%',
    height: '10%',
    left: 0,
    top: '0%'
  });

  // top-right cpu block
  const cpuBlock = blessed.box({
    parent: screen,
    content: colors.blue.bold(' Initialize '),
    scrollable: true,
    keys: true,
    label: colors.green.bold(' CPU: '),
    vi: true,
    alwaysScroll: true,
    scrollbar: {
      ch: ' ',
      bg: 'blue'
    },
    padding: 1,
    style: {
      fg: 'white',
      border: {
        fg: 'blue'
      }
    },
    border: {
      type: 'line'
    },
    width: '50%',
    height: '10%',
    right: 0,
    top: '0%'
  });

  // compiling info block
  const compilingBlock = blessed.box({
    parent: screen,
    scrollable: true,
    keys: true,
    label: colors.green.bold(' Webpack: '),
    content: colors.blue.bold(' Initialize '),
    padding: 1,
    style: {
      fg: 'white',
      border: {
        fg: 'blue'
      }
    },
    border: {
      type: 'line'
    },
    width: '49%',
    height: '10%',
    left: 0,
    top: '10%'
  });

  // active processes block
  const activeProcessBlock = blessed.text({
    parent: screen,
    scrollable: true,
    keys: true,
    label: colors.green.bold(' Active process: '),
    content: colors.blue.bold(' Initialize '),
    padding: 1,
    style: {
      fg: 'white',
      border: {
        fg: 'blue'
      }
    },
    border: {
      type: 'line'
    },
    width: '50%',
    height: '10%',
    right: 0,
    top: '10%'
  });

  // logs block
  const logsBlock = blessed.log({
    parent: screen,
    scrollable: true,
    label: colors.green.bold(' Logs: '),
    width: '100%',
    height: '81%',
    left: 0,
    bottom: 0,
    padding: {
      top: 1,
      left: 2
    },
    border: {
      type: 'ascii'
    },
    keys: true,
    scrollbar: {
      ch: ' ',
      bg: 'blue'
    },
    style: {
      focus: {
        border: {
          fg: 'yellow'
        }
      }
    }
  });

  // Focus our element.
  logsBlock.focus();

  // render
  screen.render();

  // quit on Escape, q, or Control-C.
  screen.key(['enter'], function() {
    logsBlock.setContent(colors.green.bold('( ͡° ͜ʖ ͡°) | clear lines'));
    screen.render();
  });

  // quit on Escape, q, or Control-C.
  screen.key(['escape', 'q', 'C-c'], function() {
    process.exit(0);
  });

  // scope of screens
  return {
    memoryBlock,        cpuBlock,   compilingBlock,
    activeProcessBlock, logsBlock,
    screen
  };
};
