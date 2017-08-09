/**
 * Created by lamho on 2017/3/30.
 */
import React, { Component } from 'react';
import Popup from './components/Popup/index.jsx';
import DayListBox from './components/DayListBox/index.jsx';
import './style.scss';
import './reseatStyle/reset.scss';
import debug from './tool/debug.js';
import setDayArray from './tool/setDayList';
import { startArrayToDate, endArrayToDate } from './tool/arrayToDate';
import formatTime from '../tool/format';
import { compareDay } from './tool/compare';
import { setTime, setDay, setDayCount } from './tool/dateTool';
import createList from './tool/createElem.js';

/**
 * 控制显示
 * @param visibility     控制是否显示时间框    必须传
 *
 * 事件
 * @param closeEvent     传入时间框的关闭事件  必须传
 * @param confirmEvent   传入时间框的确认事件  必须传
 *
 * 日期参数
 * @param startTime       日历初始化开始时间    格式：[2017,1,1]  默认今天到明年今日
 * @param endTime        日历初始化结束时间    格式：[2018,1,1]  默认拿starTime一年后
 * @param pickupTime     选中的取车日期        默认没有
 * @param returnTime     选中的还车日期        默认没有
 *
 * 时间参宿
 * @param defaultTime    当无时间时，默认的选中时间
 *      @param h         小时  默认为 10
 *      @param m         分钟  默认为 00  格式为 0 或者 30
 * @param timeRange      时间滑动的范围
 *      @param start     开始  默认为 0
 *      @param end       结束  默认为 24
 * **/

export default class Picker extends Component {

    constructor( props ) {
        super( props );
        let { startTime, endTime } = this.props;

        //如果没有传开始和结束日期，默认是今天到明年今天
        let initStartTime = startArrayToDate( startTime ),
            initEndTime = endArrayToDate( endTime, initStartTime ),
            pickupTime = setTime( props.pickupTime, this.props.defaultTime ),
            pickupDay = setDay( props.pickupTime ),
            returnTime = setTime( props.returnTime, this.props.defaultTime ),
            returnDay = setDay( props.returnTime ),
            dayList = setDayArray( initStartTime, initEndTime, pickupDay, returnDay ),
            pickupInfo = setDay( props.pickupTime ) ? formatTime( props.pickupTime ) : null,
            returnInfo = setDay( props.returnTime ) ? formatTime( props.returnTime ) : null,
            dayCount = pickupDay && returnDay ? setDayCount( pickupDay, returnDay ) : null;

        //在初始化不渲染的时候，就将dayList数组做出来，存在picker里面，之后的dayList用的都是这个初始化出来的数组。
        //当开始和结束日期改变的时候，会触发setState去更改这个数组，不用在显示选择框的时候再去做这个dayList数组
        this.state = {
            dayList: dayList,
            startTime: initStartTime,
            endTime: initEndTime,
            pickupTime: pickupTime,
            returnTime: returnTime,
            pickupDay: pickupDay,
            returnDay: returnDay,
            pickupID: pickupInfo ? `t-${pickupInfo.year}-${pickupInfo.month}-${pickupInfo.day}` : null,
            returnID: returnInfo ? `t-${returnInfo.year}-${returnInfo.month}-${returnInfo.day}` : null,
            dayCount: dayCount,
            JSXElem: createList( JSON.parse( JSON.stringify( dayList ) ) ),
            isPropsWrong: false
        };
    }

    componentDidMount() {
        if ( debug( this.props ) ) {
            return false;
        }
    }

    shouldComponentUpdate( nextProps, nextState ) {

        //在不切换显示的时候更改了日期，需要记录到state中
        if ( nextProps.visibility == this.props.visibility ) {
            let oldPropsData = JSON.stringify( {
                pickupTime: this.props.pickupTime,
                returnTime: this.props.returnTime,
                startTime: this.props.startTime,
                endTime: this.props.endTime,
                defaultTime: this.props.defaultTime,
                timeRange: this.props.timeRange
            } );
            let nextPropsData = JSON.stringify( {
                pickupTime: nextProps.pickupTime,
                returnTime: nextProps.returnTime,
                startTime: nextProps.startTime,
                endTime: nextProps.endTime,
                defaultTime: nextProps.defaultTime,
                timeRange: nextProps.timeRange
            } );
            if ( oldPropsData != nextPropsData ) {
                this.resetAllData( nextProps );
                return true;
            } else { 
                return false;
            }
            
        }


        //改变visibility代表需要更改显示
        if ( nextProps.visibility != this.props.visibility ) {
            this.startComponent( nextProps.visibility );
            // 在关闭时，获取到选择的时间，然后先计算对应的dayList的状态
            if ( !nextProps.visibility ) {
                requestAnimationFrame(() => {
                    this.resetAllData( nextProps );
                } );
            }
            return true;
        }

        return false;

    }

    componentWillReceiveProps( nextProps ) {

        //改变日历范围
        if ( nextProps.startTime && nextProps.endTime ) {
            let newStart = startArrayToDate( nextProps.startTime ).getTime(),
                newEnd = endArrayToDate( nextProps.endTime, nextProps.startTime ).getTime(),
                oldStart = this.state.startTime.getTime(),
                oldEnd = this.state.endTime.getTime();

            //改变时间范围
            if ( newStart != oldStart || newEnd != oldEnd ) {
                let initStartTime = startArrayToDate( nextProps.startTime ),
                    initEndTime = endArrayToDate( nextProps.endTime, nextProps.startTime ),
                    dayList = setDayArray( initStartTime, initEndTime, null, null );

                this.setState( {
                    pickupTime: setTime( null, this.props.defaultTime ),
                    returnTime: setTime( null, this.props.defaultTime ),
                    pickupDay: null,
                    returnDay: null,
                    pickupID: null,
                    returnID: null,
                    dayCount: null,
                    startTime: initStartTime,
                    endTime: initEndTime,
                    dayList: dayList,
                    JSXElem: createList( JSON.parse( JSON.stringify( dayList ) ) )
                } );

            }
        }
    }

    //重新计算所有参数
    resetAllData( nextProps ) {
        let newPickupTime = nextProps.pickupTime ? formatTime( nextProps.pickupTime ) : null,
            oldPickupTime = this.props.pickupTime ? formatTime( this.props.pickupTime ) : null,
            newReturnTime = nextProps.returnTime ? formatTime( nextProps.returnTime ) : null,
            oldReturnTime = this.props.returnTime ? formatTime( this.props.returnTime ) : null,
            pickupTime = setTime( nextProps.pickupTime, nextProps.defaultTime ),
            pickupDay = setDay( nextProps.pickupTime ),
            returnTime = setTime( nextProps.returnTime, nextProps.defaultTime ),
            returnDay = setDay( nextProps.returnTime ),
            dayList = setDayArray( this.state.startTime, this.state.endTime, pickupDay, returnDay );

        let pickupInfo = pickupDay ? formatTime( pickupDay ) : null,
            returnInfo = returnDay ? formatTime( returnDay ) : null;

        this.setState( {
            dayList: dayList,
            JSXElem: createList( JSON.parse( JSON.stringify( dayList ) ) ),
            pickupTime: pickupTime,
            returnTime: returnTime,
            pickupDay: pickupDay,
            returnDay: returnDay,
            dayCount: pickupDay && returnDay ? setDayCount( pickupDay, returnDay ) : null,
            pickupID: pickupInfo ? `t-${pickupInfo.year}-${pickupInfo.month}-${pickupInfo.day}` : null,
            returnID: returnInfo ? `t-${returnInfo.year}-${returnInfo.month}-${returnInfo.day}` : null
        } );

    }

    startComponent( isShow ) {
        if ( isShow ) {
            this.show();
        } else {
            this.hide();
        }
    }

    show() {
        let { confirmEvent, closeEvent, defaultTime, timeRange } = this.props;

        Popup.show( <DayListBox
            startTime={this.state.startTime}
            endTime={this.state.endTime}
            dayList={this.state.dayList}
            pickupTime={this.state.pickupTime}
            returnTime={this.state.returnTime}
            pickupDay={this.state.pickupDay}
            returnDay={this.state.returnDay}
            dayCount={this.state.dayCount}
            defaultTime={defaultTime}
            timeRange={timeRange}
            pickupID={this.state.pickupID}
            returnID={this.state.returnID}
            JSXElem={this.state.JSXElem}
            confirmEvent={( opt ) => {
                confirmEvent( opt );
            }}
            closeEvent={() => {
                closeEvent && closeEvent();
            }}
        />, {
                direction: 'bottom',
                title: '选择当地取还车时间',
                titleBtn: {
                    right: {
                        isShow: false,
                    },
                    left: {
                        name: <i className="iconfont-goback"></i>
                    }
                },
                style: {
                    height: '100%'
                },
                confirm: () => {
                    if ( confirmEvent ) {
                        confirmEvent();
                    }
                },
                close: () => {
                    if ( closeEvent ) {
                        closeEvent();
                    }
                },
                afterConfirm: () => {
                }
            } );
    }

    hide() {
        Popup.hide();
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
