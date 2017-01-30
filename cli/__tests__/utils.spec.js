'use strict';

// ======================
// Depends
// ======================
const { closeSync, openSync, unlinkSync } = require('fs');
const { expect } = require('chai');
const { describe } = require('mocha');
const childProcess  = require('child_process');
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
      : null;
  }
};

const shipConfStub = __dirname + '/ship.config.js';

// ======================
// Tests
// ======================
describe('utils', () => {
  it('getLatestVersion()', () => {
    utils.getLatestVersion((err, version) => {
      expect(err).to.be.a('null');
      expect(version).to.be.a('string');
    });
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

  it('checkFile()', () => {
    closeSync(openSync(shipConfStub, 'w'));
    expect(utils.checkFile(shipConfStub)).to.be.a('boolean');
    expect(utils.checkFile(shipConfStub)).to.be.true;
    expect(utils.checkFile('./somefile')).to.be.false;
    unlinkSync(shipConfStub);
  });

  it('makeCommand()', () => {
    expect(utils.makeCommand(process.cwd())).to.be.a('string');
    expect(utils.makeCommand(process.cwd())).to.equal(`NODE_PATH=${process.cwd()} ${process.cwd()}/node_modules/.bin/yarn`);
    expect(utils.makeCommand(process.cwd(), 'add', ['zero'], {save: true})).to.equal(`NODE_PATH=${process.cwd()} ${process.cwd()}/node_modules/.bin/yarn add zero --save`);
    expect(utils.makeCommand(process.cwd(), 'remove', ['zero'])).to.equal(`NODE_PATH=${process.cwd()} ${process.cwd()}/node_modules/.bin/yarn remove zero`);
  });

  it('exec()', () => {
    expect(utils.exec('ls -la', {}, null)).to.be.a('object').have.property('pid');
    expect(utils.exec('ls | grep package', {}, () => {}, true, true).toString()).to.be.a('string').equal('package.json\n');
  });
});
