/*!
 * has-value <https://github.com/jonschlinkert/has-value>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps:mocha */
var should = require('should');
var hasValue = require('./');

function isEmpty(o, isZero) {
  return !hasValue.apply(hasValue, arguments);
}

var o = {a: null, b: undefined, c: true, d: false, e: '', f: 'string', g: 0, h: 1, i: 0, j: {}, k: {a: 'b'}, l: [], m: ['a', 'b'], n: function (foo) {}, o: function () {}};

var a = {b: {c: o}};

describe('object properties', function () {
  it('should work for nulls', function () {
    hasValue(o, 'a').should.be.false;
    hasValue(o, 'b').should.be.false;
  });

  it('should work for booleans', function () {
    hasValue(o, 'c').should.be.true;
    hasValue(o, 'd').should.be.true;
  });

  it('shold work for strings', function () {
    hasValue(o, 'e').should.be.false;
    hasValue(o, 'f').should.be.true;
  });

  it('should work for numbers', function () {
    hasValue(o, 'g').should.be.true;
    hasValue(o, 'h').should.be.true;
  });

  it('should treat zero as null when `noZero` is set', function () {
    hasValue(o, 'i', true).should.be.false;
  });

  it('should work for objects', function () {
    hasValue(o, 'j').should.be.false;
    hasValue(o, 'k').should.be.true;
  });

  it('should work for arrays', function () {
    hasValue(o, 'l').should.be.false;
    hasValue(o, 'm').should.be.true;
  });

  it('should work for functions', function () {
    hasValue(o, 'n').should.be.true;
    hasValue(o, 'o').should.be.false;
    hasValue(o, 'o').should.not.be.true;
  });
});

describe('nested object properties', function () {
  it('should work for nulls', function () {
    hasValue(a, 'b.c.a').should.be.false;
    hasValue(a, 'b.c.b').should.be.false;
  });

  it('should work for booleans', function () {
    hasValue(a, 'b.c.c').should.be.true;
    hasValue(a, 'b.c.d').should.be.true;
  });

  it('shold work for strings', function () {
    hasValue(a, 'b.c.e').should.be.false;
    hasValue(a, 'b.c.f').should.be.true;
  });

  it('should work for numbers', function () {
    hasValue(a, 'b.c.g').should.be.true;
    hasValue(a, 'b.c.h').should.be.true;
  });

  it('should treat zero as null when `noZero` is set', function () {
    hasValue(a, 'b.c.i', true).should.be.false;
  });

  it('should work for objects', function () {
    hasValue(a, 'b.c.j').should.be.false;
    hasValue(a, 'b.c.k').should.be.true;
  });

  it('should work for arrays', function () {
    hasValue(a, 'b.c.l').should.be.false;
    hasValue(a, 'b.c.m').should.be.true;
  });

  it('should work for functions', function () {
    hasValue(a, 'b.c.n').should.be.true;
    hasValue(a, 'b.c.o').should.be.false;
    hasValue(a, 'b.c.o').should.not.be.true;
  });
});


describe('single values', function () {
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
