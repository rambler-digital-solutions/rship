'use strict';

// ======================
// Depends
// ======================
const utils = require('./utils');
const logger = require('../libs/logger');
const colors = require('colors');

/**
 * SHIP.CLI.install
 * @param  {object}   program [description]
 * @param  {object}   config  [description]
 * @return {boolean}
 */
const cmd = (program, config) => {
  program
    .command('install [packages...]')
    .option('-s, --save', 'save to dependencies')
    .option('-sd, --save-dev', 'save to dev dependencies')
    .alias('i')
    .description(colors.yellow('install system dependencies'))
    .action(function(packages, options) {
      const { dir, cwd } = config;
      if (!utils.checkInstance(dir)) return false;
      logger('Please be patient');

      utils.exec(
        utils.makeCommand(cwd, 'add', packages, options), // command
        { cwd: dir }, // options
        null,         // no callback
        false,        // no sync
        true          // print stdout
      );

      return true;
    });
};

// export
module.exports          = cmd;
module.exports.install  = cmd;
