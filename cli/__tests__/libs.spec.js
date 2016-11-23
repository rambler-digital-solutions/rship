'use strict';

// ======================
// Depends
// ======================
const { expect } = require('chai');
const { describe } = require('mocha');
const { spy } = require('sinon');

// ======================
// Files
// ======================
const logger = require('../libs/logger');
const registry = require('../libs/registry');
const config = require('../../config')(__dirname, process.cwd(),  'development');

// ======================
// Stubs and spies
// ======================

let spyFunc = spy();
let program = {};

// ======================
// Tests
// ======================

describe('libs', () => {
  it('should return strings with logger', () => {
    expect(logger('Logger test', 'red', true)).to.be.a('string');
  });

  it('should call commands from registry', () => {
    registry(program, config, [spyFunc, spyFunc, spyFunc]);

    expect(spyFunc.calledThrice).to.be.true;
    expect(spyFunc.alwaysCalledWithExactly(program, config)).to.be.true;
    expect(spyFunc.args[0][0]).to.have.property('log').with.equal(logger);
  });
});
