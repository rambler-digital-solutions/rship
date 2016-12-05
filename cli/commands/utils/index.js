'use strict';

// ======================
// Depends
// ======================
const fs            = require('fs');
const http          = require('http');
const colors        = require('colors');
const util          = require('util');
const childProcess  = require('child_process');
const logger        = require('../../libs/logger');

/**
 * SHIP.log
 * @param  {[type]}  container [description]
 * @param  {[type]}  message   [description]
 * @param  {String}  color     [description]
 * @param  {Boolean} empty     [description]
 * @return {[type]}            [description]
 */
const log = (container, message, color = 'yellow') => {
  let date = new Date();
  return container.add(`${date.toTimeString().split(' ')[0]} ${colors[color](message)}`);
};

/**
 * Parse number to
 * @param  {int}    x [description]
 * @return {string}   [description]
 */
const toUnits = (x) => {
  let units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let n = parseInt(x, 10) || 0;
  let l = 0;
  while (n > 1024) {
    n = n / 1024;
    l++;
  }

  return (n.toFixed(n >= 10 ? 1 : 2) + ' ' + units[l]);
};

/**
 * Get latest version of rship package
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
const getLatestVersion = (callback) => {
  http
    .get(
      { hostname: 'registry.npmjs.org', path: '/rship' },
      (res) => {
        let body = '';
        res.on('data', (d) => { body += d; });
        res.on('end', () => callback(null, JSON.parse(body)['dist-tags'].latest));
      })
    .on('error', (e) => callback(e, null));
};

/**
 * Check path, if exist
 * @param  {string}   path
 * @return {boolean}
 */
const checkFile = (path) => {
  try {
    return fs.statSync(path).isFile();
  } catch (err) {
    return false;
  }
};

/**
 * Check ship.config.js into runned folder & show info
 * @param  {string} dir
 * @return {boolean}
 */
const checkInstance = (dir) => {
  if (checkFile(`${dir}/ship.config.js`)) return true;
  logger(`${dir} is not SHIP instance`, 'red');
  return false;
};

/**
 * 
 * @param  {[type]} cwd      [description]
 * @param  {String} command  [description]
 * @param  {Array}  packages [description]
 * @param  {String} options  [description]
 * @return {[type]}          [description]
 */
const makeCommand = (cwd, command = '', packages = [], options = '') => {
  let opt = options;
  let pack = packages.join(' ');
  if (options) opt = opt.saveDev ? '--save-dev' : '--save';
  return `NODE_PATH=${cwd} ${cwd}/node_modules/.bin/yarn ${command} ${pack} ${opt}`.trim();
};

/**
 * execute bash command
 * @param  {[type]}   command [description]
 * @param  {[type]}   opts    [description]
 * @param  {Function} cb      [description]
 * @param  {Boolean}  isSync  [description]
 * @return {[type]}           [description]
 */
const exec = (command, opts, cb = () => {}, isSync = false, print = false) => {
  let execCommand;

  // check is sync
  isSync
    ? execCommand = childProcess.execSync(command, opts, cb)
    : execCommand = childProcess.exec(command, opts, cb);

  print && !isSync
    ? execCommand.stdout.pipe(process.stdout)
    : null;

  return execCommand;
};


/**
 * Logger data formatter
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
const logFormat = data => {
  let formatedMessage;

  data.err
    ? formatedMessage = data.err.join('\n')
    : formatedMessage = util.inspect(data, { showHidden: true, depth: 5 })
  
  return formatedMessage;
};


// util.inspect(msg.data, { showHidden: true, depth: 5 })

// ======================
// Export functions
// ======================
module.exports.log              = log;
module.exports.toUnits          = toUnits;
module.exports.getLatestVersion = getLatestVersion;
module.exports.checkFile        = checkFile;
module.exports.checkInstance    = checkInstance;
module.exports.makeCommand      = makeCommand;
module.exports.exec             = exec;
module.exports.logFormat        = logFormat;
