'use strict';

// ======================
// Depends
// ======================
const { expect } = require('chai');
const { describe } = require('mocha');


// dev screen
const devScreen = require('../screens/dev');

const {
  memoryBlock, cpuBlock, compilingBlock,
  activeProcessBlock, logsBlock, screen
} = devScreen({});

describe('dev screen', () => {

  it('should be a function', () => {
    expect(devScreen).to.be.a('function');
  });

  it('check block types', () => {
    expect(memoryBlock).to.be.a('object');
    expect(cpuBlock).to.be.a('object');
    expect(compilingBlock).to.be.a('object');
    expect(activeProcessBlock).to.be.a('object');
    expect(logsBlock).to.be.a('object');

    expect(screen).to.have.property('render');
    expect(screen).to.have.property('destroy');
    expect(screen).to.have.property('program');
  });

  screen.destroy();
});
