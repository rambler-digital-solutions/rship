'use strict';

// ======================
// Depends
// ======================
const { expect } = require('chai');
const { describe } = require('mocha');

// ======================
// Config
// ======================
const config = require('../../config')(__dirname, process.cwd(),  'development');

const { isObject } = require('../../config');

describe('config', () => {
  it('should be an object', () => {
    expect(config).to.be.a('object');
  });

  it('isObject()', () => {
    expect(isObject({})).equal(true);
    expect(isObject([])).equal(false);
  });
});
