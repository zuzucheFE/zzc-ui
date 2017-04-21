/**
 * Created by lamho on 2017/4/6.
 */
import React, {Component} from 'react';
import getWeek from '../../../tool/getWeek';
import Event from '../../../tool/Event';

export default class SelectedTime extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currDay: this.props.day,
            nextDay: this.props.day,
            currTime: this.props.time,
            nextTime: this.props.time,
            animateEvent : null
        };

    }

    shouldComponentUpdate(nextProps, nextState) {

        let stateNextDay = new Date(nextState.nextDay).getTime(),
            stateCurrDay = new Date(this.state.currDay).getTime();

        if( (stateNextDay == stateCurrDay) ){
            return false;
        }
        return true;

    }

    componentWillReceiveProps(nextProps) {
        let fn = this.animateBoxAnimateCallBack.bind(this);

        //需要重新去计算最新的时间和日期的时间对象，否则会出现bug
        this.setState({
            nextDay: nextProps.day ? new Date(new Date(new Date(nextProps.day).setHours(nextProps.time.h)).setMinutes(nextProps.time.m)) : null,
            nextTime: nextProps.time,
            animateEvent: fn
        });
    }

    componentDidUpdate() {
        let animateBox = this.refs.timeAnimateBox;
        animateBox.className = 't-animate-box zzc-animation-up-slide in';
        Event.addEndEventListener(animateBox,this.state.animateEvent);
    }

    animateBoxAnimateCallBack() {
        let animateBox = this.refs.timeAnimateBox;

        this.setState({
            currDay : this.state.nextDay,
            currTime : this.state.nextTime
        },() => {
            animateBox.className = 't-animate-box';
            Event.removeEndEventListener(animateBox,this.state.animateEvent);
        });

    }

    setTimeInfoContent(title, placeholder) {

        let currDateDay = null,
            currMonth = null,
            currDate = null,
            currWeek = null,
            nextDateDay = null,
            nextMonth = null,
            nextDate = null,
            nextWeek = null;

        if (!!this.state.currDay) {
            currDateDay = new Date(this.state.currDay);
            currMonth = currDateDay.getMonth() + 1;
            currDate = currDateDay.getDate();
            currWeek = currDateDay.getDay();
        }

        if (!!this.state.nextDay) {
            nextDateDay = new Date(this.state.nextDay);
            nextMonth = nextDateDay.getMonth() + 1;
            nextDate = nextDateDay.getDate();
            nextWeek = nextDateDay.getDay();
        }

        return (
            <div className="t-animate-box" ref="timeAnimateBox">
                <div className="t-time-box" ref="currBox">
                    { !!this.state.currDay ?
                        <div className="t-time-info">
                            <div>
                                <span className="t-title">{title}</span>
                                <span className="t-week">周{getWeek(currWeek)}</span>
                            </div>
                            <div>
                                <span className="t-day">{currMonth}月{currDate}日</span>
                                <span className="t-time">{`${this.state.currTime.h}:${this.state.currTime.m}`}</span>
                            </div>
                        </div> :
                        <div className="t-time-box">
                            <div className="t-placeholder">
                                <p>{placeholder}</p>
                            </div>
                        </div>
                    }
                </div>
                <div className="t-time-box" ref="nextBox">
                    { !!this.state.nextDay ?
                        <div className="t-time-info">
                            <div>
                                <span className="t-title">{title}</span>
                                <span className="t-week">周{getWeek(nextWeek)}</span>
                            </div>
                            <div>
                                <span className="t-day">{nextMonth}月{nextDate}日</span>
                                <span className="t-time">{`${this.state.nextTime.h}:${this.state.nextTime.m}`}</span>
                            </div>
                        </div> :
                        <div className="t-time-box">
                            <div className="t-placeholder">
                                <p>{placeholder}</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );

    }

    render() {

        let boxClassName = this.props.class,
            {title, placeholder, time} = this.props;

        return (
            <div className={boxClassName}>
                {this.setTimeInfoContent(title, placeholder,time)}
            </div>
        );
    }

}