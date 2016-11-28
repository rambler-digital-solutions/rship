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
const cmd = function(program, config) {
  program
    .command('run [env]')
    .description(colors.yellow('run development mode'))
    .action(function(env) {
      const { dir } = config;
      if (!utils.checkInstance(dir)) return false;

      if (env === 'dev') {
        config.env = 'development';
        devSubtask(config);
        return true;
      }

      config.env = 'production';
      buildSubtask(this, config);
      return true;
    });
};

// export
module.exports      = cmd;
module.exports.run  = cmd;
