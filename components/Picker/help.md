Picker组件
===================

调用方式：

```JavaScript

import {Picker} from "zzc-ui";

<Picker
    visibility={this.state.showPOP}
    pickupTime={this.state.pickupTime}
    returnTime={this.state.returnTime}
    startTime={this.state.startTime}
    endTime={this.state.endTime}
    confirmEvent={(opt) => {
        this.confirm(opt);
    }}
    closeEvent={() => {
        this.hide();
    }}
>
    <p onClick={this.show.bind(this)}>打开时间框</p>
</Picker>

```

使用的方式是通过Picker包含需要点击的元素，例如你点击的元素是一个p，点击是就会触发Picker初始化。


Picker是一个大型的组件，对于性能的消耗也是比较大，所以每次收起Picker的时候会从DOM树中移除。

Picker提供了大量的属性给开发者配置。

控制显示
1. visibility ----> 控制是否显示时间框(必须传)

事件
1. closeEvent ----> 传入时间框的关闭事件(必须传)
2. confirmEvent ----> 传入时间框的确认事件(必须传)

confirmEvent传入的函数，会返回一个object，里面包含所选择的时间数据。

```JavaScript

    confirm(opt) {
        this.setState({
            returnTime: opt.returnTime.time,
            pickupTime: opt.pickupTime.time,
            pickupInfo: opt.pickupTime,
            returnInfo: opt.returnTime,
            dayCount: opt.dayCount,
        });
    }

```

日期参数
1. startTime  ----> 日历初始化开始时间(格式：[2017,1,1],默认今天的月份的1号)
2. endTime  ----> 日历初始化结束时间(格式：[2018,1,1]，默认拿starTime一年后)
3. pickupTime ---->  选中的取车日期(默认为null)
4. returnTime ---->  选中的还车日期(默认为null)

时间参数
1. defaultTime ----> 时间滑动框的默认时间。
<br>里面有两个
<br>defaultTime.h ----> 小时  默认为 10
<br>defaultTime.m ----> 分钟  默认为 00  格式为 0 或者 30

2. timeRange ----> 时间滑动的范围。
<br>里面有两个参数
<br>timeRange.start ----> 开始  默认为 0
<br>timeRange.end ----> 结束  默认为 24


具体的使用方式：

index.js
```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
```

app.js
```JavaScript
import React, {Component} from "react";
import './style.scss';
import {Picker} from "zzc-ui";

export default class App extends Component {

    constructor(props) {

        let pickup2 = new Date(new Date().setMonth(new Date().getMonth() + 1)),
            return2 = new Date(new Date().setMonth(new Date().getMonth() + 2));

        super(props);
        this.state = {
            showPOP: false,
            returnTime: null,
            pickupTime: null,
            pickupInfo: null,
            returnInfo: null,
            dayCount: null,
            startTime: null,
            endTime: null,
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
        this.setState({
            returnTime: opt.returnTime.time,
            pickupTime: opt.pickupTime.time,
            pickupInfo: opt.pickupTime,
            returnInfo: opt.returnTime,
            dayCount: opt.dayCount,
            showPOP: false
        });
    }

    render() {
        return (
            <div>
                <h3>未选择时间</h3>
                <Picker
                    visibility={this.state.showPOP}
                    pickupTime={this.state.pickupTime}
                    returnTime={this.state.returnTime}
                    startTime={this.state.startTime}
                    endTime={this.state.endTime}
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

```
