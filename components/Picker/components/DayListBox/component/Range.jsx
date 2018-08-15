/**
 * Created by lamho on 2017/4/12.
 */
import React, { Component } from 'react';
import Tooltip from '../../Tooltip/index.jsx';

function isMobile() {
    var sUserAgent = navigator.userAgent.toLowerCase(),
        bIsIpad = sUserAgent.match( /ipad/i ) == "ipad",
        bIsIphoneOs = sUserAgent.match( /iphone os/i ) == "iphone os",
        bIsMidp = sUserAgent.match( /midp/i ) == "midp",
        bIsUc7 = sUserAgent.match( /rv:1.2.3.4/i ) == "rv:1.2.3.4",
        bIsUc = sUserAgent.match( /ucweb/i ) == "ucweb",
        bIsAndroid = sUserAgent.match( /android/i ) == "android",
        bIsCE = sUserAgent.match( /windows ce/i ) == "windows ce",
        bIsWM = sUserAgent.match( /windows mobile/i ) == "windows mobile",
        bIsWebview = sUserAgent.match( /webview/i ) == "webview";
    return ( bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM );
}

export default class Range extends Component {

    constructor( props ) {
        super( props );

        this.state = {
            maxSlideWidth: null,//最大滑动距离
            timeArr: [],//时间数组
            // start: props.rangeStart,//开始范围
            // end: props.rangeEnd,//结束范围
            currTime: `${props.time.h}:${props.time.m}`,//当前时间
            currSlideWidth: '',//当前滑动到的时间
            startX: 0,//上一次滚动的位置
            btnClass: 'range-btn',//控制btn的样式
            isActive: false,
            touchStartEvent: null,
            touchMoveEvent: null,
            touchEndEvent: null
        };
    }

    shouldComponentUpdate( nextProps, nextState ) {

        if ( nextState.currSlideWidth != this.state.currSlideWidth ) {
            return true;
        }
        if ( nextState.currTime != this.state.currTime ) {
            return true;
        }
        if ( nextState.startX != this.state.startX ) {
            return true;
        }
        if ( nextState.btnClass != this.state.btnClass ) {
            return true;
        }
        if ( nextState.isActive != this.state.isActive ) {
            return true;
        }
        if ( nextProps.start != this.props.start || nextProps.end != this.props.end ) {
            return true;
        }
        return false;
    }

    componentDidMount() {
        this.btnWidth = parseFloat( window.getComputedStyle( this.refs.btn ).width );
        this.rangeContentWidth = parseFloat( window.getComputedStyle( this.refs.content ).width );

        this.setState( {
            timeArr: this.setTimeArr( ( this.rangeContentWidth - this.btnWidth ) ),
            maxSlideWidth: ( this.rangeContentWidth - this.btnWidth ),
            touchStartEvent: this.touchStart.bind( this ),
            touchMoveEvent: this.touchMove.bind( this ),
            touchEndEvent: this.touchEnd.bind( this ),
            mouseDownEvent: this.mouseDown.bind( this ),
            mouseMoveEvent: this.mouseMove.bind( this ),
            mouseUpEvent: this.mouseUp.bind( this )
        }, () => {
            this.setDefaultTime();

            if ( isMobile() ) {
                this.refs.btn.addEventListener( 'touchstart', this.state.touchStartEvent );

                this.refs.btn.addEventListener( 'touchmove', this.state.touchMoveEvent );

                this.refs.btn.addEventListener( 'touchend', this.state.touchEndEvent );
            } else {
                this.refs.btn.addEventListener( 'mousedown', this.state.mouseDownEvent );
                this.refs.btn.addEventListener( 'mouseup', this.state.mouseUpEvent );
            }

        } );
    }

    componentWillReceiveProps( nextProps ) {
        this.setState( {
            timeArr: this.setTimeArr( ( this.rangeContentWidth - this.btnWidth ), nextProps ),
            maxSlideWidth: ( this.rangeContentWidth - this.btnWidth )
        }, () => {
            this.setDefaultTime();
        } );
    }

    componentWillUnmount() {
        if ( isMobile() ) {
            this.refs.btn.removeEventListener( 'touchstart', this.state.touchStartEvent );

            this.refs.btn.removeEventListener( 'touchmove', this.state.touchMoveEvent );

            this.refs.btn.removeEventListener( 'touchend', this.state.touchEndEvent );
        } else {
            this.refs.btn.removeEventListener( 'mousedown', this.state.mouseDownEvent );
            this.refs.btn.removeEventListener( 'mouseup', this.state.mouseUpEvent );
        }
    }

    touchStart( event ) {

        event.preventDefault();

        //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
        if ( this.props.synchronizationReturnTimeStart && this.props.isSynchronization ) {
            this.props.synchronizationReturnTimeStart( {
                startX: event.targetTouches[0].pageX,
                btnClass: 'range-btn active',
                isActive: true
            } );
        }

        this.setState( {
            startX: event.targetTouches[0].pageX,
            btnClass: 'range-btn active',
            isActive: true
        } );
    }

    mouseDown( event ) {
        event.preventDefault();
        //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
        if ( this.props.synchronizationReturnTimeStart && this.props.isSynchronization ) {
            this.props.synchronizationReturnTimeStart( {
                startX: event.pageX,
                btnClass: 'range-btn active',
                isActive: true
            } );
        }

        this.setState( {
            startX: event.pageX,
            btnClass: 'range-btn active',
            isActive: true
        } );

        this.refs.btn.addEventListener( 'mousemove', this.state.mouseMoveEvent );

    }

    touchMove( event ) {

        event.preventDefault();

        let currX = event.changedTouches[0].clientX - this.state.startX,
            currBtnTransform = parseFloat( this.refs.btnBox.style.WebkitTransform.split( '(' )[1].split( ')' )[0] ),
            nextX = currBtnTransform + currX;

        //当注定更改还车时间选择的时候，将不再同步
        if ( this.props.isSynchronization && this.props.type == 'return' ) {
            this.props.changeSynchronization( false );
        }

        if ( nextX <= 0 ) {
            //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
            if ( this.props.synchronizationReturnTimeMove && this.props.isSynchronization ) {
                this.props.synchronizationReturnTimeMove( {
                    currSlideWidth: 0,
                    currTime: this.state.timeArr[0].content
                }, null );
            }
            this.setState( {
                currSlideWidth: 0,
                currTime: this.state.timeArr[0].content
            } );
            return false;
        }

        if ( nextX > this.state.maxSlideWidth ) {
            //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
            if ( this.props.synchronizationReturnTimeMove && this.props.isSynchronization ) {
                this.props.synchronizationReturnTimeMove( {
                    currTime: this.state.timeArr[this.state.timeArr.length - 1].content,
                    currSlideWidth: this.state.maxSlideWidth
                }, null );
            }
            this.setState( {
                currTime: this.state.timeArr[this.state.timeArr.length - 1].content,
                currSlideWidth: this.state.maxSlideWidth
            } );
            return false;
        }

        this.getCurrTime( nextX );

        //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
        if ( this.props.synchronizationReturnTimeMove && this.props.isSynchronization ) {
            this.props.synchronizationReturnTimeMove( {
                startX: event.changedTouches[0].clientX,
                currSlideWidth: nextX
            }, nextX );
        }
        this.setState( {
            startX: event.changedTouches[0].clientX,
            currSlideWidth: nextX
        } );

    }

    mouseMove( event ) {

        event.preventDefault();

        let currX = event.pageX - this.state.startX,
            currBtnTransform = parseFloat( this.refs.btnBox.style.WebkitTransform.split( '(' )[1].split( ')' )[0] ),
            nextX = currBtnTransform + currX;

        //当注定更改还车时间选择的时候，将不再同步
        if ( this.props.isSynchronization && this.props.type == 'return' ) {
            this.props.changeSynchronization( false );
        }

        if ( nextX <= 0 ) {
            //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
            if ( this.props.synchronizationReturnTimeMove && this.props.isSynchronization ) {
                this.props.synchronizationReturnTimeMove( {
                    currSlideWidth: 0,
                    currTime: this.state.timeArr[0].content
                }, null );
            }
            this.setState( {
                currSlideWidth: 0,
                currTime: this.state.timeArr[0].content
            } );
            return false;
        }

        if ( nextX > this.state.maxSlideWidth ) {
            //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
            if ( this.props.synchronizationReturnTimeMove && this.props.isSynchronization ) {
                this.props.synchronizationReturnTimeMove( {
                    currTime: this.state.timeArr[this.state.timeArr.length - 1].content,
                    currSlideWidth: this.state.maxSlideWidth
                }, null );
            }
            this.setState( {
                currTime: this.state.timeArr[this.state.timeArr.length - 1].content,
                currSlideWidth: this.state.maxSlideWidth
            } );
            return false;
        }

        this.getCurrTime( nextX );

        //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
        if ( this.props.synchronizationReturnTimeMove && this.props.isSynchronization ) {
            this.props.synchronizationReturnTimeMove( {
                startX: event.pageX,
                currSlideWidth: nextX
            }, nextX );
        }
        this.setState( {
            startX: event.pageX,
            currSlideWidth: nextX
        } );

    }

    touchEnd( event ) {
        event.preventDefault();

        //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
        if ( this.props.synchronizationReturnTimeEnd && this.props.isSynchronization ) {
            this.props.synchronizationReturnTimeEnd( {
                btnClass: 'range-btn',
                isActive: false
            } );
        }

        this.setState( {
            btnClass: 'range-btn',
            isActive: false
        }, () => {
            this.props.selectTime( this.state.currTime, this.props.type );
        } );

    }

    mouseUp( event ) {
        event.preventDefault();
        this.refs.btn.removeEventListener( 'mousemove', this.state.mouseMoveEvent );

        //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
        if ( this.props.synchronizationReturnTimeEnd && this.props.isSynchronization ) {
            this.props.synchronizationReturnTimeEnd( {
                btnClass: 'range-btn',
                isActive: false
            } );
        }

        this.setState( {
            btnClass: 'range-btn',
            isActive: false
        }, () => {
            this.props.selectTime( this.state.currTime, this.props.type );
        } );
    }

    //被同步的响应函数
    synchronizationReturnTimeStart( startData ) {
        if ( this.props.type == 'return' ) {
            this.setState( startData );
        }
    }
    synchronizationReturnTimeMove( moveData, nextX ) {
        if ( this.props.type == 'return' ) {

            if ( nextX ) {
                this.getCurrTime( nextX );
            }
            this.setState( moveData );
        }
    }
    synchronizationReturnTimeEnd( endData ) {
        if ( this.props.type == 'return' ) {
            this.setState( endData, () => {
                this.props.selectTime( this.state.currTime, this.props.type );
            } );
        }
    }

    //滚动时获取对应的时间
    getCurrTime( nextX ) {
        let timeArr = this.state.timeArr,
            currXEstimateIndex = parseInt( nextX / ( this.state.maxSlideWidth / timeArr.length ) );

        if ( !timeArr[currXEstimateIndex] || this.state.currTime == timeArr[currXEstimateIndex].content ) {
            return false;
        } else {
            this.setState( {
                currTime: timeArr[currXEstimateIndex].content
            } );
        }
    }

    //设置默认滑动时间框的位置
    setDefaultTime() {
        let curr = this.state.currTime,
            hour = curr.split( ':' )[0],
            minute = curr.split( ':' )[1],
            timeArr = this.state.timeArr,
            len = timeArr.length,
            targetTime = null;
        for ( let i = 0; i < len; i++ ) {
            let targetHour = timeArr[i].content.split( ':' )[0],
                targetMinute = timeArr[i].content.split( ':' )[1];

            if ( targetHour == hour && targetMinute == minute ) {
                targetTime = timeArr[i];
                break;
            }
        }

        // 如果选择的时间不在timeRange里面 选择最早的时间
        if ( targetTime == null ) {
            targetTime = timeArr[0];
            this.setState( {
                currSlideWidth: targetTime.width,
                currTime: targetTime.content
            } );
            // 同步顶部SelectedTime
            const synchTargetTimeArr = targetTime.content.split( ':' );
            const type = this.props.type == 'pickup' ? 'pickupTime' : 'returnTime';
            this.props.synchTimeData( { h: synchTargetTimeArr[0], m: synchTargetTimeArr[1] }, type );
        } else {
            this.setState( {
                currSlideWidth: targetTime.width
            } );
        }
    }

    getTimeRange( nextProps ) {
        const { timeRange, yesterdayTimeRange, day, isYesterday, pickupDay } = ( nextProps ? nextProps : this.props );
        // 如果没有昨日范围参数，返回默认timeRange
        if ( !yesterdayTimeRange ) { return timeRange };

        // 当选择一个开始日期的时候，day会置为null，此时判断如果取车地点选择的是昨天，使用昨天的范围数据
        if ( !day && pickupDay ) {
            if ( isYesterday( pickupDay.getFullYear(), pickupDay.getMonth() + 1, pickupDay.getDate() ) ) {
                return yesterdayTimeRange;
            }
            return timeRange;
        }

        if ( isYesterday( day.getFullYear(), day.getMonth() + 1, day.getDate() ) ) {
            return yesterdayTimeRange;
        }
        return timeRange;
    }

    //计算传入的时间范围组成对应每一部的距离和时间
    setTimeArr( totalSlideWidth, nextProps ) {
        // 接受更新的props或者本身的props达到更新的效果
        const range = this.getTimeRange( nextProps );
        // 传过来的如果是 {start: '12:30'} 这种形式，采用v2计算方式
        if ( typeof range.start == 'string' && range.start.indexOf( ':' ) ) { return this.setTimeArrV2( range, totalSlideWidth ); }

        let step = range.start == 0 ? ( range.end - range.start ) * 2 : ( range.end - range.start ) * 2 + 1,
            stepWidth = totalSlideWidth / ( step - 1 ),//因为第一个时间为0.所以不做计算，所以应该算少一次
            arr = [],
            hour = range.start;


        for ( let i = 0; i < step; i ) {
            //第一个时间为0，不做计算
            if ( i == 0 ) {
                arr.push( {
                    content: `${hour}:00`,
                    width: 0
                } );
            } else {
                arr.push( {
                    content: `${hour}:00`,
                    width: stepWidth * ( i )
                } );
            }
            i++;
            if ( i < step ) {
                arr.push( {
                    content: `${hour}:30`,
                    width: stepWidth * ( i )
                } );
                hour++;
                i++;
            }
        }
        return arr;
    }

    // v2: 传入的参数形式为电子时钟格式 ‘12:20’
    // 12:20 => 从12:30 开始
    // 12:30 => 从12:30 开始
    // 12:50 => 从13:00 开始
    // 以半小时推前计算
    setTimeArrV2( tRange, totalSlideWidth ) {
        const arr = [];
        const { currentTime } = this.props;
        const timeGap30 = 1800000; // 30分钟
        const countStart = new Date( `${currentTime.y}-${currentTime.month}-${currentTime.d} ${tRange.start}` );
        const countEnd = new Date( `${currentTime.y}-${currentTime.month}-${currentTime.d} ${tRange.end}` );
        const start = {
            h: countStart.getHours(),
            m: countStart.getMinutes()
        }
        const end = {
            h: countEnd.getHours(),
            m: countEnd.getMinutes()
        }

        let step = Math.ceil( ( countEnd - countStart ) / timeGap30 );
        let hour = start.h;
        let count = 0;

        while ( true ) {
            if ( count == 0 ) {
                count++;
                // 首次 12:00 或者 12:30开头
                if ( start.m == 0 || start.m == 30 ) {
                    arr.push( {
                        h: start.h,
                        m: start.m,
                        content: `${start.h}:${start.m == 0 ? '00' : '30'}`,
                        width: 0
                    } )
                    if ( start.m == 30 ) {
                        hour++;
                    }
                } else if ( start.m > 30 ) {
                    // 12:45 -> 13:00
                    arr.push( {
                        h: start.h,
                        m: 0,
                        content: `${start.h + 1}:00`,
                        width: 0
                    } )
                    step--; // 此种情况 step 要减一
                    hour++;
                } else {
                    // 12:20 -> 12:30
                    arr.push( {
                        h: start.h,
                        m: 30,
                        content: `${start.h}:30`,
                        width: 0
                    } )
                    step--; // 此种情况 step 要减一
                }
            } else {
                const prevTime = arr[count - 1];
                count++;

                if ( prevTime.m == 30 ) {
                    hour++;
                }
                arr.push( {
                    h: hour,
                    m: prevTime.m == 0 ? 30 : 0,
                    content: `${hour}:${prevTime.m == 0 ? '30' : '00'}`,
                    width: ( totalSlideWidth / step ) * ( count - 1 )
                } )

                const lastTime = arr[count - 1];
                if ( lastTime.h == end.h && end.m == 0 ) {
                    // 15:00
                    break;
                } else if ( lastTime.h == end.h && end.m <= 30 && lastTime.m == 30 ) {
                    // 15:25 -> 15:30 / 15:30
                    break;
                } else if ( lastTime.h > end.h && end.m > 30 ) {
                    // 15:45 -> 16:00
                    break;
                }
            }
        }
        return arr;
    }

    render() {
        let { title, rangeType } = this.props;

        return (
            <div className="range-box">
                <i></i>
                <p className="title">{title}</p>
                <section className="range-content" ref="content">
                    <div className="range-content-bg"></div>
                    <div className="range-btn-box" style={{
                        transform: `translateX( ${this.state.currSlideWidth}px )`,
                        WebkitTransform: `translateX( ${this.state.currSlideWidth}px )`
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