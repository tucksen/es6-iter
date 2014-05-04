"use strict";
var __moduleName = "./src/index";
var $__1 = $traceurRuntime.assertObject(require('traceur'));
var iter = $traceurRuntime.assertObject(require('./iter')).default;
;
module.exports = {
  get iter() {
    return iter;
  },
  get default() {
    return iter;
  },
  __esModule: true
};
