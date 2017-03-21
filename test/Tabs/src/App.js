/**
 * Created by lamho on 2017/3/16.
 */
import React, {Component} from "react";
import './style.scss';
import {Tabs} from "../../../index"

export default class App extends Component{

    constructor(props) {
        super(props)
        this.state = {
            tabIndex : 0
        }
    }


    render(){
        return(
            <div>
                <Tabs
                    defaultIndex={this.props.tabIndex}
                    defaultColor='red'
                    onChange={(index) => {
                    this.setState({
                        tabIndex: index
                    });
                }}>
                    <span name="tab1"></span>
                    <span name="tab2"></span>
                </Tabs>

                <div>
                    {
                        this.state.tabIndex == 0 ?
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet blanditiis consequatur dolorum earum est eveniet expedita fuga fugit id ipsam iusto molestias nemo, omnis provident quo quos veritatis voluptate?</p>
                            :
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dolorem eligendi facere, in magnam nemo obcaecati recusandae sed ullam? Commodi dolore enim facilis, molestias nobis placeat quod reiciendis ut voluptatum!</p>
                    }
                </div>
            </div>
        )
    }

}