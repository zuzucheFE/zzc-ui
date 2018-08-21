'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (calendarList) {
    var elem = '';

    //判断日期数组中是否有选中的日期
    var isStartData = false;
    for (var k = 0; k < calendarList.length; k++) {
        if (calendarList[k].isShow == true) {
            isStartData = true;
            break;
        }
    }

    for (var i = 0; i < calendarList.length; i++) {
        var row = calendarList[i].dayList.length / 7,
            height = (row - 1) * 1.05 + .68;

        elem += '<div class="day-item-box" style="height:' + height + 'rem">\n                    <div class="' + setMonthShow(calendarList, i, isStartData) + '">\n                        <div class="month-bg">' + calendarList[i].month + '\u6708</div>\n                        <div class="day-item-content" data-year=' + calendarList[i].year + ' data-month=' + calendarList[i].month + '>\n                            ' + setCalendarDay(calendarList[i]) + '\n                        </div>\n                    </div>\n                </div>';
    }
    return elem;
};

//设置内个月份是否在第一次显示
//每个月份儿的isShow==true的前一个月和下一个月在第一次渲染时会显示出来
function setMonthShow(calendarList, i, isStartData) {

    if (!isStartData) {
        //只显示第一和第二个月
        if (i == 0 || i == 1) {
            return "day-item";
        } else {
            return 'day-item hidden-item';
        }
    } else {
        //当前月份不是选中的月份，那么就判断下一个月份是否显示
        if (!calendarList[i].isShow && calendarList[i + 1] && calendarList[i + 1].isShow) {
            return "day-item";
        }

        //判断当前月份的上一个月份是否显示
        if (!calendarList[i].isShow && calendarList[i - 1] && calendarList[i - 1].isShow) {
            return "day-item";
        }

        //当前的月份是需要显示的，为取车时间
        if (calendarList[i].isShow) {
            return "day-item";
        }

        return 'day-item hidden-item';
    }
}

//设置每个月份的每一行
function setCalendarDay(data) {

    var list = data.dayList,
        row = list.length / 7,
        itemListJSXElement = '',
        rowNo = 0;

    for (var i = 0; i < row; i++) {
        var currRow = list.splice(0, 7);
        itemListJSXElement += '<ul data-row="' + rowNo + '" class="' + setUlClass(currRow) + '">\n                ' + setLiAttribute(data, currRow[0], rowNo, 1) + '\n                ' + setLiAttribute(data, currRow[1], rowNo, 2) + '\n                ' + setLiAttribute(data, currRow[2], rowNo, 3) + '\n                ' + setLiAttribute(data, currRow[3], rowNo, 4) + '\n                ' + setLiAttribute(data, currRow[4], rowNo, 5) + '\n                ' + setLiAttribute(data, currRow[5], rowNo, 6) + '\n                ' + setLiAttribute(data, currRow[6], rowNo, 7) + '\n            </ul>';
        rowNo++;
    }

    return itemListJSXElement;
}

//设置没行的样式
function setUlClass(currRow) {
    var isActive = false,
        isStart = false,
        isEnd = false,
        startNo = null,
        endNo = null;

    for (var i = 7; i; i--) {
        if (currRow[i - 1].isActive) {
            isActive = true;
        }
        if (currRow[i - 1].isStart) {
            isActive = true;
            isStart = true;
            startNo = i;
        }
        if (currRow[i - 1].isEnd) {
            isActive = true;
            isEnd = true;
            endNo = i;
        }
    }

    if (!isActive) {
        return '';
    }

    //取还车同一行并且不是同一天取还车
    if (isStart && isEnd && startNo != endNo) {
        var diff = endNo - startNo - 1,
            className = '',
            currNo = startNo + 1;
        for (var k = 0; k < diff; k++) {
            className += ' row-' + currNo;
            currNo++;
        }
        return className;
    }

    //取还车同一天
    if (isStart && isEnd && startNo == endNo) {
        return '';
    }

    //取车日期的行
    if (isStart && isActive) {
        return 's-row-' + (7 - startNo);
    }

    //还车日期的行
    if (isEnd && isActive) {
        return 'e-row-' + (endNo - 1);
    }

    //整行active
    if (isActive) {
        return 'full';
    }
}

//设置每个日期状态对应的样式
function setLiClass(isGone, isBefore, isStart, isEnd, isActive) {
    var className = 'J-day-info-parent';

    if (isGone) {
        className += ' gone ';
    }

    if (isStart) {
        className += isBefore ? ' start before ' : ' start ';
    }

    if (isEnd) {
        className += isBefore ? ' end before ' : ' end ';
    }

    //如果是当天去还车就特殊处理重定className的值
    if (isStart && isEnd) {
        className = 'start end J-day-info-parent';
    }

    return className;
}

//设置每个日期的内容
function setLiAttribute(data, currData, rowNo, colume) {

    return '<li id=' + (currData.date != '' ? 't-' + data.year + '-' + data.month + '-' + currData.date : '') + '\n            class="' + setLiClass(currData.isGone, currData.isBefore, currData.isStart, currData.isEnd, currData.isActive) + '"\n            data-colume="' + colume + '"\n        >\n            <span class="J-day-info" data-gone=' + (currData.isGone ? '1' : '0') + '\n                data-year=' + data.year + '\n                data-month=' + data.month + '\n                data-date=' + currData.date + '\n            >\n                ' + currData.content + '\n            </span>\n        </li>';
}