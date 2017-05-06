'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (className, targetClassName) {
  var classNameArr = className.split(' ');
  return classNameArr.indexOf(targetClassName) != -1 ? true : false;
};