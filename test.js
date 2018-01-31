'use strict';

require('mocha');
const assert = require('assert');
const has = require('./');

describe('has value', function() {
  it('should be true when property value is "null"', function() {
    assert(has(null));
    assert(has({ foo: null }, 'foo'));
    assert(has({ foo: { bar: null } }, 'foo.bar'));
  });

  it('should be false when property value is "undefined"', function() {
    assert(!has(undefined));
    assert(!has({ foo: undefined }, 'foo'));
    assert(!has({ foo: { bar: undefined } }, 'foo.bar'));
  });

  it('should be true when property value is boolean', function() {
    assert(has(true));
    assert(has(false));
    assert(has({ foo: true }, 'foo'));
    assert(has({ foo: false }, 'foo'));
    assert(has({ foo: { bar: false } }, 'foo.bar'));
  });

  it('should be false when property value is an empty string', function() {
    assert(!has(''));
    assert(!has({ foo: '' }, 'foo'));
    assert(!has({ foo: { bar: '' } }, 'foo.bar'));
  });

  it('should be true when property value is a string', function() {
    assert(has('foo'));
    assert(has({ foo: 'abc' }, 'foo'));
    assert(has({ foo: { bar: 'abc' } }, 'foo.bar'));
  });

  it('should be true for numbers', function() {
    assert(has(0));
    assert(has({ foo: 0 }));
    assert(has({ foo: 0 }, 'foo'));
    assert(has({ foo: { bar: 0 } }, 'foo.bar'));

    assert(has(9));
    assert(has({ foo: 9 }));
    assert(has({ foo: 9 }, 'foo'));
    assert(has({ foo: { bar: 9 } }, 'foo.bar'));
  });

  it('should work for objects', function() {
    assert(has({ foo: 1 }));
    assert(has({ foo: null }));
    assert(has({ foo: null }, 'foo'));
    assert(has({ foo: { bar: null } }, 'foo.bar'));
    assert(has({ foo: { bar: 'baz' } }));
    assert(has({ foo: { bar: 'baz' } }, 'foo.bar'));

    assert(!has({}));
    assert(!has({ foo: '' }));
    assert(!has({ foo: undefined }));
    assert(!has({ foo: {} }));
    assert(!has({ foo: {} }, 'foo'));
    assert(!has({ foo: { bar: {} } }, 'foo.bar'));
  });

  it('should work for arrays', function() {
    assert(!has([]));
    assert(!has({ foo: [] }));
    assert(!has({ foo: [] }, 'foo'));
    assert(!has(['']));
    assert(!has([undefined]));
    assert(!has([[]]));
    assert(!has([[], []]));
    assert(!has({ foo: [[]] }));
    assert(!has({ foo: [[], []] }, 'foo'));
    assert(!has({ foo: { bar: [[], []] } }, 'foo.bar'));

    assert(has([0]));
    assert(has([null]));
    assert(has(['foo']));
    assert(has({ foo: [0] }, 'foo'));
    assert(has({ foo: [null] }, 'foo'));
    assert(has({ foo: ['foo'] }, 'foo'));
    assert(has({ foo: { bar: [0] } }, 'foo.bar'));
    assert(has({ foo: { bar: [null] } }, 'foo.bar'));
    assert(has({ foo: { bar: ['foo'] } }, 'foo.bar'));
  });

  it('should work for functions', function() {
    assert(has(function() {}));
    assert(has({ foo: function() {} }));
    assert(has({ foo: function() {} }, 'foo'));
    assert(has({ foo: { bar: function() {} } }, 'foo.bar'));
  });
});
