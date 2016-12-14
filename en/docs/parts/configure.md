# RSHIP / Configuring
Create application folder and touch new ```ship.config.js``` file which contains next code:

```javascript

// current process path
const __root = process.cwd();

// ------------------------------
// Application config
// ------------------------------
module.exports = {
  name: 'rship-sample',
  version: '0.0.1',
  description: 'My isomorphic application',

  // Webpack configuration path
  webpack: {
    client: __root + '/config/webpack/client.config.js',
    server: __root + '/config/webpack/server.config.js'
  },

  // Aliases
  aliases: {
    _config: __root + '/ship.config.js',
    _server: __root + '/app/server',
    _client: __root + '/app/client',
    _shared: __root + '/app/shared'
  },

  // Development section
  development: {
    server: {
      host: 'localhost',
      port: '3001',
      file: __root + '/app/server.js'
    },
    client: {
      host: 'localhost',
      port: '8090',
      file: __root + '/app/client.js'
    }
  },

  // Production section
  production: {
    server: {
      host: 'localhost',
      port: '3000'
    }
  },

  // Application build setup
  build: {
    path: __root + '/dist/',
    server: {
      file: 'server.js',
      path: __root + '/dist/server'
    },
    client: {
      file: 'application.js',
      path: __root + '/dist/client'
    }
  }
};

```

##### MIT [Rambler Digital Solutions](https://github.com/rambler-digital-solutions) (2016)
