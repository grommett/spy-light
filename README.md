# Spy Lite  

[![Build Status](https://travis-ci.org/grommett/spy-light.svg?branch=master&style=flat-square)](https://travis-ci.org/grommett/spy-light) &nbsp;&nbsp;[![Coverage Status](https://coveralls.io/repos/github/grommett/spy-light/badge.svg?branch=master)](https://coveralls.io/github/grommett/spy-light?branch=master)

## Why?
I love Sinon, and I know there are a million other spy libraries out there, but I wanted to make my own.  
For the fun of it. 

## Using It
Spy Lite has one method: `calledWith` and three properties: `called`, `callCount`, `args`.

### `called`
The property `called` returns a `boolean`:
```js
const testSpy1 = spy();
const testSpy2 = spy();

testSpy1();

console.log(testSpy1.called); // true
console.log(testSpy2.called); // false
```

### `callCount`
The property `callCount` returns a `number` representing the amount of times the spy has been called:
```js
const testSpy = spy();

testSpy1();
console.log(testSpy.callCount); // 1

testSpy1();
console.log(testSpy.callCount); // 2
```

### `args`
The property `args` returns an `array`, which accumulates on each spy call.   
Each entry in the `args` array is another `array` representing the values used each time the spy has been called.  
```js
const testSpy = spy();

testSpy1(1);
console.log(testSpy.args); // [ [1] ]

testSpy1(1,2);
console.log(testSpy.args); // [ [1], [1, 2] ]

// Get arguments from first call
console.log(testSpy.args[0]); // [1]

// Get arguments from second call
console.log(testSpy.args[1]); // [1, 2]
```

### `calledWith`
The method `calledWith` returns a `boolean` and works with `string`, `number`, `array` and `object`. Since `calledWith` compares against the `args` property it will return  `true` if it finds the test value in any of the spy's calls.
```js
const testSpy = spy();

testSpy(1, 2);

console.log(testSpy.calledWith(1)) // true;
console.log(testSpy.calledWith(2)) // true;
console.log(testSpy.calledWith(3)) // false;

// ..later
testSpy([1, 2]);
console.log(testSpy.calledWith([1,2])) // true;
console.log(testSpy.calledWith(2)) // true;
```
