'use strict';

// ======================
// Depends
// ======================
const webpack = require('webpack');
const logger = require('../../libs/logger');
const utils  = require('../utils');

/**
 * Build task
 * @param  {[type]} program [description]
 * @param  {Object} config  [description]
 * @return {[type]}         [description]
 */
module.exports = (program, config = {}) => {
  const { dir, cwd } = config;

  let tasks = [];

  // remove and create dist directory
  utils.exec(
    `
      rm -rf ${config.build.path} && 
      mkdir ${config.build.path} &&
      mkdir ${config.build.server.path} &&
      cp ${dir}/package.json ${config.build.server.path}
    `, { cwd: cwd }, true, true);

  let startCompilation = function({ file, type, config }) {
    logger(`SHIP: Building '${type}' source code`, 'green');
    let WebpackConfig = require(file)(config);

    if (config.build.minify) {
      const uglifyConfig = typeof(config.build.minify) === 'boolean'
        ? {compress: {warnings: true}}
        : config.build.minify;

      WebpackConfig && !WebpackConfig.plugins ? WebpackConfig.plugins = [] : null;
      WebpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin(uglifyConfig)
      );

      logger(`SHIP: '${type}' source will be minify`, 'yellow');
    }

    let Compiler = webpack(WebpackConfig);

    return new Promise((resolve, reject) => {
      Compiler.run((err, stat) => {
        let jsonStat = stat.toJson();
        stat.hasErrors()
          ? reject(new Error(jsonStat.errors))
          : resolve(jsonStat);
      });
    });
  };

  logger('SHIP: Start compiling', 'green');

  config.webpack.client
    ? tasks.push(startCompilation({ file: config.webpack.client, type: 'Client', config }))
    : null;

  config.webpack.server
    ? tasks.push(startCompilation({ file: config.webpack.server, type: 'Server', config }))
    : null;

  return Promise.all(tasks)
    .then(
      stat => {
        logger('SHIP: Done', 'green');
      },
      error => {
        console.error(error);
        process.exit(1);
      }
    );
};
