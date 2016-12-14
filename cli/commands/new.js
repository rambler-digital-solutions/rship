'use strict';

// ======================
// Depends
// ======================
const utils = require('./utils');
const logger = require('../libs/logger');
const colors = require('colors');

/**
 * SHIP.CLI.new
 * @param  {object}   program [description]
 * @param  {object}   config  [description]
 * @return {boolean}
 */
const cmd = function(program, config) {
  program
    .command('new [name] [preset]')
    .alias('n')
    .description(colors.yellow('create ship application'))
    .action(function(name, preset = 'react-redux-boilerplate') {
      let presetUrl;
      const { dir, cwd } = config;

      // get preset
      if (config.generator[preset]) {
        presetUrl = config.generator[preset];
      } else {
        logger(`Error: Generator '${preset}' doesn't exist, default is 'react-redux-boilerplate'`, 'red');
        return;
      }

      logger(`App will create at: ${dir}/${name}`);

      try {
        utils.exec(`mkdir ${dir}/${name}`, { cwd: cwd }, null, true);
      } catch (err) {
        logger(`Error: Folder '${dir}/${name}' is exists`, 'red');
        return;
      }

      utils.exec(
        `
        cd ${dir}/${name} &&
        curl -LOk ${presetUrl} &&
        tar -xzf master.tar.gz --strip-components=1 -C ./ &&
        rm master.tar.gz
        ${utils.makeCommand(cwd)}
        `,           // command
        {cwd: dir},  // options,
        () => {
          logger('Instalation completed', 'green');
          logger(`Project folder: ${dir}/${name}`, 'green');
        },           // callback
        false,       // no sync
        true         // print
      );

    });
};

// exports
module.exports      = cmd;
module.exports.new  = cmd;
