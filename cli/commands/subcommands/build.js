'use strict';

// ======================
// Depends
// ======================
const colors = require('colors');
const webpack = require('webpack');
const childProcess = require('child_process');
const logger = require('../../libs/logger');
const utils  = require('../utils');

/**
 * Build task
 * @param  {[type]} program [description]
 * @param  {Object} config  [description]
 * @return {[type]}         [description]
 */
module.exports = function(program, config = {}) {
  const { dir, cwd } = config;
  const ship = [
    '                                ',
    '................................',
    '..####...##..##..######..#####..',
    '.##......##..##....##....##..##.',
    '..####...######....##....#####..',
    '.....##..##..##....##....##.....',
    '..####...##..##..######..##.....',
    '................................',
    '                                '
  ].join('\n');

  logger(colors.green.bold(ship));

  // get webpack configs
  const serverConfig = require(config.webpack.server)(config);
  const clientConfig = require(config.webpack.client)(config);

  // if config has minify option
  if (config.build.minify) {
    let minifyServer = new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    });

    let minifyClient = new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    });

    serverConfig && !serverConfig.plugins ? serverConfig.plugins = [] : null;
    clientConfig && !clientConfig.plugins ? clientConfig.plugins = [] : null;

    serverConfig.plugins.push(minifyServer);
    clientConfig.plugins.push(minifyClient);
  }

  // prepare separated webpack instances
  let serverCompiler = webpack(serverConfig);
  let clientCompiler = webpack(clientConfig);

  // lets send user notice
  logger('SHIP: Start compiling');
  logger('SHIP: Remove old files', 'green');
  
  // prepare folders for compiling
  utils.exec(`rm -rf ${dir}/dist`, { cwd: cwd }, null, true);
  utils.exec(`mkdir ${dir}/dist`, { cwd: cwd }, null, true);

  // server compiler
  let Server = new Promise((resolve, reject) => {
    logger('SHIP: Webpack.Server:Building...', 'green');
    serverCompiler.run((err) => {
      // build has errors
      if (err) {
        logger('SHIP: Webpack.Server:Error ' + JSON.stringify(err, '\n', 2), 'red');
        reject(err);
      }

      logger('SHIP: Server has been compiled at ./dist/server', 'green');
      resolve();
    });
  });

  // client compiler
  let Client = new Promise((resolve, reject) => {
    logger('SHIP: Webpack.Client:Building...', 'green');
    clientCompiler.run((err) => {
      // build has errors
      if (err) {
        logger('SHIP: Webpack.Client:Error ' + JSON.stringify(err, '\n', 2), 'red');
        reject(err);
      }

      logger('SHIP: Client has been compiled at ./dist/client', 'green');
      resolve();
    });
  });

  // copy node_modules
  let Copy = new Promise((resolve, reject) => {
    try {
      utils.exec(`mkdir ${dir}/dist/server`, { cwd: cwd }, null, true);
      utils.exec(`cp -r ${dir}/node_modules ${dir}/dist/server/node_modules/`, { cwd: cwd }, null, true);
      resolve();
    } catch (err) {
      reject(err);
    }
  });

  // wrap steps to promise
  Promise.all([Server, Client, Copy]).then(() => {
    try {
      logger('SHIP: Done', 'green');
    } catch (err) {
      throw new Error(err);
    }
  });
};
