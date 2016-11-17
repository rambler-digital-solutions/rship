'use strict';

// ======================
// Depends
// ======================
const utils = require('./utils');
const colors = require('colors');
const childProcess = require('child_process');

/**
 * SHIP.CLI.setup
 * @param  {object}   program [description]
 * @param  {object}   config  [description]
 * @return {boolean}
 */
module.exports = function(program, config) {
  program
    .command('setup')
    .option('-f, --force', 'reinstall all dependencies')
    .alias('s')
    .description(colors.yellow('setup application'))
    .action(function(options) {
      const { dir, cwd } = config;

      // check ship.json application file
      if (!utils.check(`${dir}/ship.config.js`)) {
        this.parent.log(`${dir} is not SHIP instance`, 'red');
        return false;
      }

      this.parent.log('Please be patient');

      // remove node_modules folder is -f / --force option was enabled
      if (options.force) {
        try {
          this.parent.log('Removing client node_modules');
          childProcess.execSync(`rm -rf ${dir}/node_modules`, { cwd: dir });
        } catch (err) {
          this.parent.log('Failed', 'red');
          return false;
        }
      }

      this.parent.log('Installing dependencies');
      try {
        let instalation = childProcess.exec(`${cwd}/node_modules/.bin/yarn`, { cwd: dir});
        instalation.stdout.pipe(process.stdout);
      } catch (err) {
        this.parent.log(`${dir} dont has package.json`, 'red');
        return false;
      }

      this.parent.log('Success');
      return true;
    });
};
