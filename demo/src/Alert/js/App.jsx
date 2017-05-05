/**
 * Created by lamho on 2017/3/16.
 */
import React, {Component} from "react";
import './style.scss';
import {Alert} from "zzc-ui";

export default class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            alert : null
        };
    }

    open() {
        let alert = Alert('','确认删除吗?',[
            { text: '取消', onPress: () => console.log('cancel')},
            { text: '删除', onPress: () => console.log('ok'),style: {'color':'#108ee9','fontWeight':'bold'}},
        ]);
        this.state.alert = alert;
        setTimeout(() => {
            alert.close(() => {
                window.alert('alert关闭完毕');
            });
        },2000);
    }


    render(){

        return(
            <div>
                <button onClick={() => {Alert('','确认删除吗?',[
                    { text: '取消', onPress: () => console.log('cancel')},
                    { text: '删除', onPress: () => console.log('ok'),style: {'color':'#108ee9','fontWeight':'bold'}},
                ])}}>没有头部的Alert</button>
                <br/>
                <button onClick={() => {Alert('删除','确认删除吗?',[
                    { text: '取消', onPress: () => console.log('cancel')},
                    { text: '删除', onPress: () => console.log('ok'),style: {'color':'#108ee9','fontWeight':'bold'}},
                ])}}>带头部的Alert</button>

                <br/>
                <br/>
                <br/>
                <p>js触发关闭</p>
                <button onClick={() => {this.open()}}>打开alert</button>
            </div>
        );
    }

}