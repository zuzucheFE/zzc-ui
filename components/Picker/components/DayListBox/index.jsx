/**
 * Created by lamho on 2017/3/30.
 */
import React, { Component } from 'react';
import './style.scss';
import SelectedTime from './component/SelectedTime.jsx';
import WeekList from './component/WeekList.jsx';
import Range from './component/Range.jsx';
import WarnSlideTip from '../WarnSlideTip/index.jsx';
import TextToast from '../../../TextToast/index.jsx';

import formatTime from '../../../tool/format';
import { setDayCount } from '../../tool/dateTool';
import { hasClass } from '../../tool/class.js';

import cn from '../../cn.js';
import hk from '../../hk.js';

let timeType = 'pickup',
    warnTimer = null,
    warnID = null,
    timer2 = null,//因为取还车时间setState的速度不一样，可能导致问题，需要等待100毫秒去确定是否真的还车时间小于取车时间
    hasTodayPickupAndReturn = false;//是否同日取还车

//判断是否开启同步时间选择模式
function isOpenSynchronization( pickupTime, returnTime ) {
    let pTime = parseFloat( `${pickupTime.h}${pickupTime.m == '30' ? '.5' : ''}` ),
        rTime = parseFloat( `${returnTime.h}${returnTime.m == '30' ? '.5' : ''}` );

    if ( pTime == rTime ) {
        return true;
    } else {
        return false;
    }

}

//初始化全局属性
function initGlobalData( pickupDay, returnDay ) {

    //重置是否同日取还车
    if ( pickupDay && returnDay ) {
        let pickupInfo = formatTime( pickupDay ),
            returnInfo = formatTime( returnDay );
        pickupInfo.year == returnInfo.year && pickupInfo.month == returnInfo.month && pickupInfo.day == returnInfo.day ? hasTodayPickupAndReturn = true : hasTodayPickupAndReturn = false;
    } else {
        hasTodayPickupAndReturn = false;
    }

    //重置warn组件的定时器
    if ( warnTimer ) {
        clearTimeout( warnTimer );
        warnTimer = null;
    } else {
        warnTimer = null;
    }

    if ( timer2 ) {
        clearTimeout( timer2 );
        timer2 = null;
    } else {
        timer2 = null;
    }

    warnID = null;
    //打开默认为pickup选项
    timeType = 'pickup';
}

function searchParentNodeOffsetTop( node, targetParentNodeClassName ) {
    if ( node.parentNode.className != targetParentNodeClassName ) {
        return searchParentNodeOffsetTop( node.parentNode, targetParentNodeClassName );
    } else {
        return node.parentNode.offsetTop;
    }
}

export default class Time extends Component {

    constructor( props ) {
        super( props );

        // 日期和时间必须分开
        this.state = {
            pickupDay: props.pickupDay,
            returnDay: props.returnDay,
            pickupTime: props.pickupTime,
            returnTime: props.returnTime,
            isShowWarn: false,
            warnText: '',
            dayCount: props.dayCount,
            isSynchronization: isOpenSynchronization( props.pickupTime, props.returnTime ),
            // 开始日期和结束日期的id
            pickupID: props.pickupID,
            returnID: props.returnID,
            // Range
            timeRange: props.timeRange || { start: 0, end: 24 },
        };
        initGlobalData( this.state.pickupDay, this.state.returnDay );

        this.isYesterday = this.isYesterday.bind( this );
        this.synchTimeData = this.synchTimeData.bind( this );
    }


    componentDidMount() {

        //计算中间日历滑动的框的高度
        let _this = this,
            contentHeight = null,
            tHeaderHeight = null,
            weekListHeight = null,
            dialogTitleHeight = null,
            bottomHeight = null,
            dayListBox = null;

        contentHeight = parseFloat( window.getComputedStyle( document.querySelector( '.zzc-dialog' ) ).height );
        tHeaderHeight = parseFloat( window.getComputedStyle( _this.refs.tHeader ).height );
        weekListHeight = parseFloat( window.getComputedStyle( _this.refs.weekList ).height );
        dialogTitleHeight = parseFloat( window.getComputedStyle( document.querySelector( '.zzc-dialog-title-box' ) ).height );
        bottomHeight = _this.refs.bottom ? parseFloat( window.getComputedStyle( _this.refs.bottom ).height ) : 0;
        dayListBox = _this.refs.dayListBox;
        dayListBox.style.height = ( contentHeight - ( tHeaderHeight + weekListHeight + dialogTitleHeight + bottomHeight ) ) + 'px';
        //如果有选中的日期，就将选中日期置顶
        let startElem = document.querySelector( '.day-list-box .start' );
        if ( startElem ) {
            let offsetTop = searchParentNodeOffsetTop( startElem, 'day-item' );
            document.querySelector( '.day-list-box' ).scrollTop = offsetTop;
        }
    }

    //日期点击事件
    clickDay( e ) {
        const { isClickGoneDate } = this.props;

        if ( !isClickGoneDate && e.target.getAttribute( 'data-gone' ) == '1' ) {
            return false;
        }
        let targetClassName = e.target.className;
        //点击日期元素
        if ( hasClass( e.target, 'J-day-info' ) ) {
            let year = e.target.getAttribute( 'data-year' ),
                month = e.target.getAttribute( 'data-month' ) - 1,
                date = e.target.getAttribute( 'data-date' );

            this.selectDay( new Date( year, month, date ), this.changeDate.bind( this ) );
        } else {
            return false;
        }
    }
    // 点击的是否昨天
    isYesterday( year, month, date ) {
        const { currentTime } = this.props;
        const currDate = new Date( `${currentTime.y}-${currentTime.month}-${currentTime.d}` );
        const paramDate = new Date( `${year}-${month}-${date}` );

        if ( currDate - paramDate == 86400000 ) {
            return true;
        }
        return false;
    }

    //更改日期事件
    changeDate( type ) {
        this.props.onChangeDate( {
            pickup: this.state.pickupDay ? this.state.pickupDay : null,
            return: this.state.returnDay ? this.state.returnDay : null
        } );
    }

    //获取点击的时间
    selectDay( selectDay, callback ) {
        this.inspectDay( timeType, selectDay, callback );
    }

    //获取选择的时间段
    selectTime( selectTime, type ) {
        let timeInfo = selectTime.split( ':' );

        //没有还车或者取车日期的时候，只设置时间
        if ( type == 'pickup' ) {

            let pickupDay = this.state.pickupDay ? this.combinationOfTime( 'pickup', this.state.pickupDay, { h: timeInfo[0], m: timeInfo[1] } ) : null,
                dayCount = pickupDay && this.state.returnDay ? this.setDayCount( pickupDay, this.state.returnDay ) : null;

            this.setState( {
                pickupTime: {
                    h: timeInfo[0],
                    m: timeInfo[1]
                },
                pickupDay: pickupDay,
                dayCount: dayCount
            }, () => {
                this.setWarnInfo( type );
            } );
        } else {

            let returnDay = this.state.returnDay ? this.combinationOfTime( 'return', this.state.returnDay, { h: timeInfo[0], m: timeInfo[1] } ) : null,
                dayCount = this.state.pickupDay && returnDay ? this.setDayCount( this.state.pickupDay, returnDay ) : null;

            this.setState( {
                returnTime: {
                    h: timeInfo[0],
                    m: timeInfo[1]
                },
                dayCount: dayCount,
                returnDay: returnDay
            }, () => {
                this.setWarnInfo( type );
            } );
        }
    }

    //更改同步模式
    changeSynchronization( isSynchronization ) {
        if ( this.state.isSynchronization == isSynchronization ) {
            return false;
        }
        this.setState( {
            isSynchronization: isSynchronization
        } );
    }

    //同步时间选择
    synchronizationReturnTimeStart( startData ) {
        this.refs.returnRange.synchronizationReturnTimeStart( startData );
    }
    synchronizationReturnTimeMove( moveData, nextX ) {
        this.refs.returnRange.synchronizationReturnTimeMove( moveData, nextX );
    }
    synchronizationReturnTimeEnd( endData ) {
        this.refs.returnRange.synchronizationReturnTimeEnd( endData );
    }

    //检测选择时间时候符合逻辑
    inspectDay( type, selectDay, callback ) {

        let selectDayInfo = formatTime( selectDay ),
            id = `t-${selectDayInfo.year}-${selectDayInfo.month}-${selectDayInfo.day}`;

        //当前选择的还车时间
        if ( type == 'return' ) {

            let returnTime = this.combinationOfTime( 'return', selectDay ),
                //判断是否同日取还车
                pickupInfo = formatTime( this.state.pickupDay ),
                returnInfo = selectDayInfo;

            pickupInfo.year == returnInfo.year && pickupInfo.month == returnInfo.month && pickupInfo.day == returnInfo.day ? hasTodayPickupAndReturn = true : hasTodayPickupAndReturn = false;


            //还车时间小于取车时间，将还车时间赋值到取车时间，还车时间为null，如果为同日取还车跳过if
            if ( !hasTodayPickupAndReturn && this.state.pickupDay != null && returnTime.getTime() < this.state.pickupDay.getTime() ) {

                this.changeListDayState( 'pickup', id );

                timeType = 'return';
                this.setState( {
                    pickupDay: this.combinationOfTime( 'pickup', selectDay ),
                    returnDay: null,
                    dayCount: null,
                    pickupID: id,
                    returnID: null
                }, () => {
                    callback && callback();
                    this.setWarnInfo( timeType );
                } );
                //正常设置还车时间
            } else {

                this.changeListDayState( 'return', id );

                timeType = 'pickup';
                this.setState( {
                    returnDay: this.combinationOfTime( 'return', selectDay ),
                    dayCount: this.setDayCount( this.state.pickupDay, returnTime ),
                    returnID: id
                }, () => {
                    callback && callback();
                    this.setWarnInfo( timeType );
                } );
            }



        } else {
            this.changeListDayState( 'pickup', id );

            timeType = 'return';
            this.setState( {
                pickupDay: this.combinationOfTime( 'pickup', selectDay ),
                returnDay: null,
                dayCount: null,
                pickupID: id,
                returnID: null
            }, () => {
                callback && callback();
                this.setWarnInfo( timeType );
            } );
        }

    }

    //更改列表日期的显示状态
    changeListDayState( currType, id ) {
        //当前选择的是pickup
        if ( currType == 'pickup' ) {

            //如果已经选中需要清空选中状态
            if ( this.state.pickupID != null || this.state.returnID != null ) {

                let pickupElem = document.querySelector( '#' + this.state.pickupID + '' ),
                    returnElem = document.querySelector( '#' + this.state.returnID + '' );

                //如果已经有取还车，需要将full状态的ul清空状态
                if ( this.state.pickupID != null && this.state.returnID != null ) {

                    //更改日历范围可能导致储存的id找不到元素，如果没有该元素，跳过清除状态
                    let fullUl = document.querySelectorAll( '.day-item-content .full' );
                    if ( fullUl.length != 0 ) {
                        for ( let i = 0; i < fullUl.length; i++ ) {
                            fullUl[i].className = '';
                        }
                    }

                }

                //清除取还车日期选中的class
                if ( pickupElem ) {
                    //如果当前是支持点击之前日期，需要判断如果当前日期是过期日期，将要保留gone的class
                    if ( this.props.isClickGoneDate && pickupElem.children[0].getAttribute( 'data-gone' ) == '1' ) {
                        if ( pickupElem.children[0].getAttribute( 'data-gone' ) == '1' ) {
                            pickupElem.className = "gone";
                        }
                    } else {
                        pickupElem.className = '';
                    }
                    pickupElem.parentNode.className = "";
                }

                if ( returnElem ) {
                    //如果当前是支持点击之前日期，需要判断如果当前日期是过期日期，将要保留gone的class
                    if ( this.props.isClickGoneDate && returnElem.children[0].getAttribute( 'data-gone' ) == '1' ) {
                        returnElem.className = "gone";
                    } else {
                        returnElem.className = '';
                    }
                    returnElem.parentNode.className = "";
                }
            }

            let elem = document.querySelector( '#' + id + '' );
            elem.className = 'start';
            return;
        }

        //当前选择的是return
        if ( currType == 'return' ) {

            let returnElem = document.querySelector( '#' + id + '' );
            //取还车同日
            if ( this.state.pickupID == id ) {
                returnElem.className = 'end start';
            } else {
                let pickupElem = document.querySelector( '#' + this.state.pickupID + '' ),
                    returnCol = returnElem.getAttribute( 'data-colume' ),
                    returnRow = returnElem.parentNode.getAttribute( 'data-row' ),
                    returnMonth = returnElem.parentNode.parentNode.getAttribute( 'data-month' ),
                    returnYear = returnElem.parentNode.parentNode.getAttribute( 'data-year' ),
                    pickupCol = pickupElem.getAttribute( 'data-colume' ),
                    pickupRow = pickupElem.parentNode.getAttribute( 'data-row' ),
                    pickupMonth = pickupElem.parentNode.parentNode.getAttribute( 'data-month' ),
                    pickupYear = pickupElem.parentNode.parentNode.getAttribute( 'data-year' );

                //如果取还车是同一行需要特殊处理
                if ( returnRow == pickupRow && pickupYear == returnYear && returnMonth == pickupMonth ) {
                    let diff = returnCol - pickupCol - 1,
                        currElem = pickupElem,
                        className = '';


                    for ( let k = 0; k < diff; k++ ) {
                        let nextElem = null;
                        if ( currElem.nextSibling.nodeName != 'LI' ) {
                            nextElem = currElem.nextSibling.nextSibling;
                        } else {
                            nextElem = currElem.nextSibling;
                        }

                        className += ` row-${nextElem.getAttribute( 'data-colume' )}`;
                        currElem = nextElem;
                    }
                    returnElem.parentNode.className = className;

                } else {
                    pickupElem.parentNode.className = `s-row-${7 - pickupCol}`;
                    returnElem.parentNode.className = `e-row-${returnCol - 1}`;

                    //找到取还中间相隔多少行
                    let ulElem = document.querySelectorAll( '.day-item-content ul' ),
                        start = false;
                    for ( let i = 0; i < ulElem.length; i++ ) {
                        if ( ulElem[i] == pickupElem.parentNode ) {
                            start = true;
                        } else if ( ulElem[i] == returnElem.parentNode ) {
                            start = false;
                            break;
                        } else {
                            if ( start ) {
                                ulElem[i].className = "full";
                            }
                        }

                    }


                }
                returnElem.className = 'end before';
                pickupElem.className = 'start before';
            }

        }

    }

    //将时间和日期合并输出
    combinationOfTime( type, selectDay, selectTime ) {
        //如果传入了指定事件，就将日期和事件合并，否则就按照type和平对应的时间和日期
        if ( selectTime ) {
            return new Date( new Date( selectDay.setHours( parseInt( selectTime.h ) ) ).setMinutes( parseInt( selectTime.m ) ) );
        }

        if ( type == 'pickup' ) {
            return new Date( new Date( selectDay.setHours( parseInt( this.state.pickupTime.h ) ) ).setMinutes( parseInt( this.state.pickupTime.m ) ) );
        } else {
            return new Date( new Date( selectDay.setHours( parseInt( this.state.returnTime.h ) ) ).setMinutes( parseInt( this.state.returnTime.m ) ) );
        }
    }

    //计算天数
    setDayCount() {
        const { resetDayCount } = this.props;
        if ( resetDayCount ) {
            return resetDayCount(...arguments);
        } else {
            return setDayCount(...arguments);
        }
    }

    //验证时间选择
    verifyDate( pickupDay, returnDay ) {

        if ( !pickupDay ) {
            this.showTextToast( this.props.lang == 'hk' ? hk.toast1 : cn.toast1 );
            return false;
        }

        if ( !returnDay ) {
            this.showTextToast( this.props.lang == 'hk' ? hk.toast2 : cn.toast2 );
            return false;
        }

        let pickupInfo = formatTime( pickupDay, this.props.isOpenTimePicker ),
            returnInfo = formatTime( returnDay, this.props.isOpenTimePicker ),
            pTime = parseFloat( `${pickupInfo.hours}${pickupInfo.minutes == '30' ? '.5' : ''}` ),
            rTime = parseFloat( `${returnInfo.hours}${returnInfo.minutes == '30' ? '.5' : ''}` );

        //当天去还车
        if ( pickupInfo.year == returnInfo.year && pickupInfo.month == returnInfo.month && pickupInfo.day == returnInfo.day ) {
            //同一时间取还车
            if ( pTime == rTime || rTime < pTime ) {
                this.showTextToast( this.props.lang == 'hk' ? hk.toast3 : cn.toast3 );
                return false;
            } else {
                return true;
            }
        }

        return true;
    }

    //显示TextToast弹窗
    showTextToast( content, callback ) {
        TextToast.info(
            content, 2000,
            callback instanceof Function ? callback : null,
            document.querySelector( '.zzc-popup' )
        );
    }

    //确认时间
    confirm() {

        if ( this.verifyDate( this.state.pickupDay, this.state.returnDay ) ) {

            let pickupInfo = this.state.pickupDay ? formatTime( this.state.pickupDay, this.props.isOpenTimePicker ) : null,
                returnInfo = this.state.returnDay ? formatTime( this.state.returnDay, this.props.isOpenTimePicker ) : null,
                { confirmEvent, closeEvent } = this.props;

            confirmEvent instanceof Function && confirmEvent( {
                pickupTime: pickupInfo,
                returnTime: returnInfo,
                dayCount: this.state.dayCount
            } );
            closeEvent instanceof Function && closeEvent();
        }

    }

    //设置警告信息
    setWarnInfo( type ) {

        if ( !this.props.isOpenTimePicker ) {
            return false;
        }

        //如果取还车时间没有不作处理
        if ( !this.state.pickupDay || !this.state.returnDay ) {
            return false;
        }

        let pickupDay = formatTime( this.state.pickupDay, this.props.isOpenTimePicker ),
            returnDay = formatTime( this.state.returnDay, this.props.isOpenTimePicker ),
            pickupTime = parseFloat( `${pickupDay.hours}${pickupDay.minutes == '30' ? '.5' : ''}` ),
            returnTime = parseFloat( `${returnDay.hours}${returnDay.minutes == '30' ? '.5' : ''}` );

        if ( hasTodayPickupAndReturn && pickupTime >= returnTime ) {
            if ( warnID != 1 ) {
                this.hideWarn();
            }
            warnID = 1;
            this.showWarn( this.props.lang == 'hk' ? hk.warn1 : cn.warn1 );
            return false;
        }

        //超出1小时也会按1天算
        if ( !hasTodayPickupAndReturn && pickupDay.time.getTime() < returnDay.time.getTime() && returnTime > pickupTime ) {
            if ( warnID != 2 ) {
                this.hideWarn();
            }
            warnID = 2;
            this.showWarn( this.props.lang == 'hk' ? hk.warn2 : cn.warn2 );
            return false;
        }

        //以上条件不满足代表通过验证，则马上取消警告框
        this.hideWarn();

    }

    //显示警告框
    showWarn( text ) {
        //重新倒计时
        if ( warnTimer != null ) {
            this.warnShowedEvent();
        } else {
            timer2 = setTimeout( () => {
                this.setState( {
                    isShowWarn: true,
                    warnText: text
                } );
            }, 100 );
        }
    }

    //隐藏警告框
    hideWarn() {
        clearTimeout( timer2 );
        timer2 = null;
        if ( warnTimer != null ) {
            clearTimeout( warnTimer );
            warnTimer = null;
            this.setState( {
                isShowWarn: false,
            } );
        }
    }

    //警告信息弹出后的回调
    warnShowedEvent() {
        //如果当前没有进入倒计时收起，就正常倒计时
        if ( warnTimer == null ) {
            warnTimer = setTimeout( () => {
                this.setState( {
                    isShowWarn: false,
                } );
                warnTimer = null;
            }, 4000 );
            //如果正在倒计时的时候再次触发弹出warn，则清除之前的倒计时重新计时
        } else {
            clearTimeout( warnTimer );
            warnTimer = setTimeout( () => {
                this.setState( {
                    isShowWarn: false,
                } );
                warnTimer = null;
            }, 4000 );
        }
    }

    //有时间选择的底部控件
    haveTimeBottomController() {
        const { lang, yesterdayTimeRange, currentTime } = this.props;
        const { timeRange } = this.state;
        return (
            <div className="bottom-controller-box">
                <Range
                    ref="pickupRange"
                    synchronizationReturnTimeStart={( data ) => {
                        this.synchronizationReturnTimeStart( data );
                    }}
                    synchronizationReturnTimeMove={( data, nextX ) => {
                        this.synchronizationReturnTimeMove( data, nextX );
                    }}
                    synchronizationReturnTimeEnd={( data ) => {
                        this.synchronizationReturnTimeEnd( data );
                    }}
                    synchTimeData={this.synchTimeData}
                    isSynchronization={this.state.isSynchronization}
                    title={lang == 'hk' ? hk.pickupTime : cn.pickupTime}
                    rangeType={lang == 'hk' ? hk.pickup : cn.pickup}
                    type="pickup"
                    timeRange={timeRange}
                    yesterdayTimeRange={yesterdayTimeRange}
                    time={this.state.pickupTime}
                    day={this.state.pickupDay}
                    currentTime={currentTime}
                    isYesterday={this.isYesterday}
                    selectTime={( time, type ) => {
                        this.selectTime( time, type );
                    }}
                />
                <Range
                    ref="returnRange"
                    title={lang == 'hk' ? hk.returnTime : cn.returnTime}
                    rangeType={lang == 'hk' ? hk.return : cn.return}
                    type="return"
                    timeRange={timeRange}
                    yesterdayTimeRange={yesterdayTimeRange}
                    isSynchronization={this.state.isSynchronization}
                    time={this.state.returnTime}
                    day={this.state.returnDay}
                    pickupDay={this.state.pickupDay}
                    currentTime={currentTime}
                    isYesterday={this.isYesterday}
                    synchTimeData={this.synchTimeData}
                    selectTime={( time, type ) => {
                        this.selectTime( time, type );
                    }}
                    changeSynchronization={( isSynchronization ) => {
                        this.changeSynchronization( isSynchronization );
                    }}
                />
                <div className="confirm-box">
                    <span onClick={() => {
                        this.confirm();
                    }}>{lang == 'hk' ? hk.confirm : cn.confirm}</span>
                </div>
            </div>
        );
    }

    //没有时间选择的底部控件
    noTimeBottomController() {
        return (
            <div className="bottom-controller-box">
                <div className="confirm-box">
                    <span onClick={() => {
                        this.confirm();
                    }}>{this.props.lang == 'hk' ? hk.confirm : cn.confirm}</span>
                </div>
            </div>
        );
    }
    synchTimeData( timeData, type ) {
        if ( type == 'pickupTime' ) {
            this.setState( {
                pickupTime: timeData,
                pickupDay: this.state.pickupDay ? this.combinationOfTime( 'pickup', this.state.pickupDay, { h: timeData.h, m: timeData.m } ) : null,
            } );
        } else {
            this.setState( {
                returnTime: timeData
            } );
        }
    }

    render() {
        let { hideController, isOpenTimePicker, startTime, endTime, timeRange, dayList, JSXElem, pickupPlaceholder, returnPlaceholder, lang } = this.props;
        return (
            <div className="t-box">
                <div className="t-box-content">
                    <div className="t-header" ref="tHeader">
                        <SelectedTime
                            class="t-pickup-time"
                            title="取车时间"
                            isOpenTimePicker={isOpenTimePicker}
                            day={this.state.pickupDay}
                            time={isOpenTimePicker ? this.state.pickupTime : null}
                            placeholder={pickupPlaceholder}
                        />
                        {
                            this.state.dayCount ?
                                <div className="t-total-day">
                                    <span>{`${this.state.dayCount}天`}</span>
                                </div> :
                                <div className="t-none-day">
                                    <i className="iconfont-arrows"></i>
                                </div>
                        }
                        <SelectedTime
                            class="t-return-time"
                            title="还车时间"
                            isOpenTimePicker={isOpenTimePicker}
                            day={this.state.returnDay}
                            time={isOpenTimePicker ? this.state.returnTime : null}
                            placeholder={returnPlaceholder}
                        />
                    </div>

                    <div ref="weekList">
                        <WeekList />
                    </div>

                    <div
                        dangerouslySetInnerHTML={{ __html: JSXElem }}
                        className="day-list-box"
                        ref="dayListBox"
                        onClick={( e ) => {
                            this.clickDay( e );
                        }}
                    />

                </div>
                {!hideController && <div ref="bottom" className={isOpenTimePicker ? "bottom-controller" : "bottom-controller no-time"}>
                    {isOpenTimePicker ? this.haveTimeBottomController() : this.noTimeBottomController()}
                    <WarnSlideTip
                        text={this.state.warnText}
                        isShow={this.state.isShowWarn}
                        showedEvent={() => {
                            this.warnShowedEvent();
                        }}
                    />
                </div>}
            </div>
        );
    }
}