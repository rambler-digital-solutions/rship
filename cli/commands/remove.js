'use strict';

// ======================
// Depends
// ======================
const utils = require('./utils');
const logger = require('../libs/logger');
const colors = require('colors');
const childProcess = require('child_process');

/**
 * SHIP.CLI.remove
 * @param  {object}   program [description]
 * @param  {object}   config  [description]
 * @return {boolean}
 */
const remove = function(program, config) {
  program
    .command('remove [packages...]')
    .alias('r')
    .description(colors.yellow('remove client/server dependencies'))
    .action(function(packages) {
      const { dir, cwd } = config;
      if (!utils.checkInstance(dir)) return false;
      logger('Please be patient');

      let instalation = childProcess.exec(
        utils.makeCommand(cwd, 'remove', packages, options),
        {cwd: dir}
      );
      instalation.stdout.pipe(process.stdout);

      return true;
    });
};

module.exports.remove = remove;
