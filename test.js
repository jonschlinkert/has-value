/*!
 * has-value <https://github.com/jonschlinkert/has-value>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
var assert = require('assert');
var hasValue = require('./');

function isEmpty(o, isZero) {
  return !hasValue.apply(hasValue, arguments);
}

var o = {a: null, b: undefined, c: true, d: false, e: '', f: 'string', g: 0, h: 1, i: 0, j: {}, k: {a: 'b'}, l: [], m: ['a', 'b'], n: function (foo) {}, o: function () {}};

var a = {b: {c: o}};

describe('object properties', function () {
  it('should work for nulls', function () {
    assert(!hasValue(o, 'a'));
    assert(!hasValue(o, 'b'));
  });

  it('should work for booleans', function () {
    assert(hasValue(o, 'c'));
    assert(hasValue(o, 'd'));
  });

  it('shold work for strings', function () {
    assert(!hasValue(o, 'e'));
    assert(hasValue(o, 'f'));
  });

  it('should work for numbers', function () {
    assert(hasValue(o, 'g'));
    assert(hasValue(o, 'h'));
  });

  it('should treat zero as null when `noZero` is set', function () {
    assert(!hasValue(o, 'i', true));
  });

  it('should work for objects', function () {
    assert(!hasValue(o, 'j'));
    assert(hasValue(o, 'k'));
  });

  it('should work for arrays', function () {
    assert(!hasValue(o, 'l'));
    assert(hasValue(o, 'm'));
  });

  it('should work for functions', function () {
    assert(hasValue(o, 'n'));
    assert(!hasValue(o, 'o'));
    assert(!hasValue(o, 'o'));
  });
});

describe('nested object properties', function () {
  it('should work for nulls', function () {
    assert(!hasValue(a, 'b.c.a'));
    assert(!hasValue(a, 'b.c.b'));
  });

  it('should work for booleans', function () {
    assert(hasValue(a, 'b.c.c'));
    assert(hasValue(a, 'b.c.d'));
  });

  it('shold work for strings', function () {
    assert(!hasValue(a, 'b.c.e'));
    assert(hasValue(a, 'b.c.f'));
  });

  it('should work for numbers', function () {
    assert(hasValue(a, 'b.c.g'));
    assert(hasValue(a, 'b.c.h'));
  });

  it('should treat zero as null when `noZero` is set', function () {
    assert(!hasValue(a, 'b.c.i', true));
  });

  it('should work for objects', function () {
    assert(!hasValue(a, 'b.c.j'));
    assert(hasValue(a, 'b.c.k'));
  });

  it('should work for arrays', function () {
    assert(!hasValue(a, 'b.c.l'));
    assert(hasValue(a, 'b.c.m'));
  });

  it('should work for functions', function () {
    assert(hasValue(a, 'b.c.n'));
    assert(!hasValue(a, 'b.c.o'));
    assert(!hasValue(a, 'b.c.o'));
  });
});


describe('single values', function () {
  it('should work for nulls', function () {
    assert(!hasValue(null));
    assert(!hasValue(undefined));
  });

  it('should work for booleans', function () {
    assert(hasValue(true));
    assert(hasValue(false));
  });

  it('shold work for strings', function () {
    assert(!hasValue(''));
    assert(hasValue('string'));
  });

  it('should work for numbers', function () {
    assert(hasValue(0));
    assert(hasValue(1));
  });

  it('should treat zero as null when `noZero` is set', function () {
    assert(!hasValue(0, true));
  });

  it('should work for objects', function () {
    assert(!hasValue({}));
    assert(hasValue({a: 'b'}));
  });

  it('should work for arrays', function () {
    assert(!hasValue([]));
    assert(hasValue(['a', 'b']));
  });

  it('should work for functions', function () {
    assert(hasValue(function (foo) {}));
    assert(!hasValue(function () {}));
  });
});


describe('isEmpty', function () {
  it('should work for nulls', function () {
    assert(isEmpty(null));
    assert(isEmpty(undefined));
  });

  it('should work for booleans', function () {
    assert(!isEmpty(false));
    assert(!isEmpty(true));
  });

  it('shold work for strings', function () {
    assert(isEmpty(''));
    assert(!isEmpty('string'));
  });

  it('should work for numbers', function () {
    assert(!isEmpty(0));
    assert(!isEmpty(1));
  });

  it('should treat zero as null when `noZero` is set', function () {
    assert(isEmpty(0, true));
  });

  it('should work for objects', function () {
    assert(isEmpty({}));
    assert(!isEmpty({a: 'b'}));
  });

  it('should work for arrays', function () {
    assert(isEmpty([]));
    assert(!isEmpty(['a', 'b']));
  });

  it('should work for functions', function () {
    assert(!isEmpty(function (foo) {}));
    assert(isEmpty(function () {}));
  });
});
