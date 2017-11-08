/**
 * Created by lamho on 2017/3/16.
 */
import React, { Component } from "react";
import './style.scss';
import { Modal } from "zzc-ui";

export default class App extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            modalContent: <div className="modal-box">
                <h1 className="title">title</h1>
                <div className="content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam consequatur dignissimos eligendi labore nulla provident quod similique sint ut! Architecto aut dignissimos nihil nostrum officia quae, quisquam saepe tenetur.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam consequatur dignissimos eligendi labore nulla provident quod similique sint ut! Architecto aut dignissimos nihil nostrum officia quae, quisquam saepe tenetur.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam consequatur dignissimos eligendi labore nulla provident quod similique sint ut! Architecto aut dignissimos nihil nostrum officia quae, quisquam saepe tenetur.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam consequatur dignissimos eligendi labore nulla provident quod similique sint ut! Architecto aut dignissimos nihil nostrum officia quae, quisquam saepe tenetur.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam consequatur dignissimos eligendi labore nulla provident quod similique sint ut! Architecto aut dignissimos nihil nostrum officia quae, quisquam saepe tenetur.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam consequatur dignissimos eligendi labore nulla provident quod similique sint ut! Architecto aut dignissimos nihil nostrum officia quae, quisquam saepe tenetur.</p>
                </div>
            </div>,
            visible: false
        }
    }

    showModal() {
        this.setState( {
            visible: true
        } )
    }

    showModal2() {
        this.setState( {
            visible2: true
        } )
    }

    hideModal() {
        this.setState( {
            visible: false
        } )
    }

    hideModal2() {
        this.setState( {
            visible2: false
        } )
    }

    render() {
        return (
            <div>
                <button onClick={this.showModal.bind( this )}>点击我</button>
                <button onClick={this.showModal2.bind( this )}>点击我(自定义按钮)</button>

                <Modal ref="modal"
                    visible={this.state.visible}
                    onCancel={() => this.hideModal()}
                    content={this.state.modalContent} />

                <Modal ref="modal2"
                    visible={this.state.visible2}
                    onCancel={() => this.hideModal2()}
                    content={this.state.modalContent}
                    btn={[
                        {
                            btnText: '关闭',
                            click: () => { },
                            style: {}
                        },
                        {
                            btnText: '立即使用',
                            click: () => { console.log(123123)},
                            style: {
                                color:'#333'
                            }
                        }
                    ]}
                />
            </div>
        )
    }

}