/*!
 * has-value <https://github.com/jonschlinkert/has-value>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
var assert = require('assert');
var hasValue = require('./');

describe('object properties', function() {
  it('should be true when value is "null"', function() {
    assert(hasValue(null, 'foo'));
    assert(hasValue({foo: null}, 'foo'));
    assert(hasValue({foo: {bar: null}}, 'foo.bar'));
  });

  it('should be false when value is "undefined"', function() {
    assert(!hasValue(undefined));
    assert(!hasValue({foo: undefined}, 'foo'));
    assert(!hasValue({foo: {bar: undefined}}, 'foo.bar'));
  });

  it('should work for booleans', function() {
    assert(hasValue(true));
    assert(hasValue(false));
    assert(hasValue({foo: true}, 'foo'));
    assert(hasValue({foo: false}, 'foo'));
    assert(hasValue({foo: {bar: false}}, 'foo.bar'));
  });

  it('should return false for empty strings', function() {
    assert(!hasValue(''));
    assert(!hasValue({foo: ''}, 'foo'));
    assert(!hasValue({foo: {bar: ''}}, 'foo.bar'));
  });

  it('should return true for non-empty strings', function() {
    assert(hasValue('foo'));
    assert(hasValue({foo: 'abc'}, 'foo'));
    assert(hasValue({foo: {bar: 'abc'}}, 'foo.bar'));
  });

  it('should be true for numbers', function() {
    assert(hasValue(0));
    assert(hasValue({foo: 0}));
    assert(hasValue({foo: 0}, 'foo'));
    assert(hasValue({foo: {bar: 0}}, 'foo.bar'));

    assert(hasValue(9));
    assert(hasValue({foo: 9}));
    assert(hasValue({foo: 9}, 'foo'));
    assert(hasValue({foo: {bar: 9}}, 'foo.bar'));
  });

  it('should work for objects', function() {
    assert(!hasValue({}));
    assert(!hasValue({foo: undefined}));
    assert(!hasValue({foo: {}}));
    assert(!hasValue({foo: {}}, 'foo'));
    assert(!hasValue({foo: {bar: {}}}, 'foo.bar'));

    assert(hasValue({foo: null}));
    assert(hasValue({foo: null}, 'foo'));
    assert(hasValue({foo: {bar: null}}, 'foo.bar'));
    assert(hasValue({foo: {bar: 'baz'}}));
    assert(hasValue({foo: {bar: 'baz'}}, 'foo.bar'));
  });

  it('should work for arrays', function() {
    assert(!hasValue([]));
    assert(!hasValue({foo: []}));
    assert(!hasValue({foo: []}, 'foo'));
    assert(!hasValue(['']));
    assert(!hasValue([undefined]));
    assert(!hasValue([[]]));
    assert(!hasValue([[], []]));
    assert(!hasValue({foo: [[]]}));
    assert(!hasValue({foo: [[], []]}, 'foo'));
    assert(!hasValue({foo: {bar: [[], []]}}, 'foo.bar'));

    assert(hasValue([0]));
    assert(hasValue([null]));
    assert(hasValue(['foo']));
    assert(hasValue({foo: [0]}, 'foo'));
    assert(hasValue({foo: [null]}, 'foo'));
    assert(hasValue({foo: ['foo']}, 'foo'));
    assert(hasValue({foo: {bar: [0]}}, 'foo.bar'));
    assert(hasValue({foo: {bar: [null]}}, 'foo.bar'));
    assert(hasValue({foo: {bar: ['foo']}}, 'foo.bar'));
  });

  it('should work for functions', function() {
    assert(hasValue(function() {}));
    assert(hasValue({foo: function() {}}));
    assert(hasValue({foo: function() {}}, 'foo'));
    assert(hasValue({foo: {bar: function() {}}}, 'foo.bar'));
  });
});
