/**
 * Created by lamho on 2017/3/16.
 */
import React, { Component } from "react";
import './style.scss';
import {Picker} from "zzc-ui";
import formatTime from '../../../tool/format';

export default class App extends Component {

    constructor( props ) {

        let pickup2 = new Date( new Date().setMonth( new Date().getMonth() + 2 ) ),
            return2 = new Date( new Date().setMonth( new Date().getMonth() + 3 ) );

        super( props );
        this.state = {
            showPOP: false,
            returnTime: null,
            pickupTime: null,
            pickupInfo: null,
            returnInfo: null,
            dayCount: null,
            startTime: null,
            endTime: null,

            showPOP2: false,
            returnTime2: return2,
            pickupTime2: pickup2,
            pickupInfo2: formatTime( pickup2 ),
            returnInfo2: formatTime( return2 ),
            dayCount2: ( ( pickupDay, returnDay ) => {
                let returnTime = returnDay.getTime(),
                    pickupTime = pickupDay.getTime(),
                    diff = returnTime - pickupTime;

                return Math.ceil( diff / 1000 / 60 / 60 / 24 );
            } )( pickup2, return2 ),
            endTime2: null
        };
    }

    show() {
        this.setState( {
            showPOP: true
        } );
    }

    hide() {
        this.setState( {
            showPOP: false
        } );
    }

    show2() {
        this.setState( {
            showPOP2: true
        } );
    }

    hide2() {
        this.setState( {
            showPOP2: false
        } );
    }

    componentDidMount() {
        let _this = this;
        setTimeout( () => {
            console.log('更改时间')
            _this.setState({
                pickupTime: new Date( new Date().setMonth( new Date().getMonth() + 2 ) ),
                returnTime: new Date( new Date().setMonth( new Date().getMonth() + 3 ) ),
            });
        },5000);
    }

    confirm( opt ) {
        this.setState( {
            returnTime: opt.returnTime.time?opt.returnTime.time:'',
            pickupTime: opt.pickupTime.time?opt.pickupTime.time:'',
            pickupInfo: opt.pickupTime,
            returnInfo: opt.returnTime,
            dayCount: opt.dayCount,
            showPOP: false
        } );
    }

    confirm2( opt ) {
        this.setState( {
            returnTime2: opt.returnTime.time,
            pickupTime2: opt.pickupTime.time,
            pickupInfo2: opt.pickupTime,
            returnInfo2: opt.returnTime,
            dayCount2: opt.dayCount,
            showPOP2: false
        } );
    }

    render() {
        return (
            <div>
                <h3>未选择时间</h3>
                <Picker
                    title={'自定义标题'}
                    pickupPlaceholder={'自定义取车文案'}
                    returnPlaceholder={'自定义取车文案'}
                    isClickGoneDate={true}
                    hideController={true}
                    visibility={this.state.showPOP}
                    pickupTime={this.state.pickupTime}
                    returnTime={this.state.returnTime}
                    startTime={this.state.startTime}
                    endTime={this.state.endTime}
                    timeRange={{
                        start: 10,
                        end: 22
                    }}
                    defaultTime={{
                        h: 18,
                        m: 30
                    }}
                    confirmEvent={( opt ) => {
                        this.confirm( opt );
                    }}
                    closeEvent={() => {
                        this.hide();
                    }}
                    onChangeDate={(opt) => {
                        console.log(opt)
                    }}
                >
                    <p onClick={this.show.bind( this )}>打开时间框</p>
                </Picker>

                <div>
                    <p>取车时间：{this.state.pickupInfo ?
                        `${this.state.pickupInfo.year}年${this.state.pickupInfo.month}月${this.state.pickupInfo.day}日`
                        : '请选择'}
                    </p>
                    <p>取车时间：{this.state.returnInfo ?
                        `${this.state.returnInfo.year}年${this.state.returnInfo.month}月${this.state.returnInfo.day}日`
                        : '请选择'}
                    </p>
                    <p>共：{this.state.dayCount}</p>
                </div>

                <hr />
                <br />
                <br />
                <h3>已选择时间</h3>
                <Picker
                    visibility={this.state.showPOP2}
                    pickupTime={this.state.pickupTime2}
                    returnTime={this.state.returnTime2}
                    startTime={this.state.startTime2}
                    endTime={this.state.endTime2}
                    confirmEvent={( opt ) => {
                        this.confirm2( opt );
                    }}
                    closeEvent={() => {
                        this.hide2();
                    }}
                >
                    <p onClick={this.show2.bind( this )}>打开时间框</p>
                </Picker>

                <div>
                    <p>取车时间：{this.state.pickupInfo2 ?
                        `${this.state.pickupInfo2.year}年${this.state.pickupInfo2.month}月${this.state.pickupInfo2.day}日-${this.state.pickupInfo2.hours}:${this.state.pickupInfo2.minutes}`
                        : '请选择'}
                    </p>
                    <p>取车时间：{this.state.returnInfo2 ?
                        `${this.state.returnInfo2.year}年${this.state.returnInfo2.month}月${this.state.returnInfo2.day}日-${this.state.returnInfo2.hours}:${this.state.returnInfo2.minutes}`
                        : '请选择'}
                    </p>
                    <p>共：{this.state.dayCount2}</p>
                </div>
            </div>
        );
    }

}

