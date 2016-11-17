'use strict';

// ======================
// Depends
// ======================
const fs = require('fs');
const colors = require('colors');

/**
 * SHIP.log
 * @param  {[type]}  container [description]
 * @param  {[type]}  message   [description]
 * @param  {String}  color     [description]
 * @param  {Boolean} empty     [description]
 * @return {[type]}            [description]
 */
const _log = function(container, message, color = 'yellow') {
  let date = new Date();
  return container.add(`${date.toTimeString().split(' ')[0]} ${colors[color](message)}`);
};

/**
 * Parse number to
 * @param  {int}    x [description]
 * @return {string}   [description]
 */
const _toUnits = function(x) {
  var units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var n = parseInt(x, 10) || 0;
  var l = 0;
  while (n > 1024) {
    n = n / 1024;
    l++;
  }

  return (n.toFixed(n >= 10 ? 1 : 2) + ' ' + units[l]);
};

/**
 * Check ship.config.js into runned folder
 * @param  {string}   path
 * @return {boolean}
 */
const _check = function(path) {
  try {
    return fs.statSync(path).isFile();
  } catch (err) {
    return false;
  }
};

// ======================
// Export functions
// ======================
module.exports.log = _log;
module.exports.check = _check;
module.exports.toUnits = _toUnits;
