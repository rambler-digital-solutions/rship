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

/**
 * SHIP.run.dev
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
module.exports = function(config) {
  if (cluster.isMaster) {
    // create inctances of compilers in master process
    const ClientCompiler = new Compilers.Client(config);
    const ServerCompiler = new Compilers.Server(config);
    
    // get avaliable screens from blessed container
    const Screen = devScreen(config);

    // lets start both of compilers
    try {
      ClientCompiler.start(Screen);
      ServerCompiler.start(Screen);
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

    // error handling section
    process.on('exit',                data => { sendMessage.bind({ type: 'error' })(data); });
    process.on('error',               data => { sendMessage.bind({ type: 'error' })(data); });
    process.on('warning',             data => { sendMessage.bind({ type: 'warn'  })(data); });
    process.on('unhandledRejection',  data => { sendMessage.bind({ type: 'error' })(data); });
    process.on('rejectionHandled',    data => { sendMessage.bind({ type: 'error' })(data); });
    process.on('uncaughtException',   data => { sendMessage.bind({ type: 'error' })(data); });

    // process usage updater
    const interval = setInterval(function() {
      let message = {
        type: 'tempo-worker-usage',
        data: {
          pid: process.pid,
          memory: process.memoryUsage(),
          cpu: process.cpuUsage(),
          uptime: process.uptime(),
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
        // prepare new script context for execution
        let script = new vm.Script(sourceCode, {
          filename: 'server.js',
          lineOffset: 1,
          columnOffset: 1,
          displayErrors: true,
          timeout: 300
        });

        // override console context
        let console = {
          log: sendMessage.bind({ type: 'log' }),
          error: sendMessage.bind({ type: 'error' }),
          warn: sendMessage.bind({ type: 'warn' }),
          info: sendMessage.bind({ type: 'info' })
        };

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
              pid: process.pid,
              memory: process.memoryUsage(),
              cpu: usage,
              cpuPersents: userPercent,
              uptime: process.uptime(),
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
