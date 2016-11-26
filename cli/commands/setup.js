'use strict';

// ======================
// Depends
// ======================
const logger = require('../libs/logger');
const utils = require('./utils');
const colors = require('colors');
const childProcess = require('child_process');

/**
 * SHIP.CLI.setup
 * @param  {object}   program [description]
 * @param  {object}   config  [description]
 * @return {boolean}
 */
const setup = function(program, config) {
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
          childProcess.execSync(`rm -rf ${dir}/node_modules`, { cwd: dir });
        } catch (err) {
          logger('Failed', 'red');
          return false;
        }
      }

      logger('Installing dependencies');

      try {
        let instalation = childProcess.exec(
          utils.makeCommand(cwd),
          { cwd: dir}
        );
        instalation.stdout.pipe(process.stdout);
      } catch (err) {
        logger(`${dir} dont has package.json`, 'red');
        return false;
      }

      logger('Success');

      return true;
    });
};

module.exports.setup = setup;
