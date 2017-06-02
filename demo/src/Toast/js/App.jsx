/**
 * Created by lamho on 2017/3/16.
 */
import React, {Component} from "react";
import './style.scss';
import {Toast} from "zzc-ui"

export default class App extends Component{

    constructor(props) {
        super(props)
        this.state = {
            isShow : false
        }
    }

    show(){
        Toast.info('订单确认之前无法打印提车单<br>请耐心等待订单确认');
    }

    show2(){
        Toast.info('订单确认之前无法打印提车单<br>请耐心等待订单确认',1000);
    }

    render(){
        return(
            <div>
                <button onClick={this.show.bind(this)}>点击我（默认3秒）</button>
                <br/>
                <br/>
                <button onClick={this.show2.bind(this)}>点击我（1秒）</button>
            </div>
        )
    }

}