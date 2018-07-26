'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (starTime, endTime, pickupDay, returnDay, yesterdayClick) {
    var dayArr = createDayArr(starTime, endTime, pickupDay, returnDay, yesterdayClick);
    return dayArr;
};

var _reSetDay = require('./reSetDay');

var _reSetDay2 = _interopRequireDefault(_reSetDay);

var _checkDayIsActive = require('./checkDayIsActive');

var _checkDayIsActive2 = _interopRequireDefault(_checkDayIsActive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * Created by lamho on 2017/4/6.
                                                                                                                                                                                                                   */

//判断日期的状态
function setDayInfo(currDay, pickupDay, returnDay, yesterdayClick) {
    var todayTime = (0, _reSetDay2.default)(new Date()),
        todayDay = currDay.getDate(),
        pickupTime = pickupDay ? (0, _reSetDay2.default)(pickupDay).getTime() : null,
        returnTime = returnDay ? (0, _reSetDay2.default)(returnDay).getTime() : null,
        dateInfo = {
        isToday: false, //是否今天
        isTomorrow: false, //是否明天
        isGone: false, //是否已经过去的日期
        content: todayDay, //日期显示内容
        date: todayDay, //日期天
        isStart: currDay.getTime() == pickupTime ? true : false, //是否为选中的pickup日期
        isEnd: currDay.getTime() == returnTime ? true : false, //是否为选中的return日期
        isBefore: returnTime && pickupTime ? true : false, //是否显示before，样式需要
        isActive: pickupTime < currDay.getTime() && currDay.getTime() < returnTime ? (0, _checkDayIsActive2.default)(pickupTime, returnTime, currDay.getTime()) : false //是否激活日期
    };

    //是否今天
    if (todayTime.getTime() == currDay.getTime()) {
        dateInfo.isToday = true;
        dateInfo.content = '今';
        // 是否允许点击昨天    
    } else if (yesterdayClick && todayTime.getTime() - 86400000 == currDay.getTime()) {
        dateInfo.isGone = false;
        dateInfo.content = todayDay;
        //是否明天
    } else if (new Date(todayTime.setDate(todayTime.getDate() + 1)).getTime() == currDay.getTime()) {
        dateInfo.isTomorrow = true;
        dateInfo.content = '明';
        //是否是今天之前的日期
    } else if (todayTime.getTime() > currDay.getTime()) {
        dateInfo.isGone = true;
        dateInfo.content = todayDay;
    }

    return dateInfo;
}

//设置占位符的状态
function setDatePlaceholder(currDay, pickupDay, returnDay, type) {

    var obj = _defineProperty({
        isActive: false,
        isToday: false,
        isTomorrow: false,
        isGone: false,
        content: '',
        date: '',
        isStart: false,
        isEnd: false,
        isBefore: false
    }, 'isActive', false);

    if (pickupDay == null || returnDay == null) {
        return obj;
    }

    if (type == 'previous') {

        var prevMonthLastDay = new Date(currDay.getFullYear(), currDay.getMonth(), 0),
            prevMonthLastDayInfo = setDayInfo(prevMonthLastDay, pickupDay, returnDay);

        //上一个月的最后一日如果激活，则下一个月的占位为active状态
        if (prevMonthLastDayInfo.isActive || prevMonthLastDayInfo.isStart) {
            obj.isActive = true;
        }
    } else {
        var nextMonthFirstDay = new Date(currDay.getFullYear(), currDay.getMonth() + 1, 1);
        var nextMonthFirstDayInfo = setDayInfo(nextMonthFirstDay, pickupDay, returnDay);

        //下一个月的最后一日如果激活，则这个月的最后占位为active状态
        if (nextMonthFirstDayInfo.isActive || nextMonthFirstDayInfo.isEnd) {
            obj.isActive = true;
        }
    }

    return obj;
}

//获取某月分的天数
function getMonthTotalDay(time) {
    var starYear = new Date(time).getFullYear(),
        starMonth = new Date(time).getMonth() + 1;

    return new Date(starYear, starMonth, 0).getDate();
}

//获取对应月份的日期数组（做好缩进）
function getMonthDayArray(time, dayCount, pickupDay, returnDay, yesterdayClick) {
    var year = time.getFullYear(),
        month = time.getMonth(),
        arr = [],
        cont = 0,
        i = dayCount % 8,
        n = Math.floor(dayCount / 8);

    function _setDateInfo(yesterdayClick) {
        var currDay = new Date(year, month, cont + 1),
            week = currDay.getDay();
        var currDayInfo = setDayInfo(currDay, pickupDay, returnDay, yesterdayClick);

        //第一个日期需要做好星期的缩进
        if (cont == 0) {

            var retractCount = 7 - (7 - week);
            for (var k = 0; k < retractCount; k++) {
                //设置占位符状态
                arr.push(setDatePlaceholder(currDay, pickupDay, returnDay, 'previous', yesterdayClick));
            }
            arr.push(currDayInfo);
            //最后一天如果不是星期天，后面要补占位符
        } else if (cont == dayCount - 1) {
            arr.push(currDayInfo);
            var _retractCount = 7 - week - 1;
            for (var _k = 0; _k < _retractCount; _k++) {
                arr.push(setDatePlaceholder(currDay, pickupDay, returnDay, 'next', yesterdayClick));
            }
        } else {
            arr.push(currDayInfo);
        }

        cont++;
    }

    while (i) {
        _setDateInfo(yesterdayClick);
        i--;
    }

    while (n) {
        n--;
        _setDateInfo(yesterdayClick);
        _setDateInfo(yesterdayClick);
        _setDateInfo(yesterdayClick);
        _setDateInfo(yesterdayClick);
        _setDateInfo(yesterdayClick);
        _setDateInfo(yesterdayClick);
        _setDateInfo(yesterdayClick);
        _setDateInfo(yesterdayClick);
    }

    return arr;
}

//创建日期数组
function createDayArr(starTime, endTime, pickupDay, returnDay, yesterdayClick) {

    var starYear = parseInt(starTime.getFullYear()),
        starMonth = parseInt(starTime.getMonth()),
        endYear = parseInt(endTime.getFullYear()),
        endMonth = parseInt(endTime.getMonth()),
        dateArray = [],
        diffMonth = (endYear - starYear) * 12 + (endMonth - starMonth) + 1,
        currYear = starYear,
        currMonth = starMonth;

    for (var i = 1; i <= diffMonth; i++) {
        var currDate = new Date(currYear, currMonth, 1),
            //当前月份
        currDayCount = getMonthTotalDay(currDate),
            dayList = getMonthDayArray(currDate, currDayCount, pickupDay, returnDay, yesterdayClick);

        dateArray.push({
            year: currDate.getFullYear().toString(),
            month: (currDate.getMonth() + 1).toString(),
            dayList: dayList,
            isShow: _isShowMonth(dayList) //在渲染时时候显示出来，
        });

        //如果月份到12月，就加1年，月份为1
        if (currMonth == 12) {
            currMonth = 1;
            currYear += 1;
        } else {
            currMonth += 1;
        }
    }

    return dateArray;
}

//查看每个月份的日期中是否有选中的日期，如果有那么该月份在渲染时要显示
function _isShowMonth(dayList) {
    for (var i = 0; i < dayList.length; i++) {
        if (dayList[i].isStart) {
            return true;
        }
    }
    return false;
}