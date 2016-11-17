'use strict';

// ======================
// Depends
// ======================
const utils = require('./utils');
const colors = require('colors');
const devSubtask = require('./subcommands/dev');
const buildSubtask = require('./subcommands/build');

/**
 * SHIP.CLI.run
 * @param  {object}   program [description]
 * @param  {object}   config  [description]
 * @return {boolean}
 */
module.exports = function(program, config) {
  program
    .command('run [env]')
    .description(colors.yellow('run development mode'))
    .action(function(env) {
      const { dir } = config;

      // check ship.json application file
      if (!utils.check(`${dir}/ship.config.js`)) {
        this.parent.log(`${dir} is not SHIP instance`, 'red');
        return false;
      }

      // set config env
      env === 'dev'
        ? config.env = 'development'
        : config.env = 'production';

      // check env
      env && env === 'dev'
        ? devSubtask(config)
        : buildSubtask(this, config);

      return true;
    });
};
