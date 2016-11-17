'use strict';

// ======================
// Depends
// ======================
const Log = require('./logger');

/**
 * Registry commands
 * @param {[type]}  program
 * @param {[type]}  COMMANDS
 * @param {[type]}  config
 */
const Registry = function(program, config, commands) {
  program.log = Log;
  if (commands.length > 0) {
    commands.forEach(command => {
      command(program, config);
    });
  }

  return program;
};

module.exports = Registry;
