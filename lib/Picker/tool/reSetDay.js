"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (time) {
    var newTime = new Date(time);
    newTime.setHours(0);
    newTime.setMinutes(0);
    newTime.setSeconds(0);
    newTime.setMilliseconds(0);

    return newTime;
};