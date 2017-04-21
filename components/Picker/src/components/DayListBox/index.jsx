/**
 * Created by lamho on 2017/3/30.
 */
import React, {Component} from 'react';
import './style.scss';
import DateList from './component/DateList.jsx';
import SelectedTime from './component/SelectedTime.jsx';
import WeekList from './component/WeekList.jsx';
import Range from './component/Range.jsx';
import WarnSlideTip from '../WarnSlideTip';

import formatTime from '../../tool/format';

let timeType = 'pickup',
    topHeight = 0,
    warnTimer = null,
    hasTodayPickupAndReturn = false;//是否同日取还车

//判断是否开启同步时间选择模式
function isOpenSynchronization(pickupTime, returnTime) {
    let pTime = parseFloat(`${pickupTime.h}${pickupTime.m == '30' ? '.5' : ''}`),
        rTime = parseFloat(`${returnTime.h}${returnTime.m == '30' ? '.5' : ''}`);

    if(pTime == rTime){
        return true;
    }else{
        return false;
    }
}

export default class Time extends Component {

    constructor(props) {
        super(props);

        let pickupTime,returnTime;

        if(!!props.pickupTime && props.pickupTime !== ''){
            pickupTime = {
                h: new Date(props.pickupTime).getHours(),
                m: new Date(props.pickupTime).getMinutes() < 10 ? `0${new Date(props.pickupTime).getMinutes()}` : new Date(props.pickupTime).getMinutes()
            };
        }else{
            //默认为10点
            pickupTime = !!this.props.defaultTime ? this.props.defaultTime : {
                h: '10',
                m: '00'
            };
        }

        if(!!props.returnTime && props.returnTime !== ''){
            returnTime = {
                h: new Date(props.returnTime).getHours(),
                m: new Date(props.returnTime).getMinutes() < 10 ? `0${new Date(props.returnTime).getMinutes()}` : new Date(props.returnTime).getMinutes()
            };
        }else{
            //默认为10点
            returnTime = !!this.props.defaultTime ? this.props.defaultTime : {
                h: '10',
                m: '00'
            };
        }

        //日期和时间必须分开
        this.state = {
            pickupDay: !!props.pickupTime && props.pickupTime !== '' ? new Date(props.pickupTime) : null,
            returnDay: !!props.returnTime && props.returnTime !== '' ? new Date(props.returnTime) : null,
            pickupTime: pickupTime,
            returnTime: returnTime,
            dayCount: null,
            isShowWarn: false,
            warnText: '',
            isSynchronization: isOpenSynchronization(pickupTime, returnTime)
        };

        // isOpenSynchronization(pickupTime, returnTime);
    }

    componentDidMount() {
        let _this = this,
            windowHeight = document.body.clientHeight,
            tHeaderHeight = null,
            weekListHeight = null,
            dialogTitleHeight = null,
            bottomHeight = null,
            dayListBox = null;

        tHeaderHeight = parseFloat(window.getComputedStyle(_this.refs.tHeader).height);
        weekListHeight = parseFloat(window.getComputedStyle(_this.refs.weekList).height);
        dialogTitleHeight = parseFloat(window.getComputedStyle(document.querySelector('.zzc-dialog-title-box')).height);
        bottomHeight = parseFloat(window.getComputedStyle(_this.refs.bottom).height);
        dayListBox = _this.refs.dayListBox;

        dayListBox.style.height = (windowHeight - (tHeaderHeight + weekListHeight + dialogTitleHeight + bottomHeight)) + 'px';

        topHeight = tHeaderHeight + weekListHeight + dialogTitleHeight;
    }

    //获取点击的时间
    selectDay(selectDay) {

        this.inspectDay(timeType, selectDay);

    }

    //获取选择的时间段
    selectTime(selectTime,type) {
        let timeInfo = selectTime.split(':');

        //没有还车或者取车日期的时候，只设置时间
        if(type == 'pickup'){
            this.setState({
                pickupTime : {
                    h:timeInfo[0],
                    m:timeInfo[1]
                },
                pickupDay : this.state.pickupDay ? this.combinationOfTime('pickup',this.state.pickupDay,{h:timeInfo[0],m:timeInfo[1]}) : null
            },() => {
                this.setWarnInfo(type);
            });
        }else{
            this.setState({
                returnTime : {
                    h:timeInfo[0],
                    m:timeInfo[1]
                },
                returnDay : this.state.returnDay ? this.combinationOfTime('return',this.state.returnDay,{h:timeInfo[0],m:timeInfo[1]}) : null
            },() => {
                this.setWarnInfo(type);
            });
        }
    }

    //更改同步模式
    changeSynchronization(isSynchronization) {
        if(this.state.isSynchronization == isSynchronization){
            return false;
        }
        this.setState({
            isSynchronization : isSynchronization
        });
    }

    //同步时间选择
    synchronizationReturnTimeStart(startData) {
        this.refs.returnRange.synchronizationReturnTimeStart(startData);
    }
    synchronizationReturnTimeMove(moveData,nextX) {
        this.refs.returnRange.synchronizationReturnTimeMove(moveData,nextX);
    }
    synchronizationReturnTimeEnd(endData) {
        this.refs.returnRange.synchronizationReturnTimeEnd(endData);
    }

    //检测选择时间时候符合逻辑
    inspectDay(type,selectDay) {

        //当前选择的还车时间
        if(type == 'return'){

            let returnTime = this.combinationOfTime('return', selectDay),
                //判断是否同日取还车
                pickupInfo = formatTime(this.state.pickupDay),
                returnInfo = formatTime(selectDay);

            pickupInfo.year == returnInfo.year && pickupInfo.month == returnInfo.month && pickupInfo.day == returnInfo.day ? hasTodayPickupAndReturn = true : hasTodayPickupAndReturn = false;


            //还车时间小于取车时间，将还车时间赋值到取车时间，还车时间为null，如果为同日取还车跳过if
            if(!hasTodayPickupAndReturn && this.state.pickupDay != null && returnTime.getTime() < this.state.pickupDay.getTime()){
                timeType = 'return';
                this.setState({
                    pickupDay: this.combinationOfTime('pickup', selectDay),
                    returnDay: null,
                    dayCount: null
                },() => {
                    this.setWarnInfo(timeType);
                });
            //正常设置还车时间
            }else{

                timeType = 'pickup';
                this.setState({
                    returnDay: this.combinationOfTime('return', selectDay),
                    dayCount: this.setDayCount(returnTime, this.state.pickupDay)
                },() => {
                    this.setWarnInfo(timeType);
                });
            }

        }else{
            timeType = 'return';
            this.setState({
                pickupDay: this.combinationOfTime('pickup', selectDay),
                returnDay: null,
                dayCount: null
            },() => {
                this.setWarnInfo(timeType);
            });
        }

    }

    //将时间和日期合并输出
    combinationOfTime(type, selectDay, selectTime) {
        //如果传入了指定事件，就将日期和事件合并，否则就按照type和平对应的时间和日期
        if(selectTime){
            return new Date(new Date(selectDay.setHours(parseInt(selectTime.h))).setMinutes(parseInt(selectTime.m)));
        }

        if(type == 'pickup'){
            return new Date(new Date(selectDay.setHours(parseInt(this.state.pickupTime.h))).setMinutes(parseInt(this.state.pickupTime.m)));
        }else{
            return new Date(new Date(selectDay.setHours(parseInt(this.state.returnTime.h))).setMinutes(parseInt(this.state.returnTime.m)));
        }
    }

    //计算天数
    setDayCount(returnDay,pickupDay) {
        let returnTime = returnDay.getTime(),
            pickupTime = pickupDay.getTime(),
            diff = returnTime - pickupTime;

        return Math.ceil(diff/1000/60/60/24);
    }

    //确认时间
    confirm() {
        let {confirmEvent, closeEvent} = this.props;
        confirmEvent instanceof Function && confirmEvent({
            pickupTime : formatTime(this.state.pickupDay),
            returnTime : formatTime(this.state.returnDay),
            dayCount : this.state.dayCount
        });
        closeEvent instanceof Function && closeEvent();

    }

    //设置警告信息
    setWarnInfo(type) {

        //如果取还车时间没有不作处理
        if(!this.state.pickupDay || !this.state.returnDay){
            return false;
        }

        let pickupDay = formatTime(this.state.pickupDay),
            returnDay = formatTime(this.state.returnDay),
            pickupTime = parseFloat(`${pickupDay.hours}${pickupDay.minutes == '30' ? '.5' : ''}`),
            returnTime = parseFloat(`${returnDay.hours}${returnDay.minutes == '30' ? '.5' : ''}`);

        if(hasTodayPickupAndReturn){
            //不作重复显示
            if(this.state.warnText == '当日取还，还车时间需晚于取车时间'){
                return false;
            }
            this.showWarn('当日取还，还车时间需晚于取车时间');
            return false;
        }

        //还车时间小于取车时间，例如：10：00取车  还车是9：00
        if(pickupTime > returnTime){
            //不作重复显示
            if(this.state.warnText == '不满24小时按1天算'){
                return false;
            }
            this.showWarn('不满24小时按1天算');
            return false;
        }

        //以上条件不满足代表通过验证，则马上手气警告框
        this.hideWarn();

    }

    //显示警告框
    showWarn(text) {
        //重新倒计时
        if(warnTimer != null){
            this.warnShowedEvent();
        }else{
            this.setState({
                isShowWarn: true,
                warnText: text
            });
        }
    }

    //隐藏警告框
    hideWarn() {
        if(warnTimer != null){
            this.setState({
                isShowWarn: false,
            });
        }
    }

    //警告信息弹出后的回调
    warnShowedEvent() {
        //如果当前没有进入倒计时收起，就正常倒计时
        if(warnTimer == null){
            warnTimer = setTimeout(() => {
                this.setState({
                    isShowWarn: false,
                });
                warnTimer = null;
            },4000);
        //如果正在倒计时的时候再次触发弹出warn，则清除之前的倒计时重新计时
        }else{
            clearTimeout(warnTimer);
            warnTimer = setTimeout(() => {
                this.setState({
                    isShowWarn: false,
                });
                warnTimer = null;
            },4000);
        }
    }

    render() {
        let {startTime, endTime,timeRange} = this.props;

        return (
            <div className="t-box">
                <div className="t-box-content">
                    <div className="t-header" ref="tHeader">
                        <SelectedTime
                            class="t-pickup-time"
                            title="取车时间"
                            day={this.state.pickupDay}
                            time={this.state.pickupTime}
                            placeholder="选择取车时间"
                        />
                        {
                            this.state.dayCount ?
                                <div className="t-total-day">
                                    <span>{`${this.state.dayCount}天`}</span>
                                </div>:
                                <div className="t-none-day">
                                    <i className="iconfont-arrows"></i>
                                </div>
                        }
                        <SelectedTime
                            class="t-return-time"
                            title="还车时间"
                            day={this.state.returnDay}
                            time={this.state.returnTime}
                            placeholder="选择还车时间"
                        />
                    </div>

                    <div ref="weekList">
                        <WeekList/>
                    </div>

                    <div className="day-list-box" ref="dayListBox">
                        <DateList
                            startTime={startTime}
                            endTime={endTime}
                            selectDay={(selectTime) => {
                                this.selectDay(selectTime);
                            }}
                            topHeight={topHeight}
                            pickupDay={this.state.pickupDay}
                            returnDay={this.state.returnDay}
                        />
                    </div>
                </div>
                <div ref="bottom" className="bottom-controller">
                    <div className="bottom-controller-box">
                        <Range
                            ref="pickupRange"
                            synchronizationReturnTimeStart={(data) => {
                                this.synchronizationReturnTimeStart(data);
                            }}
                            synchronizationReturnTimeMove={(data,nextX) => {
                                this.synchronizationReturnTimeMove(data,nextX);
                            }}
                            synchronizationReturnTimeEnd={(data) => {
                                this.synchronizationReturnTimeEnd(data);
                            }}
                            isSynchronization={this.state.isSynchronization}
                            title="取车时间"
                            rangeType="取车"
                            type="pickup"
                            timeRange={timeRange}
                            time={this.state.pickupTime}
                            day={this.state.pickupDay}
                            selectTime={(time,type) => {
                                this.selectTime(time,type);
                            }}
                        />
                        <Range
                            ref="returnRange"
                            title="还车时间"
                            rangeType="还车"
                            type="return"
                            timeRange={timeRange}
                            isSynchronization={this.state.isSynchronization}
                            time={this.state.returnTime}
                            day={this.state.returnDay}
                            selectTime={(time,type) => {
                                this.selectTime(time,type);
                            }}
                            changeSynchronization={(isSynchronization) => {
                                this.changeSynchronization(isSynchronization);
                            }}
                        />
                        <div className="confirm-box">
                        <span onClick={() => {
                            this.confirm();
                        }}>确认</span>
                        </div>
                    </div>
                    <WarnSlideTip
                        text={this.state.warnText}
                        isShow={this.state.isShowWarn}
                        showedEvent={() => {
                            this.warnShowedEvent();
                        }}
                    />
                </div>
            </div>
        );
    }
}