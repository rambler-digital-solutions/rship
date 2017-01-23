'use strict';

// ======================
// Depends
// ======================
const logger = require('../libs/logger');
const utils = require('./utils');
const colors = require('colors');

/**
 * SHIP.CLI.setup
 * @param  {object}   program [description]
 * @param  {object}   config  [description]
 * @return {boolean}
 */
const cmd = function(program, config) {
  program
    .command('setup')
    .option('-f, --force', 'reinstall all dependencies')
    .alias('s')
    .description(colors.yellow('setup application'))
    .action(function(options) {
      const { dir, cwd } = config;
      if (!utils.checkInstance(dir)) return false;
      logger('Please be patient');

      // remove node_modules folder is -f / --force option was enabled
      if (options.force) {
        try {
          logger('Removing client node_modules');

          utils.exec(
            `rm -rf ${dir}/node_modules`, // command
            { cwd: dir },                 // options
            null,                         // no callback
            true                          // is sync
          );
        } catch (err) {
          logger('Failed', 'red');
          return false;
        }
      }

      logger('Installing dependencies');

      try {
        utils.exec(
          utils.makeCommand(cwd),       // command
          { cwd: dir },                 // options
          null,                         // no callback
          false,                        // is sync
          true                          // print
        );
      } catch (err) {
        logger(`${dir} dont has package.json`, 'red');
        return false;
      }
      logger('Success');
      return true;
    });
};

// exports
module.exports        = cmd;
module.exports.setup  = cmd;
