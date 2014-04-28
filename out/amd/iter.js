define(['./types', './iterators', './ObjectIterable'], function($__0,$__1,$__2) {
  "use strict";
  var __moduleName = "./src/iter";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  if (!$__2 || !$__2.__esModule)
    $__2 = {'default': $__2};
  var types = $__0;
  var iterators = $__1;
  var ObjectIterable = $traceurRuntime.assertObject($__2).default;
  var iter;
  var $__default = iter = (function() {
    var iter = function iter(options, iterator) {
      for (var args = [],
          $__5 = 2; $__5 < arguments.length; $__5++)
        args[$__5 - 2] = arguments[$__5];
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
              $__6 = 0; $__6 < arguments.length; $__6++)
            args[$__6] = arguments[$__6];
          if (!(this instanceof $extended))
            return new (Function.prototype.bind.apply($extended, $traceurRuntime.spread([null], args)))();
          return $traceurRuntime.superCall(this, $extended.prototype, "constructor", $traceurRuntime.spread(args));
        };
        var $extended = extended;
        ($traceurRuntime.createClass)(extended, {}, {}, iter);
        iter(new Options(null, false), object).forEach((function($__7) {
          var name = $__7[0],
              method = $__7[1];
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
            var $__8;
            for (var args = [],
                $__6 = 1; $__6 < arguments.length; $__6++)
              args[$__6 - 1] = arguments[$__6];
            return ($__8 = new klass(iterable))[method].apply($__8, $traceurRuntime.toObject(args));
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
    },
    __esModule: true
  };
});
