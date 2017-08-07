import React, {Component} from 'react';
import './style.scss';

export default class Tooltip extends Component{

    constructor(props) {
        super(props);
    }

    render(){

        let {content,isShow} = this.props;

        return (
            <div className={`tooltip-container ${isShow ? 'show' : 'hide'}`}>
                <p className="tooltip-box">
                    {content}
                </p>
            </div>
        );

    }

}