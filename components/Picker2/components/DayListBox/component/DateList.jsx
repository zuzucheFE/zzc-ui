/**
 * Created by lamho on 2017/3/30.
 */
import React, { Component } from 'react';
import Item from './DateListItem.jsx';

export default class DateList extends Component {
    constructor( props ) {
        super( props );
    }

    //只有取还车日期不一样时才会去执行组件的计算
    shouldComponentUpdate( nextProps, nextState ) {

        let newY = nextProps.pickupDay ? nextProps.pickupDay.getFullYear() : null,
            newM = nextProps.pickupDay ? nextProps.pickupDay.getMonth() : null,
            newD = nextProps.pickupDay ? nextProps.pickupDay.getDate() : null,
            oldY = this.props.pickupDay ? this.props.pickupDay.getFullYear() : null,
            oldM = this.props.pickupDay ? this.props.pickupDay.getMonth() : null,
            oldD = this.props.pickupDay ? this.props.pickupDay.getDate() : null;

        if ( newY != oldY || newM != oldM || newD != oldD ) {
            return true;
        }

        newY = nextProps.returnDay ? nextProps.returnDay.getFullYear() : null;
        newM = nextProps.returnDay ? nextProps.returnDay.getMonth() : null;
        newD = nextProps.returnDay ? nextProps.returnDay.getDate() : null;
        oldY = this.props.returnDay ? this.props.returnDay.getFullYear() : null;
        oldM = this.props.returnDay ? this.props.returnDay.getMonth() : null;
        oldD = this.props.returnDay ? this.props.returnDay.getDate() : null;

        if ( newY != oldY || newM != oldM || newD != oldD ) {
            return true;
        }

        return false;
    }

    clickDay( year, month, date ) {
        this.props.selectDay( new Date( year, month - 1, date ) );
    }

    componentDidMount() {
        let startElem = document.querySelector( '.day-list-box .start' );
        if ( startElem ) {
            let startOffsetTop = startElem.offsetTop;
            setTimeout(() => {
                document.querySelector( '.day-list-box' ).scrollTop = ( startOffsetTop - this.props.topHeight );
            }, 100 );
        }
    }

    componentDidUpdate() {
        let { startTime, endTime, pickupDay, returnDay, dayList } = this.props;
    }



    render() {
        let { dayList } = this.props;
        return (
            <div>
                {
                    dayList.map(( e, i ) => {
                        return <Item data={e} key={`date-${i}`} clickDay={this.clickDay.bind(this)} />;
                    } )
                }
            </div>
        );

    }
}