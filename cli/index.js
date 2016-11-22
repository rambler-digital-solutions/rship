'use strict';

// ======================
// Depends
// ======================
const colors      = require('colors');
const program     = require('commander');
const registry    = require('./libs/registry');
const packageJson = require('../package');

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
  return registry(program, config,
    [
      require('./commands/new'),
      require('./commands/setup'),
      require('./commands/run'),
      require('./commands/install'),
      require('./commands/remove')
    ]
  );
};
