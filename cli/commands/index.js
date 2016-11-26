'use strict';

const { newCmd } = require('./newCmd');
const { setup } = require('./setup');
const { run } = require('./run');
const { install } = require('./install');
const { remove } = require('./remove');

module.exports.commands = [newCmd, setup, run, install, remove];
