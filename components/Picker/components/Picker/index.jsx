/**
 * Created by lamho on 2017/3/30.
 */
import React, {Component} from 'react';
import Popup from '../Popup/index.jsx';
import DayListBox from '../DayListBox/index.jsx';
import './style.scss';
import '../../../../reseatStyle/reset.scss';
import debug from '../../../../tool/debug';
/**
 * 控制显示
 * @param visibility     控制是否显示时间框    必须传
 *
 * 事件
 * @param closeEvent     传入时间框的关闭事件  必须传
 * @param confirmEvent   传入时间框的确认事件  必须传
 *
 * 日期参数
 * @param startTime       日历初始化开始时间    格式：[2017,1,1]  默认今天到明年今日
 * @param endTime        日历初始化结束时间    格式：[2018,1,1]  默认拿starTime一年后
 * @param pickupTime     选中的取车日期        默认没有
 * @param returnTime     选中的还车日期        默认没有
 *
 * 时间参宿
 * @param defaultTime    当无时间时，默认的选中时间
 *      @param h         小时  默认为 10
 *      @param m         分钟  默认为 00  格式为 0 或者 30
 * @param timeRange      时间滑动的范围
 *      @param start     开始  默认为 0
 *      @param end       结束  默认为 24
 * **/
export default class Picker extends Component{
    constructor(props){
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.visibility != this.props.visibility){
            this.startComponent(nextProps.visibility);
            return true;
        }else{
            return false;
        }

    }

    startComponent(isShow) {
        if(isShow){
            this.show();
        }else{
            this.hide();
        }
    }

    show() {

        let {startTime,endTime,pickupTime,returnTime,confirmEvent,closeEvent,defaultTime,timeRange} = this.props;

        //如果没有传开始和结束日期，默认是今天到明年今天
        let initStartTime = startTime ? new Date(startTime[0],startTime[1] - 1,startTime[2]) : new Date(),
            initEndTime = endTime ? new Date(endTime[0],endTime[1] - 1,endTime[2]) : new Date(new Date(initStartTime).setFullYear(new Date(initStartTime).getFullYear() + 1));

        if(debug(this.props)){
            return false;
        }

        Popup.show(<DayListBox
            startTime={initStartTime}
            endTime={initEndTime}
            pickupTime={pickupTime}
            returnTime={returnTime}
            defaultTime={defaultTime}
            timeRange={timeRange}
            confirmEvent={(opt) => {
                confirmEvent(opt);
            }}
            closeEvent={() => {
                closeEvent && closeEvent();
            }}
        />, {
            direction: 'bottom',
            title: '选择当地取还车时间',
            titleBtn: {
                right: {
                    isShow : false,
                },
                left: {
                    name : <i className="iconfont-goback"></i>
                }
            },
            style: {
                height: '100%'
            },
            confirm: () => {
                if(confirmEvent){
                    confirmEvent();
                }
            },
            close: () => {
                if(closeEvent){
                    closeEvent();
                }
            },
            afterConfirm: () => {
            }
        });
    }

    hide() {
        Popup.hide();
    }

    render() {
        return(
            <div>
                {this.props.children}
            </div>
        );
    }
}
