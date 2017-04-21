/**
 * Created by lamho on 2017/3/16.
 */
import React, {Component} from "react";
import './style.scss';
import {Picker} from "../../../../index.js";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPOP: false,
            returnTime: null,
            pickupTime: null,
            pickupInfo: null,
            returnInfo: null,
            dayCount: null
        };
    }

    show() {
        this.setState({
            showPOP: true
        });
    }

    hide() {
        this.setState({
            showPOP: false
        });
    }

    confirm(opt) {
        console.log(opt);
        this.setState({
            returnTime: opt.returnTime.time,
            pickupTime: opt.pickupTime.time,
            pickupInfo: opt.pickupTime,
            returnInfo: opt.returnTime,
            dayCount: opt.dayCount,
        });
    }

    render() {
        return (
            <div>
                <Picker
                    visibility={this.state.showPOP}
                    pickupTime={this.state.pickupTime}
                    returnTime={this.state.returnTime}
                    confirmEvent={(opt) => {
                        this.confirm(opt);
                    }}
                    closeEvent={() => {
                        this.hide();
                    }}
                >
                    <p onClick={this.show.bind(this)}>打开时间框</p>
                </Picker>

                <div>
                    <p>取车时间：{this.state.pickupInfo ?
                        `${this.state.pickupInfo.year}年${this.state.pickupInfo.month}月${this.state.pickupInfo.day}日-${this.state.pickupInfo.hours}:${this.state.pickupInfo.minutes}`
                        : '请选择'}
                    </p>
                    <p>取车时间：{this.state.returnInfo ?
                        `${this.state.returnInfo.year}年${this.state.returnInfo.month}月${this.state.returnInfo.day}日-${this.state.returnInfo.hours}:${this.state.returnInfo.minutes}`
                        : '请选择'}
                    </p>
                    <p>共：{this.state.dayCount}</p>
                </div>
            </div>
        );
    }

}