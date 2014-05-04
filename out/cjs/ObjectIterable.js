"use strict";
var $__1;
var __moduleName = "./src/ObjectIterable";
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
module.exports = {
  get ObjectIterable() {
    return ObjectIterable;
  },
  get default() {
    return ObjectIterable;
  },
  __esModule: true
};
