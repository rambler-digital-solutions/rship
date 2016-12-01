'use strict';

// ======================
// Depends
// ======================
const cluster   = require('cluster');
const devScreen = require('../../screens/dev');
const Compilers = {
  Server: require('../compilers/server'),
  Client: require('../compilers/client')
};

const WebSocket = require('../websocket');

/**
 * SHIP.run.dev
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
module.exports = function(config) {
  if (cluster.isMaster) {

    // create websocket instance for handling compilation status
    const WebSocketInstance = new WebSocket({
      host: config.development.websocket.host || 'localhost',
      port: config.development.websocket.port || 3002
    });

    // create inctances of compilers in master process
    const ClientCompiler = new Compilers.Client(config);
    const ServerCompiler = new Compilers.Server(config);
    
    // get avaliable screens from blessed container
    const Screen = devScreen(config);

    // lets start both of compilers
    try {
      ClientCompiler.start(Screen, WebSocketInstance);
      ServerCompiler.start(Screen, WebSocketInstance);
    } catch (err) {
      console.error(err);
    }

  } else {

    /**
     * Send message from child process to master
     * @param  {...[type]} data [description]
     * @return {[type]}         [description]
     */
    let sendMessage = function(...data) {
      let message = {
        type: this.type ? this.type : 'log',
        data: data
      };

      if (process.connected) {
        process.send(message);
      }
    };

    // error handling subscribe
    ['exit', 'error', 'warning', 'unhandledRejection', 'rejectionHandled', 'uncaughtException']
      .forEach(type => {
        process.on(type, data => {
          sendMessage.bind({ type: 'error' })(data);
        });
      });
    
    // process usage updater
    const interval = setInterval(function() {
      let message = {
        type: 'tempo-worker-usage',
        data: {
          pid: process.pid,
          cpu: process.cpuUsage(),
          uptime: process.uptime(),
          memory: process.memoryUsage(),
          connected: process.connected
        }
      };

      process.send(message);
    }, 1000);

    // process message catcher
    process.on('message', function(sourceCode) {
      var lastUsage;
      var tickInterval = 500;
      var userPercent = 0;

      try {
        // depends
        let vm = require('vm');
        let console = {};

        // prepare new script context for execution
        let script = new vm.Script(sourceCode, {
          timeout: 300,
          filename: 'server.js',
          lineOffset: 1,
          columnOffset: 1,
          displayErrors: true
        });

        // override console context
        ['log', 'dir', 'warn', 'info', 'error']
          .forEach(type => {
            console[type] = sendMessage.bind({ type })
          });

        // Run source code into new context
        script.runInNewContext({
          module, console, require,
          process, __dirname, __filename,
          setTimeout, setInterval, Error
        });

        // stop temporary process interval
        clearInterval(interval);

        // process usage updater, each 500ms
        setInterval(function() {
          var usage = process.cpuUsage();
          if (lastUsage) {
            let intervalInMicros = tickInterval * 1000;
            userPercent = ((usage.user - lastUsage.user) / intervalInMicros) * 100;
          }
          lastUsage = usage;

          let message = {
            type: 'active-worker-usage',
            data: {
              cpu: usage,
              pid: process.pid,
              memory: process.memoryUsage(),
              uptime: process.uptime(),
              cpuPersents: userPercent,
              connected: process.connected
            }
          };
          process.send(message);
        }, 500);

      } catch (err) {
        let errorArr = err.stack.split('\n');
        let message = {
          type: 'error',
          data: {
            message: err.toString(),
            err: errorArr
          }
        };
        process.send(message);
      }
    });
  }
};
