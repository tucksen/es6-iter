module types from './types';
module iterators from './iterators';

import ObjectIterable from './ObjectIterable';

export var iter;
export default iter = class iter {
  /**
   *   Iter is a ES6 Iterable object "functional" helper that provides methods
   * like map, filter, and reduce. Iter is capable of iterating over plain
   * objects, ES6 Iterators (a complex object with a "next" method), ES6
   * Iterables (an object with a @@iterator method that returns an Iterator).
   * All Strings, Arrays, Maps, and Sets have an @@iterator property and so are
   * also accepted. Anything that returns an iterator or iterable is also
   * supported, that includes generator functions, generator comprehensions,
   * array comprehensions, or plain functions that return Iterators. Some quick
   * examples:
   *
   *     import iter from "iter"
   *
   *     // Prints 2, 4, 6
   *     for (var number of iter([1,2,3]).map(n => n * 2)) {
   *       console.log(number)
   *     }
   *
   *     // Prints hello: world
   *     for (var [key, val] of iter({ hello: 'world' })) {
   *       console.log(key + ': ' + val)
   *     }
   *
   *   Iter lazily processes its items by default. Meaning that nothing is
   * done until the iterable returned is enumerated. Some examples will help
   * clarify this:
   *
   *     import iter from "iter"
   *     var eager, iterator
   *
   *     // Iter is lazy by default, the following does nothing
   *     iter([1,2,3]).forEach(number => console.log(number))
   *
   *     // In ES6 JS, a "for of" loop will enumerate iterables
   *     for (var num of iter([1,2,3])) console.log(num) // Logs 1, 2, 3
   *
   *     // Calling array (returns array) or copy (returns an iter object)
   *     // will immediately process all items in the iterator
   *
   *     // Logs 1, 2, 3, returns [1, 2, 3]
   *     iter([1, 2, 3]).forEach(n => console.log(n)).array()
   *
   *     // Logs 1, 2, 3, returns an "iter" object containing [1, 2, 3]
   *     iter([1, 2, 3]).forEach(n => console.log(n)).copy()
   *
   *     // To process items immediately by default, pass an options object
   *     // with the "lazy" parameter set to false.
   *
   *     // Logs 1, 2, 3
   *     iter(Options(null, false), [1,2,3]).forEach(n => console.log(n))
   *
   *     // Or just bind it
   *     eager = iter.bind(null, Options(null, false))
   *
   *     // Logs 1, 2, 3
   *     eager([1,2,3]).forEach(num => console.log(num))
   *
   *     // You can also manually iterate over items by calling "iterator"
   *     iterator = iter([1,2,3]).forEach(num => console.log(num)).iterator();
   *     iterator.next(); // logs "1"; returns { value: 1, done: false }
   *     iterator.next(); // logs "2"; returns { value: 2, done: false }
   *     iterator.next(); // logs "3"; returns { value: 3, done: false }
   *     iterator.next(); // returns { value: undefined, done: true }
   *
   *   Note the distinction between "plain" and "complex" objects above. Plain
   * objects are JS Objects that derive from either Object.prototype or null.
   * Complex objects would be anything else, so for example, any ES6 Class needs
   * to have an @@iterator property in order to be processed with Iter. This
   * distinction is NOT made in the ES6 spec, but it seems to be the best
   * comprimise between being able to iterate over plain object structures like
   * ({ some: "options-object" }) and ES6 default iterables (['an', 'array']).
   * Iter exports a helper "Iterator" class if you want to just pass in an
   * iterator, for example:
   *
   *     import { iter, Iterator } from "iter"
   *
   *     // Plain Iterator
   *     iter(Iterator(function() {
   *       return { value: undefined, done: true }
   *     }))
   *
   *     // Or even easier, just use a function
   *     iter(function() { return { value: undefined, done: true } })
   *
   *   Another gotcha is that the "iter" class is frozen completely. It cannot
   * be directly extended via the constructor or its prototype, instead use
   * the extend static method on iter:
   *
   *     import { iter, Options } from "iter"
   *
   *     var extended = iter.extend({
   *       times2: function() {
   *         var self = this;
   *
   *         return new extended(new Options(this), function*() {
   *           // (this.last === self) === true
   *           for (var item of this.last) yield item * 2;
   *         })
   *       }
   *     })
   *
   *     // Both return [ 2, 4, 6 ]
   *     extended([1,2,3]).times2().array()
   *     extended.times2([1,2,3]).array()
   *
   * @class iter
   * @param {Options} [options]
   * @param {Iterable|Iterator|Function|GeneratorFunction|Object} iterator
   * @param {...any} args passed along to any calls to an iterable function
   * @return {Iterable} iterable
   */
  constructor(options, iterator, ...args) {
    if (!(this instanceof iter)) return new iter(options, iterator, ...args);

    if (options == null) {
      throw new TypeError('Expected iter to be called with an iterator');
    }

    if (!options[optionsSymbol]) {
      iterator = options;
      args.unshift(iterator);
      options = new Options;
    }

    options = new Options(options.last, options.lazy);
    this.last = options.last;
    this.lazy = options.lazy;

    types.setIteratorFunction(this, () => iterator);

    Object.freeze(this);

    if (isPlainObject(iterator)) {
      iterator = new ObjectIterable(iterator);
    }

    if (!types.isIterator(iterator)) {
      if (types.isIterable(iterator)) {
        iterator = types.getIteratorFunction(iterator).apply(iterator, args);
      }
      else if (typeof iterator === 'function') {
        iterator = iterator.apply(this, args);
      }
    }

    if (!types.isIterator(iterator)) {
      throw new TypeError('Cannot coerce passed object into an iterator');
    }
    
    return this.lazy ? this : this.copy();
  }

  /**
   * Returns an extended "iter" class from the given extensions parameter.
   *
   * @param {Object|Iterator|Iterable|GeneratorFunction|Function} extensions
   *    should return a [ name, method ] array for each extension method.
   */
  static extend(object) {
    class extended extends iter {
      constructor(...args) {
        if (!(this instanceof extended)) return new extended(...args);
        return super(...args);
      }
    }

    iter(new Options(null, false), object).forEach(([name, method]) => {
      if (typeof method !== 'function') return;

      extended.prototype[name] = method
    });

    return iter.staticify(extended);
  }

  /**
   * Transposes methods from a class into static methods.
   *
   * @param {class} klass
   */
  static staticify(klass) {
    Object.keys(klass.prototype).forEach((method) => {
      if (typeof klass.prototype[method] !== 'function') return;

      klass[method] = function(iterable, ...args) {
        return new klass(iterable)[method](...args);
      };
    });

    return klass;
  }

  /**
   * Returns an array of items from the current iterator.
   *
   * @method array
   * @returns Array
   * @see iterators.array
   */
  array() {
    return iterators.array(this);
  }

  /**
   * Immediately copies the current iterator.
   *
   * @method copy
   * @returns iter
   */
  copy() {
    return new iter(new Options(this, true), this.array());
  }

  /**
   * Returns the iterator function backing the iter object.
   *
   * @method iterator
   * @returns function
   */
  iterator() {
    return types.getIteratorFunction(this).bind(this);
  }

  /**
   * Enumerates over items in an iter.
   *
   * @param {Function} cb called for each item
   * @param {Object} context applied to each cb
   * @see iterators.forEach
   */
  forEach(cb, context = null) {
    var opts = new Options(this.last);

    return new iter(opts, iterators.forEach.bind(this, this, cb, context));
  }

  /**
   * Filters items in an iter.
   *
   * @param {Function} cb called for each item
   * @param {Object} context applied to each cb
   * @see iterators.filter
   */
  filter(cb, context = null) {
    var opts = new Options(this.last);

    return new iter(opts, iterators.filter.bind(this, this, cb, context));
  }

  /**
   * Grabs amount of items from an iter, returning an array of them.
   *
   * @param {Integer} amount
   * @returns Array
   * @see iterators.grab
   */
  grab(amount = 1) {
    return iterators.grab(this, amount);
  }

  /**
   * Takes amount of items from an iter, returning another iter.
   *
   * @param {Integer} amount
   * @returns iter
   * @see iterators.grab
   */
  take(amount = 1) {
    var opts = new Options(this.last);

    return new iter(opts, iterators.take.bind(this, this, amount));
  }
}

iter.staticify(iter);

/**
 * Simple data class that helps disambiguate objects meant as Iterators with
 * plain objects.
 */
export class Iterator {
  constructor(next) {
    if (!(this instanceof Iterator)) return new Iterator(next);

    this.next = next;
  }
}

/**
 * @property {Symbol} optionsSymbol used to tag Options insances
 */
export var optionsSymbol = Symbol();

/**
 * Options class
 * @class Options
 */
export class Options extends null {
  constructor(last = null, lazy = last ? last.lazy : true) {
    if (!(this instanceof Options)) return new Options(last, lazy);

    this.last = last;
    this.lazy = lazy;
    this[optionsSymbol] = true;
  }
}

function isPlainObject(o) {
  var proto = !!o && Object.getPrototypeOf(o);
  return proto === Object.prototype || proto === null;
}

[ iter, Iterator, Options ].forEach(klass =>
  [klass, klass.prototype].forEach(Object.freeze)
)
