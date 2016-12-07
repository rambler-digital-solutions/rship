'use strict';

// ======================
// Depends
// ======================
const ws = require('nodejs-websocket');

/**
 * Create websocket server
 * @param {[type]} config [description]
 */
const WebsocketServer = function(config) {

  // config
  this.config = config || {
    host: 'localhost',
    port: '3002'
  };

  // prepapre websocket server
  this.server = ws.createServer(connection => {
    connection.on('error', err => {
      if (err.code !== 'ECONNRESET') {
        throw err
      }
    });
  }).listen(this.config.port);
};

module.exports = WebsocketServer;
