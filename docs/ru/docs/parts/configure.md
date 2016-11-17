# RSHIP / Конфигурирование

В корне приложения, создайте новый файл ```ship.config.js```

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

  // Пути до конфигураций webpack
  webpack: {
    client: __root + '/config/webpack/client.config.js',
    server: __root + '/config/webpack/server.config.js'
  },

  // Доступные алиасы
  aliases: {
    _config: __root + '/ship.config.js',
    _server: __root + '/app/server',
    _client: __root + '/app/client',
    _shared: __root + '/app/shared'
  },

  // Секция разработки
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

  // "Боевого" окружения
  production: {
    server: {
      host: 'localhost',
      port: '3000'
    }
  },

  // Настройки сборки проекта
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
