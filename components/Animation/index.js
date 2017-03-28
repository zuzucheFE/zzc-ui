/**
 * Created by lamho on 2017/3/27.
 */
import React, {Component} from 'react';
import './style.scss';

export default class Anima extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className={`${this.props.type} zzc-animation`}>
                {
                    this.props.children
                }
            </div>
        )
    }

}