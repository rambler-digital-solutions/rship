'use strict';

// ======================
// Depends
// ======================
const { expect } = require('chai');
const { describe } = require('mocha');

// ======================
// Files
// ======================
const logger = require('../libs/logger');

describe('libs', () => {
  it('logger', () => {
    expect(logger('Logger test', 'red', true)).to.be.a('string');
  });
});
