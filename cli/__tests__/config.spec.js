'use strict';

// ======================
// Depends
// ======================
const { expect } = require('chai');
const { describe } = require('mocha');

// ======================
// Config
// ======================
const config = require('../../config')(__dirname, process.cwd(),  'developmet');

const { isObject, mergeDeep } = require('../../config');

describe('config', () => {
  it('should be an object', () => {
    expect(config).to.be.a('object');
  });

  it('isObject()', () => {
    expect(isObject({})).equal(true);
    expect(isObject([])).equal(false);
  });

  it('mergeDeep()', () => {
    let objectA = {
      version: '0.0.1',
      test: {
        a: 'b'
      }
    };

    let objectB = {
      version: '0.0.2',
      test: {
        a: 'c'
      }
    };

    let merged = mergeDeep(objectA, objectB);

    expect(merged).to.be.a('object');
    expect(merged).to.have.property('version').with.equal('0.0.2');
    expect(merged).to.have.property('test');
    expect(merged.test).to.have.property('a').with.equal('c');

  });
});
