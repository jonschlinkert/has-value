/*!
 * has-any <https://github.com/jonschlinkert/has-any>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var hasValue = require('./');

function isEmpty(o, isZero) {
  return !hasValue(o, isZero);
}

describe('hasValue', function () {
  it('should work for nulls', function () {
    hasValue(null).should.be.false;
    hasValue(undefined).should.be.false;
  });

  it('should work for booleans', function () {
    hasValue(true).should.be.true;
    hasValue(false).should.be.true;
  });

  it('shold work for strings', function () {
    hasValue('').should.be.false;
    hasValue('string').should.be.true;
  });

  it('should work for numbers', function () {
    hasValue(0).should.be.true;
    hasValue(1).should.be.true;
  });

  it('should treat zero as null when `noZero` is set', function () {
    hasValue(0, true).should.be.false;
  });

  it('should work for objects', function () {
    hasValue({}).should.be.false;
    hasValue({a: 'b'}).should.be.true;
  });

  it('should work for arrays', function () {
    hasValue([]).should.be.false;
    hasValue(['a', 'b']).should.be.true;
  });

  it('should work for functions', function () {
    hasValue(function (foo) {}).should.be.true;
    hasValue(function () {}).should.be.false;
  });
});


describe('isEmpty', function () {
  it('should work for nulls', function () {
    isEmpty(null).should.be.true;
    isEmpty(undefined).should.be.true;
  });

  it('should work for booleans', function () {
    isEmpty(false).should.be.false;
    isEmpty(true).should.be.false;
  });

  it('shold work for strings', function () {
    isEmpty('').should.be.true;
    isEmpty('string').should.be.false;
  });

  it('should work for numbers', function () {
    isEmpty(0).should.be.false;
    isEmpty(1).should.be.false;
  });

  it('should treat zero as null when `noZero` is set', function () {
    isEmpty(0, true).should.be.true;
  });

  it('should work for objects', function () {
    isEmpty({}).should.be.true;
    isEmpty({a: 'b'}).should.be.false;
  });

  it('should work for arrays', function () {
    isEmpty([]).should.be.true;
    isEmpty(['a', 'b']).should.be.false;
  });

  it('should work for functions', function () {
    isEmpty(function (foo) {}).should.be.false;
    isEmpty(function () {}).should.be.true;
  });
});