/**
 * Created by lamho on 2017/3/30.
 */
import React, {Component} from 'react';
import setDayArray from '../../../../../tool/setDayList';
import Item from './DateListItem.jsx';

export default class DateList extends Component {
    constructor(props) {
        super(props);
    }

    //只有取还车日期不一样时才会去执行组件的计算
    shouldComponentUpdate(nextProps, nextState) {

        let newPickupY = nextProps.pickupDay ? nextProps.pickupDay.getFullYear() : null,
            newPickupM = nextProps.pickupDay ? nextProps.pickupDay.getMonth() : null,
            newPickupD = nextProps.pickupDay ? nextProps.pickupDay.getDate() : null,
            oldPickupY = this.props.pickupDay ? this.props.pickupDay.getFullYear() : null,
            oldPickupM = this.props.pickupDay ? this.props.pickupDay.getMonth() : null,
            oldPickupD = this.props.pickupDay ? this.props.pickupDay.getDate() : null;

        if(newPickupY != oldPickupY || newPickupM != oldPickupM || newPickupD != oldPickupD){
            return true;
        }

        let newReturnY = nextProps.returnDay ? nextProps.returnDay.getFullYear() : null,
            newReturnM = nextProps.returnDay ? nextProps.returnDay.getMonth() : null,
            newReturnD = nextProps.returnDay ? nextProps.returnDay.getDate() : null,
            oldReturnY = this.props.returnDay ? this.props.returnDay.getFullYear() : null,
            oldReturnM = this.props.returnDay ? this.props.returnDay.getMonth() : null,
            oldReturnD = this.props.returnDay ? this.props.returnDay.getDate() : null;

        if(newReturnY != oldReturnY || newReturnM != oldReturnM || newReturnD != oldReturnD){
            return true;
        }

        return false;
    }

    clickDay(target) {

        //必须事件源对象是日期的span
        if(target.tagName === 'SPAN' && !!target.getAttribute('data-date') && target.getAttribute('data-date') != ''){

            //已经过期的日期点击无效
            if(target.getAttribute('data-gone') == 1){
                return false;
            }

            let year = target.getAttribute('data-year'),
                month = target.getAttribute('data-month') - 1,
                date = target.getAttribute('data-date');
            this.props.selectDay(new Date(year,month,date));
        }
    }

    componentDidMount() {
        let startElem = document.querySelector('.day-list-box .start');
        if (startElem) {
            let startOffsetTop = startElem.offsetTop;
            setTimeout(() => {
                document.querySelector('.day-list-box').scrollTop = (startOffsetTop - this.props.topHeight);
            }, 100);
        }
    }

    render() {

        let {startTime, endTime, pickupDay, returnDay} = this.props;

        let dayList = setDayArray(startTime, endTime, pickupDay, returnDay);

        return (
            <div onClick={() => {
                this.clickDay(event.target);
            }}>
                {
                    dayList.map((e,i) => {
                        return <Item data={e} key={`date-${i}`} />;
                    })
                }
            </div>
        );

    }
}