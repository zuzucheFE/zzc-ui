/**
 * Created by lamho on 2017/3/16.
 */
import React, {Component} from "react";
import './style.scss';
import {Popup} from "../../../index"

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPOP: false,
            child: <p>这是一个个弹窗</p>
        }
    }

    show() {
        Popup.show(this.state.child,{
            direction : 'bottom',
            title: '这是一个title',
            style: {
                height: '5rem'
            },
            confirm: () => {console.log('点击确认')},
            cancel: () => {console.log('点击取消')},
            afterConfirm: () => {return false}
        });
    }

    hide() {
        Popup.hide();
    }

    render() {
        return (
            <div>
                <ul>
                    <li onClick={this.show.bind(this)}>向上弹起</li>
                    <li onClick={this.hide.bind(this)}>关闭</li>
                </ul>
            </div>
        )
    }

}