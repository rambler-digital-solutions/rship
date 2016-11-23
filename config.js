'use strict';

/**
 * Simple is object check.
 * @param  {Object} item
 * @return {boolean}
 */
const isObject = item => {
  return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
};

/**
 * Deep merge two objects.
 * @param  {object} target [description]
 * @param  {object} source [description]
 * @return {object}        [description]
 */
const mergeDeep = (target, source) => {
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return target;
};


/**
 * Default CLI config
 * @param  {string} __CWD  [description]
 * @param  {string} __ROOT [description]
 * @param  {string} __ENV  [description]
 * @return {object}        [description]
 */
module.exports = function(__CWD, __ROOT, __ENV) {
  // ======================
  // Base config
  // ======================
  let applicationConfig = {};
  let packageJson = require('./package');
  try {
    applicationConfig = require(`${__ROOT}/ship.config`);
  } catch (err) {
    //
  }

  const { version, description } = packageJson;

  // ======================
  // Base config
  // ======================
  let config = {
    name: 'SHIP',
    details: {
      version: version,
      description: description
    },
    description: 'CLI for building Isomorphic Web App',
    cwd: __CWD,
    dir: __ROOT,
    env: __ENV,
    requirments: {
      node: '6.3.0'
    },
    generator: {
      'react-redux-boilerplate': 'https://github.com/mrsum/react-redux-boilerplate/archive/master.tar.gz'
    },
    webpack: {
      client: `${__ROOT}/webpack/webpack.client.js`,
      server: `${__ROOT}/webpack/webpack.server.js`,
    },
    aliases: {
      _app: `${__ROOT}/source`,
      _config: `${__ROOT}/ship.config.js`,
      _server: `${__ROOT}/source/server`,
      _client: `${__ROOT}/source/client`,
      _shared: `${__ROOT}/source/shared`,
    },
    development: {
      server: {
        host: '127.0.0.1',
        port: '3000'
      },
      client: {
        host: '127.0.0.1',
        port: '8090'
      }
    },
    build: {
      path: `${__ROOT}/dist/`,
      minify: true,
      server: {
        file: 'server.js',
        path: `${__ROOT}/dist/server`
      },
      client: {
        file: 'application.js',
        path: `${__ROOT}/dist/client`,
        static: `${__ROOT}/dist/client/static`,
      }
    }
  };

  return mergeDeep(config, applicationConfig);
};

// export testable function
module.exports.isObject = isObject;
module.exports.mergeDeep = mergeDeep;

