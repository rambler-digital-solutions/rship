'use strict';

// ======================
// Depends
// ======================
const { expect } = require('chai');
const { describe } = require('mocha');

// ======================
// Files
// ======================
const install = require('../commands/install');
const config = require('../../config')(__dirname, process.cwd(),  'development');

// ======================
// Tests
// ======================

describe('install', () => {
  it('should be an object', () => {
    expect(config).to.be.a('object');
  });
});
