/**
 * Created by lamho on 2017/4/6.
 */
import React, {Component} from 'react';

export default class WeekList extends Component{

    constructor(props){
        super(props);
    }

    //只需要初始化一次
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render() {

        let boxClassName = this.props.class;

        return (
            <div className="week-list">
                <ul>
                    <li>日</li>
                    <li>一</li>
                    <li>二</li>
                    <li>三</li>
                    <li>四</li>
                    <li>五</li>
                    <li>六</li>
                </ul>
            </div>
        );
    }

}