'use strict';

// ======================
// Depends
// ======================
const utils = require('./utils');
const logger = require('../libs/logger');
const colors = require('colors');
const childProcess = require('child_process');

/**
 * SHIP.CLI.install
 * @param  {object}   program [description]
 * @param  {object}   config  [description]
 * @return {boolean}
 */

const install = (program, config) => {
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

      let installation = childProcess.exec(
        utils.makeCommand(cwd, 'add', packages, options),
        {cwd: dir}
      );
      installation.stdout.pipe(process.stdout);

      return true;
    });
};

module.exports.install = install;
