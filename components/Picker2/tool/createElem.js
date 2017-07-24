export default function ( calendarList ) {
    let elem = '';

    for ( let i = 0; i < calendarList.length; i++ ) {
        elem += `<div class="day-item">
                <div class="day-item-title">
                    <span>${calendarList[i].year}年</span>
                    <span>${calendarList[i].month}月</span>
                </div>
                <div class="day-item-content">
                    ${setCalendarDay( calendarList[i] )}
                </div>
            </div>`;
    }

    return elem;
}

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

//设置取还车tips
function setTips( isStart, isEnd ) {
    if ( isStart && isEnd ) {
        return ( <i id="start-end-tips">取还车</i> );
    } else if ( isStart ) {
        return ( <i id="start-tips">取车</i> );
    } else if ( isEnd ) {
        return ( <i id="end-tips">还车</i> );
    } else { 
        return ''
    }
}

function setLiAttribute( data, currData, rowNo, colume ) {
    
    return `<li id=${currData.date != '' ? `t-${data.year}-${data.month}-${currData.date}` : ''}
            class=${setLiClass( currData.isGone, currData.isBefore, currData.isStart, currData.isEnd, currData.isActive )}
            data-colume="${colume}"
        >
            <span data-gone=${currData.isGone ? '1' : '0'}
                data-year=${data.year}
                data-month=${data.month}
                data-date=${currData.date}
            >
                ${currData.content}
                ${setTips( currData.isStart, currData.isEnd )}
            </span>
        </li>`;
}