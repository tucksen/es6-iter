"use strict";
var __moduleName = "./src/types";
var $__0 = $traceurRuntime.assertObject(['typeof Symbol() == "symbol" && Symbol.iterator', 'typeof (function*(){})()["@@iterator"] === "function"'].map(testFeature)),
    hasNativeIteratorSymbol = $__0[0],
    hasStringIterator = $__0[1];
if (!hasNativeIteratorSymbol && hasStringIterator) {
  Symbol = Symbol || function() {};
  Symbol.iterator = '@@iterator';
}
function isGenerator(test) {
  return Function.prototype.isGenerator.call(test);
}
function isIterable(test) {
  return (test != null) && (typeof test[Symbol.iterator] === 'function' || typeof test['@@iterator'] === 'function');
}
function isIterator(test) {
  return (test != null) && typeof test.next === 'function';
}
function getIteratorFunction(from) {
  from = from != null ? from : {};
  if (typeof from[Symbol && Symbol.iterator] === 'function') {
    return from[Symbol && Symbol.iterator];
  } else if (typeof from['@@iterator'] === 'function') {
    return from['@@iterator'];
  } else if (isGenerator(from)) {
    return from;
  }
  return null;
}
function setIteratorFunction(obj, func) {
  if (hasNativeIteratorSymbol) {
    obj[Symbol.iterator] = func;
  } else if (Symbol && Symbol.iterator && !hasStringIterator) {
    obj[Symbol.iterator] = func;
  } else {
    Object.defineProperty(obj, '@@iterator', {
      value: func,
      writable: true
    });
  }
  return obj;
}
Function.prototype.isGenerator = Function.prototype.isGenerator || (function() {
  var GeneratorFunction = testFeature('(function*(){}).constructor');
  return GeneratorFunction ? function() {
    return this instanceof GeneratorFunction;
  } : (function(test) {
    return false;
  });
})();
function testFeature(evaled) {
  try {
    return eval(evaled);
  } catch (e) {
    return false;
  }
}
module.exports = {
  get isGenerator() {
    return isGenerator;
  },
  get isIterable() {
    return isIterable;
  },
  get isIterator() {
    return isIterator;
  },
  get getIteratorFunction() {
    return getIteratorFunction;
  },
  get setIteratorFunction() {
    return setIteratorFunction;
  },
  __esModule: true
};
