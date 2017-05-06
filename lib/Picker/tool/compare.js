"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.compareDay = compareDay;
/**
 * Created by lamho on 2017/4/25.
 */
function compareDay(firstTime, secondTime) {

    var time1 = firstTime ? firstTime.year + "-" + firstTime.month + "-" + firstTime.day : null,
        time2 = secondTime ? secondTime.year + "-" + secondTime.month + "-" + secondTime.day : null;

    if (time1 == time2) {
        return true;
    } else {
        return false;
    }
}