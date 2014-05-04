define(['./types', './iterators', './types', './iterators', './ObjectIterable'], function($__0,$__1,$__2,$__3,$__4) {
  "use strict";
  var __moduleName = "./src/iter";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  if (!$__2 || !$__2.__esModule)
    $__2 = {'default': $__2};
  if (!$__3 || !$__3.__esModule)
    $__3 = {'default': $__3};
  if (!$__4 || !$__4.__esModule)
    $__4 = {'default': $__4};
  var types = $__0;
  var iterators = $__1;
  var $__src_47_types__ = $__2;
  var $__src_47_iterators__ = $__3;
  var ObjectIterable = $traceurRuntime.assertObject($__4).ObjectIterable;
  ;
  var iter;
  var $__default = iter = (function() {
    var iter = function iter(options, iterator) {
      for (var args = [],
          $__7 = 2; $__7 < arguments.length; $__7++)
        args[$__7 - 2] = arguments[$__7];
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
              $__8 = 0; $__8 < arguments.length; $__8++)
            args[$__8] = arguments[$__8];
          if (!(this instanceof $extended))
            return new (Function.prototype.bind.apply($extended, $traceurRuntime.spread([null], args)))();
          return $traceurRuntime.superCall(this, $extended.prototype, "constructor", $traceurRuntime.spread(args));
        };
        var $extended = extended;
        ($traceurRuntime.createClass)(extended, {}, {}, iter);
        iter(new Options(null, false), object).forEach((function($__9) {
          var name = $__9[0],
              method = $__9[1];
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
            var $__10;
            for (var args = [],
                $__8 = 1; $__8 < arguments.length; $__8++)
              args[$__8 - 1] = arguments[$__8];
            return ($__10 = new klass(iterable))[method].apply($__10, $traceurRuntime.toObject(args));
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
  return $traceurRuntime.exportStar({
    get ObjectIterable() {
      return ObjectIterable;
    },
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
  }, $__src_47_types__, $__src_47_iterators__);
});
