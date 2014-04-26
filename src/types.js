var [ hasNativeIteratorSymbol, hasStringIterator ] = [
  'typeof Symbol() == "symbol" && Symbol.iterator',
  'typeof (function*(){})()["@@iterator"] === "function"' ].map(testFeature)

if (!hasNativeIteratorSymbol && hasStringIterator) {
  Symbol = Symbol || function(){};
  Symbol.iterator = '@@iterator';
}

export function isGenerator(test) {
  return Function.prototype.isGenerator.call(test);
}

export function isIterable(test) {
  return (test != null) && (
      typeof test[Symbol.iterator] === 'function' ||
      typeof test['@@iterator'] === 'function');
}

export function isIterator(test) {
  return (test != null) && typeof test.next === 'function';
}

export function getIteratorFunction(from) {
  from = from != null ? from : {};

  // The specification complient/traceur way
  if (typeof from[Symbol && Symbol.iterator] === 'function') {
    return from[Symbol && Symbol.iterator];
  }
  // Firefox isn't bothered with symbols, just uses string properties
  else if (typeof from['@@iterator'] === 'function') {
    return from['@@iterator'];
  }
  else if (isGenerator(from)) {
    return from;
  }

  return null;
}

export function setIteratorFunction(obj, func) {
  // A spec complient implementation
  if (hasNativeIteratorSymbol) {
    obj[Symbol.iterator] = func;
  }
  // Traceur's polyfill, but skip to the Firefox implementation if it exists
  else if (Symbol && Symbol.iterator && !hasStringIterator) {
    obj[Symbol.iterator] = func;
  }
  else {
    // Firefox uses this and getIteratorFunction can pull from it if a polyfill
    // isn't installed
    Object.defineProperty(obj, '@@iterator', { value: func, writable: true })
  }

  return obj;
}

// isGenerator is in the spec as of 4/18/2014 but is unimplemented in chrome
Function.prototype.isGenerator = Function.prototype.isGenerator || (function() {
  // The Generator constructor isn't available in the global scope so we pull
  // it off an instantiated generator, evaled to avoid traceur
  var GeneratorFunction = testFeature('(function*(){}).constructor');

  return GeneratorFunction
      ? function() { return this instanceof GeneratorFunction }
      : test => false;
})();

function testFeature(evaled) {
  try {
    return eval(evaled);
  } catch (e) {
    return false;
  }
}
