/**
 * Created by lamho on 2017/3/16.
 */
import React, {Component} from "react";
import './style.scss';
import {Loading} from "zzc-ui";

export default class App extends Component{

    constructor(props) {
        super(props)
        this.state = {
            isShow : false
        }
    }

    show(){
        this.setState({
            isShow : true
        })
    }

    render(){
        return(
            <div>
                <button onClick={this.show.bind(this)}>点击我</button>
                <Loading isShow={this.state.isShow} text="信息加载中，请稍候..."/>
            </div>
        )
    }

}