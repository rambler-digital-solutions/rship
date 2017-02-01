'use strict';

/**
 * Registry commands
 * @param {[type]}  program
 * @param {[type]}  config
 * @param {[type]}  COMMANDS
 */
const Registry = function(program, config, commands) {
  if (commands.length > 0) {
    commands.forEach(command => command(program, config));
  }

  return program;
};

module.exports = Registry;
