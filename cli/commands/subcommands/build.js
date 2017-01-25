'use strict';

// ======================
// Depends
// ======================
const colors = require('colors');
const webpack = require('webpack');
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
    let options = { compress: { warnings: true } };
    let defineOptions = { 'process.env': { 'NODE_ENV': JSON.stringify('production') } };

    let minifyServer = new webpack.optimize.UglifyJsPlugin(options);
    let minifyClient = new webpack.optimize.UglifyJsPlugin(options);

    let defineServerProduction = new webpack.DefinePlugin(defineOptions);
    let defineClientProduction = new webpack.DefinePlugin(defineOptions);

    // check plugins block
    serverConfig && !serverConfig.plugins ? serverConfig.plugins = [] : null;
    clientConfig && !clientConfig.plugins ? clientConfig.plugins = [] : null;

    // push minify plugins to config
    serverConfig.plugins.push(minifyServer);
    clientConfig.plugins.push(minifyClient);

    // push define production env
    serverConfig.plugins.push(defineServerProduction);
    clientConfig.plugins.push(defineClientProduction);
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
  utils.exec(`mkdir ${dir}/dist/server`, { cwd: cwd }, null, true);
  utils.exec(`mkdir ${dir}/dist/client`, { cwd: cwd }, null, true);

  let Server = new Promise((resolve, reject) => {
    serverCompiler.run((err, stat) => {
      let jsonStat = stat.toJson();
      stat.hasErrors()
        ? reject(jsonStat.errors)
        : resolve();
    });
  });

  let Client = new Promise((resolve, reject) => {
    clientCompiler.run((err, stat) => {
      let jsonStat = stat.toJson();
      stat.hasErrors()
        ? reject(jsonStat.errors)
        : resolve();
    });
  });

  // copy node_modules
  let Copy = new Promise((resolve, reject) => {
    try {
      utils.exec(`cp ${dir}/package.json ${dir}/dist/server`, { cwd: cwd }, null, true);
      resolve();
    } catch (err) {
      reject(err);
    }
  });

  // status checked
  Server.then(() => logger('SHIP: Webpack.Server:Success', 'green'));
  Client.then(() => logger('SHIP: Webpack.Client:Success', 'green'));

  // lets install production dependencies
  Copy.then(() => {
    utils.exec(
      utils.makeCommand(cwd, 'install --production', [], ''), // command
        { cwd: `${dir}/dist/server` }, // options
        null,         // no callback
        false,        // no sync
        true          // print stdout
    );
  });

  // wrap steps to promise
  Promise.all([Server, Client, Copy])
    .then(()    => logger('SHIP: Done', 'green'))
    .catch(err  => logger('SHIP: Error' + err, 'red'));
};
