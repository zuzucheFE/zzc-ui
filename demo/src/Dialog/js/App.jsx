/**
 * Created by lamho on 2017/3/16.
 */
import React, {Component} from "react";
import './style.scss';
import {Dialog} from "zzc-ui";

export default class App extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <h3>普通的Dialog</h3>
                <Dialog
                    title='hello world'
                    close={() => {
                        console.log('取消');
                    }}
                    confirm={() => {
                        console.log('确定');
                    }}
                >
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at consequatur cumque dolorum enim iste magnam suscipit vero! Ad aperiam consectetur, debitis deserunt doloremque neque porro quidem repellendus rerum sit.</p>
                </Dialog>
                <br/>
                <hr/>

                <h3>没有title的Dialog</h3>
                <Dialog
                    close={() => {
                        console.log('取消');
                    }}
                    confirm={() => {
                        console.log('确定');
                    }}
                >
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at consequatur cumque dolorum enim iste magnam suscipit vero! Ad aperiam consectetur, debitis deserunt doloremque neque porro quidem repellendus rerum sit.</p>
                </Dialog>
                <br/>
                <hr/>

                <h3>自定义按钮</h3>
                <Dialog
                    title='hello world'
                    defaultTitleBtn={{
                        left: {
                            name: <i className="iconfont-goback"></i>,
                            isShow: true
                        },
                        right: {
                            name: '自定义1',
                            isShow: true
                        },
                    }}
                    close={() => {
                        console.log('取消');
                    }}
                    confirm={() => {
                        console.log('确定');
                    }}
                >
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at consequatur cumque dolorum enim iste magnam suscipit vero! Ad aperiam consectetur, debitis deserunt doloremque neque porro quidem repellendus rerum sit.</p>
                </Dialog>
                <br/>
                <hr/>
                <Dialog
                    title='hello world'
                    defaultTitleBtn={{
                        left: {
                            name: <i className="iconfont-goback"></i>,
                            isShow: true,
                            style: {
                                color:'red'
                            }
                        },
                        right: {
                            isShow: false
                        },
                    }}
                    close={() => {
                        console.log('取消');
                    }}
                    confirm={() => {
                        console.log('确定');
                    }}
                >
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at consequatur cumque dolorum enim iste magnam suscipit vero! Ad aperiam consectetur, debitis deserunt doloremque neque porro quidem repellendus rerum sit.</p>
                </Dialog>
            </div>
        );
    }

}