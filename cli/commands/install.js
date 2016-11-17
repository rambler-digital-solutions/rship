'use strict';

// ======================
// Depends
// ======================
const utils = require('./utils');
const colors = require('colors');
const childProcess = require('child_process');

/**
 * SHIP.CLI.install
 * @param  {object}   program [description]
 * @param  {object}   config  [description]
 * @return {boolean}
 */
module.exports = function(program, config) {
  program
    .command('install [packages...]')
    .option('-s, --save', 'save to dependencies')
    .option('-sd, --save-dev', 'save to dev dependencies')
    .alias('i')
    .description(colors.yellow('install system dependencies'))
    .action(function(packages, options) {
      const { dir, cwd } = config;
      // check ship.json application file
      if (!utils.check(`${dir}/ship.config.js`)) {
        this.parent.log(`${dir} is not SHIP instance`, 'red');
        return false;
      }
      this.parent.log('Please be patient');
      let instalation = childProcess.exec(
        `${cwd}/node_modules/.bin/yarn add ${packages.join(' ')} ${options.saveDev ? '--dev' : ''}`,
        {cwd: dir}
      );

      instalation.stdout.pipe(process.stdout);

      return true;
    });
};
