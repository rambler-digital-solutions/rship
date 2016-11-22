'use strict';

// ======================
// Depends
// ======================
const colors = require('colors');
const webpack = require('webpack');
const childProcess = require('child_process');

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

  program.parent.log(colors.green.bold(ship));

  // // get webpack configs
  const serverConfig = require(config.webpack.server)(config);
  const clientConfig = require(config.webpack.client)(config);


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

  program.parent.log('SHIP: Start compiling');

  program.parent.log('SHIP: Remove old files', 'green');
  childProcess.execSync(`rm -rf ${dir}/dist`, { cwd: cwd });
  childProcess.execSync(`mkdir ${dir}/dist`, { cwd: cwd });

  let Server = new Promise((resolve, reject) => {
    program.parent.log('SHIP: Webpack.Server:Building...', 'green');
    serverCompiler.run((err) => {
      // build has errors
      if (err) {
        program.parent.log('SHIP: Webpack.Server:Error ' + JSON.stringify(err, '\n', 2), 'red');
        reject(err);
      }

      program.parent.log('SHIP: Server has been compiled at ./dist/server', 'green');
      resolve();
    });
  });

  let Client = new Promise((resolve, reject) => {
    program.parent.log('SHIP: Webpack.Client:Building...', 'green');
    clientCompiler.run((err) => {
      // build has errors
      if (err) {
        program.parent.log('SHIP: Webpack.Client:Error ' + JSON.stringify(err, '\n', 2), 'red');
        reject(err);
      }

      program.parent.log('SHIP: Client has been compiled at ./dist/client', 'green');
      resolve();
    });
  });

  let Copy = new Promise((resolve, reject) => {
    try {
      childProcess.execSync(`mkdir ${dir}/dist/server`, { cwd: cwd });
      childProcess.execSync(`cp -r ${dir}/node_modules ${dir}/dist/server/node_modules/`, { cwd: cwd });
      resolve();
    } catch (err) {
      reject(err);
    }
  });

  // ZIP all files
  Promise.all([Server, Client, Copy]).then(() => {
    try {
      program.parent.log('SHIP: Done', 'green');
    } catch (err) {
      throw new Error(err);
    }
  });
};
