"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.startArrayToDate = startArrayToDate;
exports.endArrayToDate = endArrayToDate;
/**
 * Created by lamho on 2017/4/25.
 */
function startArrayToDate(time) {
    return time ? new Date(time[0], time[1] - 1, 1, 0, 0, 0, 0) : new Date();
}

function endArrayToDate(time, startTime) {
    return time ? new Date(time[0], time[1], 0, 23, 59, 59, 999) : new Date(new Date(startTime).setFullYear(new Date(startTime).getFullYear() + 1));
}