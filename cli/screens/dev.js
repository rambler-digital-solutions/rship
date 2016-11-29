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
    autoPadding: true,
    terminal: 'xterm-256color',
    fullUnicode: true
  });
  screen.title = 'Rocket Ship';

  // top-left memory block
  const memoryBlock = blessed.box({
    parent: screen,
    content: colors.blue.bold(' Initialize '),
    scrollable: true,
    keys: true,
    label: colors.green.bold(' Usage: '),
    vi: true,
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
    height: 7,
    left: 0,
    top: '0%'
  });

  // active processes block
  const activeProcessBlock = blessed.text({
    parent: screen,
    scrollable: true,
    keys: true,
    label: colors.green.bold(' Process: '),
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
    height: 7,
    right: 0,
    top: 0
  });

  // logs block
  const logsBlock = blessed.log({
    parent: screen,
    scrollable: true,
    label: colors.green.bold(' Logs: '),
    width: '100%',
    left: 0,
    top: 7,
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
    memoryBlock, activeProcessBlock, logsBlock, screen
  };
};
