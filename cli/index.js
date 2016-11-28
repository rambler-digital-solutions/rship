'use strict';

// ======================
// Depends
// ======================
const colors      = require('colors');
const program     = require('commander');
const registry    = require('./libs/registry');
const { commands } = require('./commands/');

/**
 * SHIP.CLI
 * @param  {[type]} __CWD  [description]
 * @param  {[type]} __ROOT [description]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
module.exports = function(__CWD, __ROOT, config) {
  // define program
  program
    .version(colors.green(config.details.version))
    .description(colors.blue(config.details.description));

  // register commands
  return registry(program, config, commands);
};
