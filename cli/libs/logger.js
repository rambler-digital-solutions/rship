'use strict';

// ======================
// Depends
// ======================
const colors = require('colors');

/**
 * Programm log
 * @param {string} message
 * @param {String} color
 */
const Log = function(message, color = 'yellow', returnable = false) {
  let date = new Date();
  let text = `${date.toTimeString().split(' ')[0]} ${colors[color].bold(message)}`;
  !returnable  ? process.stdout.write(text + '\n') : null;

  return text;

};

module.exports = Log;
