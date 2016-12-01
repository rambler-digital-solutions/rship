'use strict';

// ======================
// Depends
// ======================
const path      = require('path');
const util      = require('util');
const colors    = require('colors');
const webpack   = require('webpack');
const utils     = require('../utils');
const DevServer = require('webpack-dev-server');

/**
 * Server Compiler
 * @param {[type]} config [description]
 */
const ClientCompiler = function(config) {
  this.config = config || {};
};

/**
 * Start
 * @return {[type]} [description]
 */
ClientCompiler.prototype.start = function(devScreen, ws) {
  // define local variables
  const { config }    = this;
  const { cwd }       = config;
  const clientConfig  = require(config.webpack.client)(config);
  const compiler      = webpack(clientConfig);

  // get avaliable screens from blessed container
  let { memoryBlock, cpuBlock, compilingBlock, activeProcessBlock, logsBlock, screen } = devScreen;

  // Add client public path. Exam => http://localhost:8090/assets/
  clientConfig.output.publicPath =
    `http://${config.development.client.host}:${config.development.client.port}/`;

  // dev server
  let server = new DevServer(compiler, {
    contentBase: config.build.client.path,
    inline: true,
    colors: true,
    info: false,
    quiet: true
  });

  compiler.plugin('done', function(stats) {
    let statistic = stats.toJson();

    if (stats.hasErrors()) {
      statistic.errors.forEach(error => {
        utils.log(logsBlock, 'SHIP: Webpack->Client->Error: ' + error, 'red');
      });
      ws.send({ recompile: false, side: 'client', errors: statistic.errors, warnings: [] });
      return false;
    }

    if (stats.hasWarnings()) {
      statistic.warnings.forEach(warn => {
        utils.log(logsBlock, 'SHIP: Webpack->Client->Warning: ' + warn, 'magenta');
      });
      ws.send({ recompile: false, side: 'client', errors: [], warnings: statistic.warnings });
      return false;
    } else {
      utils.log(logsBlock, 'SHIP: Webpack->Client->Hash: ' + statistic.hash, 'green');
      ws.send({ recompile: true, side: 'client', errors: [], warnings: [] });
    }

  });

  // listen
  server.listen(
    config.development.client.port,
    config.development.client.host.replace('http://', '')
  );
};

module.exports = ClientCompiler;
