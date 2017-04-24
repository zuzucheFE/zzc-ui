import React, {Component} from 'react';

export default class DateListItem extends Component{

    constructor(props){
        super(props);
    }

    setClass(isGone, isBefore, isStart, isEnd, isActive) {
        let className = '';

        if(isGone){
            className += ' gone ';
        }

        if(isStart){
            className += isBefore ? ' start before ' : ' start ';
        }

        if(isEnd){
            className += isBefore ? ' end before ' : ' end ';
        }

        if(isActive){
            className += 'active';
        }

        //如果是当天去还车就特殊处理重定className的值
        if(isStart && isEnd){
            className = 'start end';
        }

        return className;
    }

    //设置li所有的属性
    setLiAttribute(data, currData) {
        return (
            <li className={this.setClass(currData.isGone, currData.isBefore, currData.isStart, currData.isEnd, currData.isActive)}>
                <span data-gone={currData.isGone ? '1' : '0'}
                      data-year={data.year}
                      data-month={data.month}
                      data-date={currData.date}
                >
                    {currData.content}
                    {this.setTips(currData.isStart, currData.isEnd)}
                </span>
            </li>
        );
    }

    //设置取还车tips
    setTips(isStart,isEnd) {
        if(isStart && isEnd){
            return (<i>取还车</i>);
        }else if(isStart){
            return (<i>取车</i>);
        }else if(isEnd){
            return (<i>还车</i>);
        }
    }

    createDateItemList(data) {
        let list = data.dayList,
            row = list.length / 7,
            itemListJSXElement = [];
        for(let i = 0;i < row;i++){
            let currRow = list.splice(0,7),
                currRowJSXElement = (
                    <ul>
                        {this.setLiAttribute(data,currRow[0])}
                        {this.setLiAttribute(data,currRow[1])}
                        {this.setLiAttribute(data,currRow[2])}
                        {this.setLiAttribute(data,currRow[3])}
                        {this.setLiAttribute(data,currRow[4])}
                        {this.setLiAttribute(data,currRow[5])}
                        {this.setLiAttribute(data,currRow[6])}
                    </ul>
                );
            itemListJSXElement.push(currRowJSXElement);
        }

        return itemListJSXElement;
    }

    render() {
        let {data} = this.props;
        return (
            <div className="day-item">
                <div className="day-item-title">
                    <span>{data.year}年</span>
                    <span>{data.month}月</span>
                </div>
                <div className="day-item-content">
                    {
                        this.createDateItemList(data)
                    }
                </div>
            </div>
        );

    }

}