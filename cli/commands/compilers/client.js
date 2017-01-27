'use strict';

// ======================
// Depends
// ======================
const webpack   = require('webpack');
const DevServer = require('webpack-dev-server');

// ======================
// Utils
// ======================
const utils     = require('../utils');

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
ClientCompiler.prototype.start = function(devScreen) {
  // define local variables
  const { config }    = this;

  const clientConfig  = require(config.webpack.client)(config);

  // prepare webpack compiler
  const compiler      = webpack(clientConfig);

  // get avaliable screens from blessed container
  let { logsBlock } = devScreen;

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

  compiler.plugin('done', stats => {
    let statistic = stats.toJson();

    if (stats.hasErrors()) {
      statistic.errors.forEach(error => {
        utils.log(logsBlock, 'SHIP: Webpack->Client->Error: ' + error, 'red');
      });
    }

    if (stats.hasWarnings()) {
      statistic.warnings.forEach(warn => {
        utils.log(logsBlock, 'SHIP: Webpack->Client->Warning: ' + warn, 'magenta');
      });
    } else {
      utils.log(logsBlock, 'SHIP: Webpack->Client->Hash: ' + statistic.hash, 'green');
    }
  });

  // listen
  server.listen(
    config.development.client.port,
    config.development.client.host.replace('http://', '')
  );
};

module.exports = ClientCompiler;
