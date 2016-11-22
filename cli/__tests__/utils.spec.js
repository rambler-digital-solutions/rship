'use strict';

// ======================
// Depends
// ======================
const { expect } = require('chai');
const { describe } = require('mocha');
const colors = require('colors');

// ======================
// Utils
// ======================
const utils = require('../commands/utils');

// ======================
// Stubs
// ======================
const LoggerStub = {
  messages: [],
  add: function(message) {
    this.messages.push(message);
  },
  last: function() {
    return this.messages.length >= 1 
      ? this.messages[this.messages.length - 1 ]
      : null
  }
}

describe('utils', () => {

  it('getLatestVersion()', () => {
    utils.getLatestVersion((err, version) => {
      expect(err).to.be.a('null');
      expect(version).to.be.a('string');
    })
  });

  it('toUnits()', () => {
    expect(utils.toUnits(1024)).to.a('string');
    expect(utils.toUnits(2024 * 1024)).to.equal('1.98 MB');
    expect(utils.toUnits(2024 * 10240000)).to.equal('19.3 GB');
  });

  it('log()', () => {
    utils.log(LoggerStub, 'hello world 1', 'red');
    expect(LoggerStub.messages).to.have.length(1);
    utils.log(LoggerStub, 'hello world 2', 'green');
    expect(LoggerStub.messages).to.have.length(2);
    expect(LoggerStub.last()).to.be.a('string');
  });

  it('check()', () => {
    expect(utils.check('package.json')).to.be.a('boolean');
    expect(utils.check('package.json')).equal(true);
    expect(utils.check('somefile.js')).equal(false);
  });

});
