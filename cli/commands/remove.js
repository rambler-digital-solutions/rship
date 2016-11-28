'use strict';

// ======================
// Depends
// ======================
const utils   = require('./utils');
const logger  = require('../libs/logger');
const colors  = require('colors');

/**
 * SHIP.CLI.remove
 * @param  {object}   program [description]
 * @param  {object}   config  [description]
 * @return {boolean}
 */
const cmd = function(program, config) {
  program
    .command('remove [packages...]')
    .alias('r')
    .description(colors.yellow('remove client/server dependencies'))
    .action(function(packages) {
      const { dir, cwd } = config;
      if (!utils.checkInstance(dir)) return false;
      logger('Please be patient');

      utils.exec(
        utils.makeCommand(cwd, 'remove', packages), // command
        { cwd: dir }, // options
        null,         // no callback
        false,        // no sync
        true          // print stdout
      );

      return true;
    });
};

// exports
module.exports        = cmd;
module.exports.remove = cmd;
