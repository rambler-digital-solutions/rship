'use strict';

// ======================
// Depends
// ======================
const colors      = require('colors');
const program     = require('commander');
const registry    = require('./libs/registry');
const commands    = require('./commands/');

/**
 * SHIP.CLI
 * @param  {string} __CWD  Absolute path for current project
 * @param  {string} __ROOT Root path of project
 * @param  {object} config Extandable config
 * @return {object}
 */
module.exports = function(__CWD, __ROOT, config) {
  // define program
  program
    .version(colors.green(config.details.version))
    .description(colors.blue(config.details.description));

  // register commands
  return registry(program, config, commands);
};
