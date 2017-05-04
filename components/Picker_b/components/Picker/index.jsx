/**
 * Created by lamho on 2017/3/30.
 */
import React, {Component} from 'react';
import Popup from '../../../Popup/index.jsx';
import DayListBox from '../DayListBox/index.jsx';
import './style.scss';
import '../../../../reseatStyle/reset.scss';
import debug from '../../tool/debug';
import setDayArray from '../../tool/setDayList';
import {startArrayToDate, endArrayToDate} from '../../tool/arrayToDate';
import formatTime from '../../../../tool/format';
import {compareDay} from '../../tool/compare';

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
export default class Picker extends Component{

    constructor(props){
        super(props);

        let {startTime, endTime, pickupTime, returnTime} = this.props;

        //如果没有传开始和结束日期，默认是今天到明年今天
        let initStartTime = startArrayToDate(startTime),
            initEndTime = endArrayToDate(endTime, initStartTime);
        //在初始化不渲染的时候，就将dayList数组做出来，存在picker里面，之后的dayList用的都是这个初始化出来的数组。
        //当开始和结束日期改变的时候，会触发setState去更改这个数组，不用在显示选择框的时候再去做这个dayList数组

        this.state = {
            dayList: setDayArray(initStartTime, initEndTime, pickupTime, returnTime),
            startTime: initStartTime,
            endTime: initEndTime,
            dayListJSX: null
        };

    }

    componentDidMount() {
        if (debug(this.props)) {
            return false;
        }
    }

    shouldComponentUpdate(nextProps, nextState) {

        //改变visibility代表需要更改显示
        if(nextProps.visibility != this.props.visibility){
            this.startComponent(nextProps.visibility);

            // 在关闭时，获取到选择的时间，然后先计算对应的dayList的状态
            if (!nextProps.visibility) {

                let newPickupTime = nextProps.pickupTime ? formatTime(nextProps.pickupTime) : null,
                    oldPickupTime = this.props.pickupTime ? formatTime(this.props.pickupTime) : null,
                    newReturnTime = nextProps.returnTime ? formatTime(nextProps.returnTime) : null,
                    oldReturnTime = this.props.returnTime ? formatTime(this.props.returnTime) : null;

                //如果选择的时间和之前的不一样，在时间框关闭后则需要重新组装。
                if (!compareDay(newPickupTime, oldPickupTime) || !compareDay(newReturnTime, oldReturnTime)) {
                    this.setState({
                        dayList: setDayArray(this.state.startTime, this.state.endTime, nextProps.pickupTime, nextProps.returnTime),
                    });
                }
            }

            return true;
        }

        let newStart = startArrayToDate(nextProps.startTime).getTime(),
            newEnd = startArrayToDate(nextProps.endTime, nextProps.startTime).getTime(),
            oldStart = startArrayToDate(this.props.startTime).getTime(),
            oldEnd = startArrayToDate(this.props.endTime, this.props.endTime).getTime();

        //改变时间范围
        if (newStart != oldStart || newEnd != oldEnd) {
            let initStartTime = startArrayToDate(nextProps.startTime),
                initEndTime = endArrayToDate(nextProps.endTime, nextProps.startTime);
            this.setState({
                dayList: setDayArray(initStartTime, initEndTime, this.props.pickupTime, this.props.returnTime),
                startTime: initStartTime,
                endTime: initEndTime,
            });
            return true;
        }

        return false;

    }

    startComponent(isShow) {
        if(isShow){
            this.show();
        }else{
            this.hide();
        }
    }

    show() {
        let {pickupTime, returnTime, confirmEvent, closeEvent, defaultTime, timeRange} = this.props;

        Popup.show(<DayListBox
            startTime={this.state.startTime}
            endTime={this.state.endTime}
            dayList={this.state.dayList}
            pickupTime={pickupTime}
            returnTime={returnTime}
            defaultTime={defaultTime}
            timeRange={timeRange}
            confirmEvent={(opt) => {
                confirmEvent(opt);
            }}
            closeEvent={() => {
                closeEvent && closeEvent();
            }}
        />, {
            direction: 'bottom',
            title: '选择当地取还车时间',
            titleBtn: {
                right: {
                    isShow : false,
                },
                left: {
                    name : <i className="iconfont-goback"></i>
                }
            },
            style: {
                height: '100%'
            },
            confirm: () => {
                if (confirmEvent) {
                    confirmEvent();
                }
            },
            close: () => {
                if (closeEvent) {
                    closeEvent();
                }
            },
            afterConfirm: () => {
            }
        });
    }

    hide() {
        Popup.hide();
    }

    render() {

        return(
            <div>
                {this.props.children}
            </div>
        );
    }
}
