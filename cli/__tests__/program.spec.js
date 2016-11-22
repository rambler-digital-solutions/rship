'use strict';


// ======================
// Depends
// ======================
const { expect } = require('chai');
const { describe } = require('mocha');

// ======================
// CLI & config
// ======================
const config = require('../../config')(__dirname, process.cwd(),  'developmet');
const CLI = require('../index')(process.cwd(), __dirname, config);

describe('formal CLI tests', () => {

  it('CLI should be an object', () => {
    expect(CLI).to.be.a('object');
  });

  it('CLI.commands should be an array of commands', () => {
    expect(CLI.commands).to.be.a('array');
  });

});
