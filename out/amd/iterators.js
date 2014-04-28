define([], function() {
  "use strict";
  var __moduleName = "./src/iterators";
  function array(items) {
    return (function() {
      var $__0 = 0,
          $__1 = [];
      for (var $__2 = items[Symbol.iterator](),
          $__3; !($__3 = $__2.next()).done; ) {
        var item = $__3.value;
        $__1[$__0++] = item;
      }
      return $__1;
    }());
  }
  function forEach(items, cb, context) {
    var $__2,
        $__3,
        item;
    return $traceurRuntime.generatorWrap(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $__2 = items[Symbol.iterator]();
            $ctx.state = 4;
            break;
          case 4:
            $ctx.state = (!($__3 = $__2.next()).done) ? 7 : -2;
            break;
          case 7:
            item = $__3.value;
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
    var $__2,
        $__3,
        item;
    return $traceurRuntime.generatorWrap(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $__2 = items[Symbol.iterator]();
            $ctx.state = 4;
            break;
          case 4:
            $ctx.state = (!($__3 = $__2.next()).done) ? 6 : -2;
            break;
          case 6:
            item = $__3.value;
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
    var $__2,
        $__3,
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
            $__2 = items[Symbol.iterator]();
            $ctx.state = 4;
            break;
          case 4:
            $ctx.state = (!($__3 = $__2.next()).done) ? 10 : -2;
            break;
          case 10:
            item = $__3.value;
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
    },
    __esModule: true
  };
});
