export default function ( calendarList ) {
    let elem = '';

    //判断日期数组中是否有选中的日期
    let isStartData = false;
    for ( let k = 0; k < calendarList.length; k++ ) {
        if ( calendarList[k].isShow == true ) {
            isStartData = true;
            break;
        }
    }

    for ( let i = 0; i < calendarList.length; i++ ) {
        let row = calendarList[i].dayList.length / 7,
            height = row + 1 + ( ( row - 1 ) * .1 );
        elem += `<div class="day-item-box" style="height:${height}rem">
                    <div class="${setMonthShow( calendarList, i, isStartData )}">
                        <div class="day-item-title">
                            <span>${calendarList[i].year}年</span>
                            <span>${calendarList[i].month}月</span>
                        </div>
                        <div class="day-item-content">
                            ${setCalendarDay( calendarList[i] )}
                        </div>
                    </div>
                </div>`;
    }
    return elem;
}

//设置内个月份是否在第一次显示
//每个月份儿的isShow==true的前一个月和下一个月在第一次渲染时会显示出来
function setMonthShow( calendarList, i, isStartData ) {

    if ( !isStartData ) {
        //只显示第一和第二个月
        if ( i == 0 || i == 1 ) {
            return "day-item";
        } else { 
            return 'day-item hidden-item';
        }
    } else {
        //当前月份不是选中的月份，那么就判断下一个月份是否显示
        if ( !calendarList[i].isShow && calendarList[i + 1] && calendarList[i + 1].isShow ) {
            return "day-item";
        }

        //判断当前月份的上一个月份是否显示
        if ( !calendarList[i].isShow && calendarList[i - 1] && calendarList[i - 1].isShow ) {
            return "day-item";
        }

        //当前的月份是需要显示的，为取车时间
        if ( calendarList[i].isShow ) {
            return "day-item";
        }

        return 'day-item hidden-item';
    }
}

//设置每个月份的每一行
function setCalendarDay( data ) {

    let list = data.dayList,
        row = list.length / 7,
        itemListJSXElement = '',
        rowNo = 0;

    for ( let i = 0; i < row; i++ ) {
        let currRow = list.splice( 0, 7 );
        itemListJSXElement +=
            `<ul data-row="${rowNo}" class=${setUlClass( currRow )}>
                ${setLiAttribute( data, currRow[0], rowNo, 1 )}
                ${setLiAttribute( data, currRow[1], rowNo, 2 )}
                ${setLiAttribute( data, currRow[2], rowNo, 3 )}
                ${setLiAttribute( data, currRow[3], rowNo, 4 )}
                ${setLiAttribute( data, currRow[4], rowNo, 5 )}
                ${setLiAttribute( data, currRow[5], rowNo, 6 )}
                ${setLiAttribute( data, currRow[6], rowNo, 7 )}
            </ul>`
        rowNo++;
    }

    return itemListJSXElement;

}

//设置没行的样式
function setUlClass( currRow ) {
    let isActive = false,
        isStart = false,
        isEnd = false,
        startNo = null,
        endNo = null;

    for ( let i = 7; i; i-- ) {
        if ( currRow[i - 1].isActive ) {
            isActive = true;
        }
        if ( currRow[i - 1].isStart ) {
            isActive = true;
            isStart = true;
            startNo = i;
        }
        if ( currRow[i - 1].isEnd ) {
            isActive = true;
            isEnd = true;
            endNo = i;
        }
    }


    if ( !isActive ) {
        return '';
    }

    //取还车同一行并且不是同一天取还车
    if ( isStart && isEnd && startNo != endNo ) {
        let diff = endNo - startNo - 1,
            className = '',
            currNo = startNo + 1;
        for ( let k = 0; k < diff; k++ ) {
            className += ` row-${currNo}`;
            currNo++;
        }
        return className;
    }

    //取还车同一天
    if ( isStart && isEnd && startNo == endNo ) {
        return '';
    }

    //取车日期的行
    if ( isStart && isActive ) {
        return `s-row-${7 - startNo}`;
    }

    //还车日期的行
    if ( isEnd && isActive ) {
        return `e-row-${endNo - 1}`;
    }

    //整行active
    if ( isActive ) {
        return 'full';
    }

}

//设置每个日期状态对应的样式
function setLiClass( isGone, isBefore, isStart, isEnd, isActive ) {
    let className = '';

    if ( isGone ) {
        className += ' gone ';
    }

    if ( isStart ) {
        className += isBefore ? ' start before ' : ' start ';
    }

    if ( isEnd ) {
        className += isBefore ? ' end before ' : ' end ';
    }

    //如果是当天去还车就特殊处理重定className的值
    if ( isStart && isEnd ) {
        className = 'start end';
    }

    return className;
}

//设置每个日期的内容
function setLiAttribute( data, currData, rowNo, colume ) {

    return `<li id=${currData.date != '' ? `t-${data.year}-${data.month}-${currData.date}` : ''}
            class="${setLiClass( currData.isGone, currData.isBefore, currData.isStart, currData.isEnd, currData.isActive )}"
            data-colume="${colume}"
        >
            <span data-gone=${currData.isGone ? '1' : '0'}
                data-year=${data.year}
                data-month=${data.month}
                data-date=${currData.date}
            >
                ${currData.content}
            </span>
        </li>`;
}