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

    // connection.on('text', str => {});

    // connection.on('close', (code, reason) => {
    //   // console.log('connection closed')
    // });

    connection.on('error', err => {
      if (err.code !== 'ECONNRESET') {
        throw err
      }
    });

  }).listen(this.config.port);
};

/**
 * Send message to websokect
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
WebsocketServer.prototype.send = function(msg) {
  this.server.connections.forEach(conn => {
    conn.send(JSON.stringify(msg));
  });
};

module.exports = WebsocketServer;
