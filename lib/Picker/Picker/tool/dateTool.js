'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setTime = setTime;
exports.setDay = setDay;
exports.setDayCount = setDayCount;
/**
 * Created by lamho on 2017/5/3.
 */

function resetMinutes(minutes) {
    return minutes < 30 ? '00' : '30';
}

function setTime(time, defaultTime) {
    if (!!time && time !== '') {
        return {
            h: new Date(time).getHours(),
            m: resetMinutes(new Date(time).getMinutes())
        };
    } else {
        //默认为10点
        return !!defaultTime ? defaultTime : {
            h: '10',
            m: '00'
        };
    }
}

function setDay(day) {
    if (!!day && day !== '') {
        return new Date(day);
    } else {
        return null;
    }
}

function setDayCount(pickupDay, returnDay) {
    var returnTime = returnDay.getTime(),
        pickupTime = pickupDay.getTime(),
        diff = returnTime - pickupTime;

    return Math.ceil(diff / 1000 / 60 / 60 / 24);
}