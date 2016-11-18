'use strict';

const CLI = require('../index')();
const { expect } = require('chai');
const { describe } = require('mocha');

describe('formal CLI tests', () => {

  it('CLI should be an object', () => {
    expect(CLI).to.be.a('object');
  });

  it('CLI.commands should be an array of commands', () => {
    expect(CLI.commands).to.be.a('array');
  });

});
