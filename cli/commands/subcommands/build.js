'use strict';

// ======================
// Depends
// ======================
const colors = require('colors');
const webpack = require('webpack');
const logger = require('../../libs/logger');
const utils  = require('../utils');

const Compilers = {
  Server: require('../compilers/server'),
  Client: require('../compilers/client')
};

/**
 * Build task
 * @param  {[type]} program [description]
 * @param  {Object} config  [description]
 * @return {[type]}         [description]
 */
module.exports = function(program, config = {}) {
  const { dir, cwd } = config;

  let ClientCompiler = false;
  let ServerCompiler = false;
  let serverConfig = false;
  let clientConfig = false;

  let tasks = [];

  // create inctances of compilers in master process
  if (config.webpack.client) {
    ClientCompiler = new Compilers.Client(config);
    clientConfig = require(config.webpack.client)(config);
  }

  if (config.webpack.server) {
    ServerCompiler = new Compilers.Server(config);
    serverConfig = require(config.webpack.server)(config);
  }

  // if config has minify option
  if (config.build.minify) {
    let options = { compress: { warnings: true } };
    let defineOptions = { 'process.env': { 'NODE_ENV': JSON.stringify('production') } };

    if (config.webpack.server) {
      let minifyServer = new webpack.optimize.UglifyJsPlugin(options);
      let defineServerProduction = new webpack.DefinePlugin(defineOptions);
      // check plugins block
      serverConfig && !serverConfig.plugins ? serverConfig.plugins = [] : null;
      serverConfig.plugins.push(minifyServer);
      serverConfig.plugins.push(defineServerProduction);
    }


    if (config.webpack.client) {
      let minifyClient = new webpack.optimize.UglifyJsPlugin(options);
      let defineClientProduction = new webpack.DefinePlugin(defineOptions);
      clientConfig && !clientConfig.plugins ? clientConfig.plugins = [] : null;
      clientConfig.plugins.push(minifyClient);
      clientConfig.plugins.push(defineClientProduction);
    }
  }

  // lets send user notice
  logger('SHIP: Start compiling');
  logger('SHIP: Remove old files', 'green');

  // prepare folders for compiling
  utils.exec(`rm -rf ${config.build.path}`, { cwd: cwd }, null, true);
  utils.exec(`mkdir ${config.build.path}`, { cwd: cwd }, null, true);

  if (config.webpack.server) {
    utils.exec(`mkdir ${config.build.server.path}`, { cwd: cwd }, null, true);
    let serverCompiler = webpack(serverConfig);

    let Server = new Promise((resolve, reject) => {
      serverCompiler.run((err, stat) => {
        let jsonStat = stat.toJson();
        stat.hasErrors()
          ? reject(jsonStat.errors)
          : resolve();
      });
    });

    // copy node_modules
    let Copy = new Promise((resolve, reject) => {
      try {
        utils.exec(`cp ${dir}/package.json ${config.build.server.path}`, { cwd: cwd }, null, true);
        resolve();
      } catch (err) {
        reject(err);
      }
    });


    Server.then(() => logger('SHIP: Webpack.Server:Success', 'green'));

    // lets install production dependencies
    Copy.then(() => {
      utils.exec(
        utils.makeCommand(cwd, 'install --production', [], ''), // command
          { cwd: `${config.build.server.path}` }, // options
          null,         // no callback
          false,        // no sync
          true          // print stdout
      );
    });

    // add tasks
    tasks.push(Server);
    tasks.push(Copy);
  }

  if (config.webpack.client) {
    utils.exec(`mkdir mkdir ${config.build.client.path}`, { cwd: cwd }, null, true);
    let clientCompiler = webpack(clientConfig);
    let Client = new Promise((resolve, reject) => {
      clientCompiler.run((err, stat) => {
        let jsonStat = stat.toJson();
        stat.hasErrors()
          ? reject(jsonStat.errors)
          : resolve();
      });
    });
    Client.then(() => logger('SHIP: Webpack.Client:Success', 'green'));
    tasks.push(Client);
  }

  // wrap steps to promise
  Promise.all(tasks)
    .then(()    => logger('SHIP: Done', 'green'))
    .catch(err  => logger('SHIP: Error' + err, 'red'));
};
