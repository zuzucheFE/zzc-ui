/**
 * Created by lamho on 2017/3/16.
 */
import React, {Component} from "react";
import './style.scss';
import {Modal} from "../../../index"

export default class App extends Component{

    constructor(props) {
        super(props)
        this.state = {
            modalContent : <div className="modal-box">
                <h1 className="title">title</h1>
                <div className="content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam consequatur dignissimos eligendi labore nulla provident quod similique sint ut! Architecto aut dignissimos nihil nostrum officia quae, quisquam saepe tenetur.</p>
                </div>
            </div>,
            visible: false
        }
    }

    showModal() {
        this.setState({
            visible: true
        })
    }

    hideModal() {
        this.setState({
            visible: false
        })
    }

    render(){
        return(
            <div>
                <button onClick={this.showModal.bind(this)}>点击我</button>
                <hr/>
                <br/>

                <Modal ref="modal"
                       visible={this.state.visible}
                       onCancel={() => this.hideModal()}
                       content={this.state.modalContent}/>
            </div>
        )
    }

}