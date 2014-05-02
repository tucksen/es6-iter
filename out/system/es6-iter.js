System.register("es6-iter/ObjectIterable", [], function() {
  "use strict";
  var $__1;
  var __moduleName = "es6-iter/ObjectIterable";
  var ObjectIterable = function ObjectIterable(obj) {
    if (!(this instanceof $ObjectIterable))
      return new $ObjectIterable(obj);
    this._obj = obj;
  };
  var $ObjectIterable = ObjectIterable;
  ($traceurRuntime.createClass)(ObjectIterable, ($__1 = {}, Object.defineProperty($__1, Symbol.iterator, {
    value: function() {
      var obj,
          keys,
          i,
          l;
      var $arguments = arguments;
      return $traceurRuntime.generatorWrap(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              obj = $arguments[0] !== (void 0) ? $arguments[0] : this._obj;
              keys = Object.keys(obj).sort();
              $ctx.state = 9;
              break;
            case 9:
              i = 0, l = keys.length;
              $ctx.state = 7;
              break;
            case 7:
              $ctx.state = (i < l) ? 1 : -2;
              break;
            case 4:
              i++;
              $ctx.state = 7;
              break;
            case 1:
              $ctx.state = 2;
              return [keys[i], obj[keys[i]]];
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            default:
              return $ctx.end();
          }
      }, this);
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), $__1), {});
  Object.freeze(ObjectIterable);
  Object.freeze(ObjectIterable.prototype);
  ;
  return {
    get ObjectIterable() {
      return ObjectIterable;
    },
    get default() {
      return ObjectIterable;
    }
  };
});
System.register("es6-iter/iterators", [], function() {
  "use strict";
  var __moduleName = "es6-iter/iterators";
  function array(items) {
    return (function() {
      var $__2 = 0,
          $__3 = [];
      for (var $__4 = items[Symbol.iterator](),
          $__5; !($__5 = $__4.next()).done; ) {
        var item = $__5.value;
        $__3[$__2++] = item;
      }
      return $__3;
    }());
  }
  function forEach(items, cb, context) {
    var $__4,
        $__5,
        item;
    return $traceurRuntime.generatorWrap(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $__4 = items[Symbol.iterator]();
            $ctx.state = 4;
            break;
          case 4:
            $ctx.state = (!($__5 = $__4.next()).done) ? 7 : -2;
            break;
          case 7:
            item = $__5.value;
            $ctx.state = 8;
            break;
          case 8:
            cb.call(context, item);
            $ctx.state = 6;
            break;
          case 6:
            $ctx.state = 2;
            return item;
          case 2:
            $ctx.maybeThrow();
            $ctx.state = 4;
            break;
          default:
            return $ctx.end();
        }
    }, this);
  }
  function filter(items, cb, context) {
    var $__4,
        $__5,
        item;
    return $traceurRuntime.generatorWrap(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $__4 = items[Symbol.iterator]();
            $ctx.state = 4;
            break;
          case 4:
            $ctx.state = (!($__5 = $__4.next()).done) ? 6 : -2;
            break;
          case 6:
            item = $__5.value;
            $ctx.state = 7;
            break;
          case 7:
            $ctx.state = (cb.call(context, item)) ? 1 : 4;
            break;
          case 1:
            $ctx.state = 2;
            return item;
          case 2:
            $ctx.maybeThrow();
            $ctx.state = 4;
            break;
          default:
            return $ctx.end();
        }
    }, this);
  }
  function grab(items, amount) {
    return array(take(items, amount));
  }
  function take(items, amount) {
    var $__4,
        $__5,
        item;
    return $traceurRuntime.generatorWrap(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            amount = Math.floor(amount);
            if (isNaN(amount)) {
              throw new TypeError('Expected amount to be an integer');
            }
            $ctx.state = 15;
            break;
          case 15:
            $__4 = items[Symbol.iterator]();
            $ctx.state = 4;
            break;
          case 4:
            $ctx.state = (!($__5 = $__4.next()).done) ? 10 : -2;
            break;
          case 10:
            item = $__5.value;
            $ctx.state = 11;
            break;
          case 11:
            $ctx.state = (amount <= 0) ? -2 : 6;
            break;
          case 6:
            amount -= 1;
            $ctx.state = 9;
            break;
          case 9:
            $ctx.state = 2;
            return item;
          case 2:
            $ctx.maybeThrow();
            $ctx.state = 4;
            break;
          default:
            return $ctx.end();
        }
    }, this);
  }
  return {
    get array() {
      return array;
    },
    get forEach() {
      return forEach;
    },
    get filter() {
      return filter;
    },
    get grab() {
      return grab;
    },
    get take() {
      return take;
    }
  };
});
System.register("es6-iter/types", [], function() {
  "use strict";
  var __moduleName = "es6-iter/types";
  var $__6 = $traceurRuntime.assertObject(['typeof Symbol() == "symbol" && Symbol.iterator', 'typeof (function*(){})()["@@iterator"] === "function"'].map(testFeature)),
      hasNativeIteratorSymbol = $__6[0],
      hasStringIterator = $__6[1];
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
  return {
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
    }
  };
});
System.register("es6-iter/iter", [], function() {
  "use strict";
  var __moduleName = "es6-iter/iter";
  var types = System.get("es6-iter/types");
  var iterators = System.get("es6-iter/iterators");
  var ObjectIterable = $traceurRuntime.assertObject(System.get("es6-iter/ObjectIterable")).default;
  var iter;
  var $__default = iter = (function() {
    var iter = function iter(options, iterator) {
      for (var args = [],
          $__9 = 2; $__9 < arguments.length; $__9++)
        args[$__9 - 2] = arguments[$__9];
      if (!(this instanceof iter))
        return new (Function.prototype.bind.apply(iter, $traceurRuntime.spread([null, options, iterator], args)))();
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
      types.setIteratorFunction(this, (function() {
        return iterator;
      }));
      Object.freeze(this);
      if (isPlainObject(iterator)) {
        iterator = new ObjectIterable(iterator);
      }
      if (!types.isIterator(iterator)) {
        if (types.isIterable(iterator)) {
          iterator = types.getIteratorFunction(iterator).apply(iterator, args);
        } else if (typeof iterator === 'function') {
          iterator = iterator.apply(this, args);
        }
      }
      if (!types.isIterator(iterator)) {
        throw new TypeError('Cannot coerce passed object into an iterator');
      }
      return this.lazy ? this : this.copy();
    };
    return ($traceurRuntime.createClass)(iter, {
      array: function() {
        return iterators.array(this);
      },
      copy: function() {
        return new iter(new Options(this, true), this.array());
      },
      iterator: function() {
        return types.getIteratorFunction(this).bind(this);
      },
      forEach: function(cb) {
        var context = arguments[1] !== (void 0) ? arguments[1] : null;
        var opts = new Options(this.last);
        return new iter(opts, iterators.forEach.bind(this, this, cb, context));
      },
      filter: function(cb) {
        var context = arguments[1] !== (void 0) ? arguments[1] : null;
        var opts = new Options(this.last);
        return new iter(opts, iterators.filter.bind(this, this, cb, context));
      },
      grab: function() {
        var amount = arguments[0] !== (void 0) ? arguments[0] : 1;
        return iterators.grab(this, amount);
      },
      take: function() {
        var amount = arguments[0] !== (void 0) ? arguments[0] : 1;
        var opts = new Options(this.last);
        return new iter(opts, iterators.take.bind(this, this, amount));
      }
    }, {
      extend: function(object) {
        var extended = function extended() {
          for (var args = [],
              $__10 = 0; $__10 < arguments.length; $__10++)
            args[$__10] = arguments[$__10];
          if (!(this instanceof $extended))
            return new (Function.prototype.bind.apply($extended, $traceurRuntime.spread([null], args)))();
          return $traceurRuntime.superCall(this, $extended.prototype, "constructor", $traceurRuntime.spread(args));
        };
        var $extended = extended;
        ($traceurRuntime.createClass)(extended, {}, {}, iter);
        iter(new Options(null, false), object).forEach((function($__11) {
          var name = $__11[0],
              method = $__11[1];
          if (typeof method !== 'function')
            return;
          extended.prototype[name] = method;
        }));
        return iter.staticify(extended);
      },
      staticify: function(klass) {
        Object.keys(klass.prototype).forEach((function(method) {
          if (typeof klass.prototype[method] !== 'function')
            return;
          klass[method] = function(iterable) {
            var $__12;
            for (var args = [],
                $__10 = 1; $__10 < arguments.length; $__10++)
              args[$__10 - 1] = arguments[$__10];
            return ($__12 = new klass(iterable))[method].apply($__12, $traceurRuntime.toObject(args));
          };
        }));
        return klass;
      }
    });
  }());
  iter.staticify(iter);
  var Iterator = function Iterator(next) {
    if (!(this instanceof $Iterator))
      return new $Iterator(next);
    this.next = next;
  };
  var $Iterator = Iterator;
  ($traceurRuntime.createClass)(Iterator, {}, {});
  var optionsSymbol = Symbol();
  var Options = function Options() {
    var last = arguments[0] !== (void 0) ? arguments[0] : null;
    var lazy = arguments[1] !== (void 0) ? arguments[1] : last ? last.lazy : true;
    if (!(this instanceof $Options))
      return new $Options(last, lazy);
    this.last = last;
    this.lazy = lazy;
    this[optionsSymbol] = true;
  };
  var $Options = Options;
  ($traceurRuntime.createClass)(Options, {}, {}, null);
  function isPlainObject(o) {
    var proto = !!o && Object.getPrototypeOf(o);
    return proto === Object.prototype || proto === null;
  }
  [iter, Iterator, Options].forEach((function(klass) {
    return [klass, klass.prototype].forEach(Object.freeze);
  }));
  return {
    get iter() {
      return iter;
    },
    get default() {
      return $__default;
    },
    get Iterator() {
      return Iterator;
    },
    get optionsSymbol() {
      return optionsSymbol;
    },
    get Options() {
      return Options;
    }
  };
});
var iter = $traceurRuntime.assertObject(System.get("es6-iter/iter")).iter;
System.register('es6-iter', [], function() {
  return {
    get iter() {
      return iter;
    },
    get default() {
      return iter;
    }
  };
});
