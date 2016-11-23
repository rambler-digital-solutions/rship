'use strict';

// ======================
// Depends
// ======================
const { expect } = require('chai');
const { describe } = require('mocha');

// ======================
// Get compilers
// ======================
const Server = require('../commands/compilers/server');
const Client = require('../commands/compilers/client');

// formal tests
describe('compilers', () => {

  let serverCompilerInstance = new Server({});
  let clientCompilerInstance = new Client({});

  it('server compiler should return function', () => {
    expect(Server).to.be.a('function');
  });

  it('client compiler should return function', () => {
    expect(Client).to.be.a('function');
  });

  it('server instance check', () => {
    expect(serverCompilerInstance).to.be.a('object');
    expect(serverCompilerInstance).to.have.property('start');
  });

  it('client instance check', () => {
    expect(clientCompilerInstance).to.be.a('object');
    expect(clientCompilerInstance).to.have.property('start');
  });

});
