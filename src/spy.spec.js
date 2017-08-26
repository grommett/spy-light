const assert = require('assert');
const spy = require('./spy');

describe('Spy', function() {
  describe('called', function() {
    it('returns true if called', function() {
      const testSpy = spy();

      testSpy(23);

      assert.equal(testSpy.called, true);
    });

    it('returns false if not called', function() {
      const testSpy = spy();

      assert.equal(testSpy.called, false);
    });
  });

  describe('callCount', function() {
    it('returns 0 if it has not been called', function() {
      const testSpy = spy();

      assert.strictEqual(testSpy.callCount, 0);
    });

    const callSpyNumber = Math.floor(Math.random() * 100);
    it(`returns number of times called (${callSpyNumber})`, function() {
      const testSpy = spy();

      for (i = 0; i < callSpyNumber; ++i) {
        testSpy();
      }

      assert.equal(testSpy.callCount, callSpyNumber);
    });
  });

  describe('args', function() {
    it('returns an array', function() {
      const testSpy = spy();

      testSpy();

      assert.equal(Array.isArray(testSpy.args), true);
    });

    it('returns an array wrapping each call with another array', function() {
      const testSpy = spy();

      testSpy(42);
      testSpy(24);
      testSpy('test', 123);

      assert.deepEqual(testSpy.args[0], [42]);
      assert.deepEqual(testSpy.args[1], [24]);
      assert.deepEqual(testSpy.args[2], ['test', 123]);
    });
  });

  describe('calledWith', function() {
    it('returns false if not called with argument', function() {
      const testSpy = spy();
      testSpy(42);
      assert.equal(testSpy.calledWith(23), false);
    });

    it('returns true when number matches call argument', function() {
      const testSpy = spy();

      testSpy(42);

      assert.equal(testSpy.calledWith(42), true);
    });

    it('returns true when string matches call argument', function() {
      const testSpy = spy();

      testSpy('string test');

      assert.equal(testSpy.calledWith('string test'), true);
    });

    it('returns true when boolean matches call argument', function() {
      const testSpy = spy();

      testSpy(true);
      testSpy(false);

      assert.equal(testSpy.calledWith(true), true);
      assert.equal(testSpy.calledWith(false), true);
    });

    it('returns true when array matches call argument', function() {
      const testSpy = spy();
      const arr = [24, 32, 66];

      testSpy(arr);

      assert.equal(testSpy.calledWith(arr), true);
    });

    it('returns true when object matches call argument', function() {
      const testSpy = spy();
      const obj = {
        a: 'a',
        b: 'b',
        c: { c1: 'c1',
d: { d1: 'd1',
e: { val: 'e' } } }
      };
      testSpy(obj);
      assert.equal(testSpy.calledWith(obj), true);
    });

    it('returns true if argument is any of the previous called argument\'s', function() {
      const testSpy = spy();
      const arr = [24, 32, 66];
      const obj = {
        a: 'a',
        b: 'b',
        c: { c1: 'c1',
d: { d1: 'd1',
e: { e1: 'e1' } } }
      };
      testSpy(obj);
      testSpy('test');
      testSpy(43);
      testSpy(false);
      testSpy(arr);
      assert.equal(testSpy.calledWith('test'), true);
      assert.equal(testSpy.calledWith(43), true);
      assert.equal(testSpy.calledWith(false), true);
      assert.equal(testSpy.calledWith(arr), true);
      assert.equal(testSpy.calledWith(obj), true);
    });
  });
});
