import ObjectIterable from './ObjectIterable';
module types from './types';

class iter {
  /**
   * An iterable object "functional" helper that provides methods like map and
   * filter.
   *
   * @param {Object|GeneratorFunction} iterable
   */
  constructor(iterable, ...args) {
    if (!(this instanceof iter)) return new iter(iterable, ...args);

    if (!types.isIterable(iterable) && !types.isGenerator(iterable)) {
      if (isPlainObject(iterable)) {
        iterable = new ObjectIterable(iterable);
      }
      else throw new TypeError('Non iterable object passed to iter');
    }

    this._args = args;
    this._iterable = iterable || [];
    this._next = [];
  }

  array() {
    return Array.isArray(this._iterable) ? this._iterable : [...this._iterable];
  }

  iterable() {
    return this._iterable;
  }

  first() {
    return advanceIterable(this._iterable, this._args, value => false);
  }

  forEach(cb, context = null) {
    var next = this._next;

    advanceIterable(this._iterable, this._args, value => {
      cb(value);
      next.push(value);
    });

    return new iter(this._next);
  }

  filter(func) {
    var next = this._next;
    
    advanceIterable(this._iterable, this._args, value => {
      if (func(value)) {
        next.push(value);
      }
    });

    return new iter(this._next);
  }

  *[Symbol.iterator]() {
    for (var value of this._iterable) yield value;
  }

  /**
   * Returns an extended iterable object from the function in the class.
   *
   * @param {Object} object
   */
  static extend(object) {
    class extended extends iter {
      constructor(...args) {
        if (!(this instanceof extended)) return new extended(...args);
        super(...args);
      }
    }

    iter(object)
      .filter(([name, method]) => typeof method === 'function')
      .forEach(([name, method]) => extended.prototype[name] = method);

    return iter.staticify(extended);
  }

  /**
   * Transposes methods from a class into static methods.
   *
   * @param {class} klass
   */
  static staticify(klass) {
    Object.keys(klass.prototype).forEach((method) => {
      klass[method] = function(iterable, ...args) {
        return new klass(iterable)[method](...args);
      };
    });

    return klass;
  }
}

iter.staticify(iter);

function advanceIterable(iterable, args = [], cb) {
  var iterator = iterable[Symbol.iterator](...args);
  var { value, done } = iterator.next();
  var returned;

  while (!done) {
    returned = cb(value);

    if (returned === false) break;

    ({ value, done } = iterator.next(...(returned || [])));
  }

  return value;
}

function isPlainObject(o) {
  var proto = !!o && Object.getPrototypeOf(o);
  return proto === Object.prototype || proto === null;
}

Object.freeze(iter);
Object.freeze(iter.prototype);

export { iter, iter as default };
export * from './types';
