/**
 * Created by lamho on 2017/4/12.
 */
import React, {Component} from 'react';
import Tooltip from '../../Tooltip/index.jsx';

export default class Range extends Component{

    constructor(props) {
        super(props);
        this.state = {
            maxSlideWidth : null,//最大滑动距离
            timeArr : [],//时间数组
            start : !!props.timeRange ? props.timeRange.start : 0,//开始范围
            end : !!props.timeRange ? props.timeRange.end : 24,//结束范围
            currTime : `${props.time.h}:${props.time.m}`,//当前时间
            currSlideWidth : '',//当前滑动到的时间
            startX : 0,//上一次滚动的位置
            btnClass : 'range-btn',//控制btn的样式
            isActive : false,
            touchStartEvent : null,
            touchMoveEvent : null,
            touchEndEvent : null
        };
    }

    shouldComponentUpdate(nextProps, nextState) {

        if(nextState.currSlideWidth != this.state.currSlideWidth){
            return true;
        }
        if(nextState.currTime != this.state.currTime){
            return true;
        }
        if(nextState.startX != this.state.startX){
            return true;
        }
        if(nextState.btnClass != this.state.btnClass){
            return true;
        }
        if(nextState.isActive != this.state.isActive){
            return true;
        }
        return false;
    }

    componentDidMount() {
        let btnWidth = parseFloat(window.getComputedStyle(this.refs.btn).width),
            rangeContentWidth = parseFloat(window.getComputedStyle(this.refs.content).width);

        this.setState({
            timeArr : this.setTimeArr((rangeContentWidth - btnWidth)),
            maxSlideWidth : (rangeContentWidth - btnWidth),
            touchStartEvent : this.touchStart.bind(this),
            touchMoveEvent : this.touchMove.bind(this),
            touchEndEvent : this.touchEnd.bind(this)
        },() => {
            this.setDefaultTime();

            this.refs.btn.addEventListener('touchstart', this.state.touchStartEvent);

            this.refs.btn.addEventListener('touchmove', this.state.touchMoveEvent);

            this.refs.btn.addEventListener('touchend', this.state.touchEndEvent);

        });
    }

    componentWillUnmount() {
        this.refs.btn.removeEventListener('touchstart', this.state.touchStartEvent);

        this.refs.btn.removeEventListener('touchmove', this.state.touchMoveEvent);

        this.refs.btn.removeEventListener('touchend', this.state.touchEndEvent);
    }

    touchStart(event) {

        event.preventDefault();

        //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
        if(this.props.synchronizationReturnTimeStart && this.props.isSynchronization){
            this.props.synchronizationReturnTimeStart({
                startX : event.targetTouches[0].pageX,
                btnClass : 'range-btn active',
                isActive : true
            });
        }

        this.setState({
            startX : event.targetTouches[0].pageX,
            btnClass : 'range-btn active',
            isActive : true
        });
    }

    touchMove(event) {

        event.preventDefault();

        let currX = event.changedTouches[0].clientX - this.state.startX,
            currBtnTransform = parseFloat(this.refs.btnBox.style.webkitTransform.split('(')[1].split(')')[0]),
            nextX = currBtnTransform + currX;

        //当注定更改还车时间选择的时候，将不再同步
        if(this.props.isSynchronization && this.props.type == 'return'){
            this.props.changeSynchronization(false);
        }

        if(nextX <= 0){
            //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
            if(this.props.synchronizationReturnTimeMove && this.props.isSynchronization){
                this.props.synchronizationReturnTimeMove({
                    currSlideWidth : 0,
                    currTime: this.state.timeArr[0].content
                },null);
            }
            this.setState({
                currSlideWidth : 0,
                currTime: this.state.timeArr[0].content
            });
            return false;
        }

        if(nextX > this.state.maxSlideWidth){
            //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
            if(this.props.synchronizationReturnTimeMove && this.props.isSynchronization){
                this.props.synchronizationReturnTimeMove({
                    currTime: this.state.timeArr[this.state.timeArr.length - 1].content,
                    currSlideWidth : this.state.maxSlideWidth
                },null);
            }
            this.setState({
                currTime: this.state.timeArr[this.state.timeArr.length - 1].content,
                currSlideWidth : this.state.maxSlideWidth
            });
            return false;
        }

        this.getCurrTime(nextX);

        //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
        if(this.props.synchronizationReturnTimeMove && this.props.isSynchronization){
            this.props.synchronizationReturnTimeMove({
                startX : event.changedTouches[0].clientX,
                currSlideWidth : nextX
            },nextX);
        }
        this.setState({
            startX : event.changedTouches[0].clientX,
            currSlideWidth : nextX
        });

    }

    touchEnd(event) {
        event.preventDefault();
        //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
        if(this.props.synchronizationReturnTimeEnd && this.props.isSynchronization){
            this.props.synchronizationReturnTimeEnd({
                btnClass : 'range-btn',
                isActive : false
            });
        }

        this.setState({
            btnClass : 'range-btn',
            isActive : false
        },() => {
            this.props.selectTime(this.state.currTime,this.props.type);
        });
    }

    //被同步的响应函数
    synchronizationReturnTimeStart(startData) {
        if(this.props.type == 'return'){
            this.setState(startData);
        }
    }
    synchronizationReturnTimeMove(moveData,nextX) {
        if(this.props.type == 'return'){

            if(nextX){
                this.getCurrTime(nextX);
            }
            this.setState(moveData);
        }
    }
    synchronizationReturnTimeEnd(endData) {
        if(this.props.type == 'return'){
            this.setState(endData,() => {
                this.props.selectTime(this.state.currTime,this.props.type);
            });
        }
    }

    //滚动时获取对应的时间
    getCurrTime(nextX) {
        let timeArr = this.state.timeArr,
            currXEstimateIndex = parseInt(nextX / (this.state.maxSlideWidth / timeArr.length));

        if(!timeArr[currXEstimateIndex] || this.state.currTime == timeArr[currXEstimateIndex].content) {
            return false;
        }else{
            this.setState({
                currTime : timeArr[currXEstimateIndex].content
            });
        }
    }

    //设置默认滑动时间框的位置
    setDefaultTime() {

        let curr = this.state.currTime,
            hour = curr.split(':')[0],
            minute = curr.split(':')[1],
            timeArr = this.state.timeArr,
            len = timeArr.length,
            targetTime = null;

        for(let i = 0;i < len;i++){
            let targetHour = timeArr[i].content.split(':')[0],
                targetMinute = timeArr[i].content.split(':')[1];

            if(targetHour == hour && targetMinute == minute){
                targetTime = timeArr[i];
                break;
            }
        }

        this.setState({
            currSlideWidth : targetTime.width
        });
    }

    //计算传入的时间范围组成对应每一部的距离和时间
    setTimeArr(totalSlideWidth) {
        let step = this.state.start == 0 ? (this.state.end - this.state.start) * 2 : (this.state.end - this.state.start) * 2 + 1,
            stepWidth = totalSlideWidth / (step - 1),//因为第一个时间为0.所以不做计算，所以应该算少一次
            arr = [],
            hour = this.state.start;


        for(let i = 0;i < step;i){
            //第一个时间为0，不做计算
            if(i == 0){
                arr.push({
                    content : `${hour}:00`,
                    width : 0
                });
            }else{
                arr.push({
                    content : `${hour}:00`,
                    width : stepWidth * (i)
                });
            }
            i++;
            if(i < step){
                arr.push({
                    content : `${hour}:30`,
                    width : stepWidth * (i)
                });
                hour++;
                i++;
            }
        }
        return arr;
    }

    render() {
        let {title, rangeType} = this.props;

        return(
            <div className="range-box">
                <i></i>
                <p className="title">{title}</p>
                <section className="range-content" ref="content">
                    <div className="range-content-bg"></div>
                    <div className="range-btn-box" style={{
                        transform: `translateX(${this.state.currSlideWidth}px)`,
                        webkitTransform: `translateX(${this.state.currSlideWidth}px)`
                    }} ref="btnBox">
                        <div className={this.state.btnClass} ref="btn">
                            {this.state.currTime}
                            <Tooltip
                                isShow={this.state.isActive}
                                content={`${this.state.currTime}${rangeType}`}
                            />
                        </div>
                        <div className="range-btn-bg"></div>
                    </div>
                </section>
                <i></i>
            </div>
        );
    }

}