"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (pickupTime, returnTime, currTime) {
    if (pickupTime < currTime && currTime < returnTime) {
        return true;
    } else {
        return false;
    }
};