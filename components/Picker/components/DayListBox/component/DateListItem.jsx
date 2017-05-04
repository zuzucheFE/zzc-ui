import React, {Component} from 'react';

let rowNo = 1;

export default class DateListItem extends Component{

    constructor(props){
        super(props);
    }

    componentWillUnmount() {
        if(rowNo != 1){
            rowNo = 1;
        }
    }

    shouldComponentUpdate() {
        return false;
    }

    setUlClass(currRow) {
        let isActive = false,
            isStart = false,
            isEnd = false,
            startNo = null,
            endNo = null;

        for(let i = 7;i;i--){
            if(currRow[i-1].isActive){
                isActive = true;
            }
            if(currRow[i-1].isStart){
                isActive = true;
                isStart = true;
                startNo = i;
            }
            if(currRow[i-1].isEnd){
                isActive = true;
                isEnd = true;
                endNo = i;
            }
        }

        if(!isActive){
            return '';
        }

        //取还车同一行并且不是同一天取还车
        if(isStart && isEnd && startNo != endNo){
            let diff = endNo - startNo - 1,
                className = '',
                currNo = startNo + 1;
            for(let k = 0;k < diff;k++){
                className += ` row-${currNo}`;
                currNo++;
            }
            return className;
        }

        //取还车同一天
        if (isStart && isEnd && startNo == endNo) {
            return '';
        }

        //取车日期的行
        if(isStart && isActive){
            return `s-row-${7 - startNo}`;
        }

        //还车日期的行
        if(isEnd && isActive){
            return `e-row-${endNo - 1}`;
        }

        //整行active
        if(isActive){
            return 'full';
        }

    }

    setLiClass(isGone, isBefore, isStart, isEnd, isActive) {
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

        //如果是当天去还车就特殊处理重定className的值
        if(isStart && isEnd){
            className = 'start end';
        }

        return className;
    }

    //设置li所有的属性
    setLiAttribute(data, currData, colume) {
        return (
            <li id={currData.date != '' ? `t-${data.year}-${data.month}-${currData.date}` : ''}
                className={this.setLiClass(currData.isGone, currData.isBefore, currData.isStart, currData.isEnd, currData.isActive)}
                data-colume={colume}
            >
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
            return (<i id="start-end-tips">取还车</i>);
        }else if(isStart){
            return (<i id="start-tips">取车</i>);
        }else if(isEnd){
            return (<i id="end-tips">还车</i>);
        }
    }

    createDateItemList(data) {
        let list = data.dayList,
            row = list.length / 7,
            itemListJSXElement = [];

        for(let i = 0;i < row;i++){
            let currRow = list.splice(0,7),
                currRowJSXElement = (
                    <ul data-row={rowNo} className={this.setUlClass(currRow)}>
                        {this.setLiAttribute(data,currRow[0],1)}
                        {this.setLiAttribute(data,currRow[1],2)}
                        {this.setLiAttribute(data,currRow[2],3)}
                        {this.setLiAttribute(data,currRow[3],4)}
                        {this.setLiAttribute(data,currRow[4],5)}
                        {this.setLiAttribute(data,currRow[5],6)}
                        {this.setLiAttribute(data,currRow[6],7)}
                    </ul>
                );
            itemListJSXElement.push(currRowJSXElement);
            rowNo++;
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