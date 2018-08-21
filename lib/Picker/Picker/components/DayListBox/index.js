'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.css');

var _SelectedTime = require('./component/SelectedTime.js');

var _SelectedTime2 = _interopRequireDefault(_SelectedTime);

var _WeekList = require('./component/WeekList.js');

var _WeekList2 = _interopRequireDefault(_WeekList);

var _Range = require('./component/Range.js');

var _Range2 = _interopRequireDefault(_Range);

var _index = require('../WarnSlideTip/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../../TextToast/index.js');

var _index4 = _interopRequireDefault(_index3);

var _format = require('../../../tool/format');

var _format2 = _interopRequireDefault(_format);

var _dateTool = require('../../tool/dateTool');

var _class = require('../../tool/class.js');

var _cn = require('../../cn.js');

var _cn2 = _interopRequireDefault(_cn);

var _hk = require('../../hk.js');

var _hk2 = _interopRequireDefault(_hk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by lamho on 2017/3/30.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var timeType = 'pickup',
    warnTimer = null,
    warnID = null,
    timer2 = null,
    //因为取还车时间setState的速度不一样，可能导致问题，需要等待100毫秒去确定是否真的还车时间小于取车时间
hasTodayPickupAndReturn = false; //是否同日取还车

//判断是否开启同步时间选择模式
function isOpenSynchronization(pickupTime, returnTime) {
    var pTime = parseFloat('' + pickupTime.h + (pickupTime.m == '30' ? '.5' : '')),
        rTime = parseFloat('' + returnTime.h + (returnTime.m == '30' ? '.5' : ''));

    if (pTime == rTime) {
        return true;
    } else {
        return false;
    }
}

//初始化全局属性
function initGlobalData(pickupDay, returnDay) {

    //重置是否同日取还车
    if (pickupDay && returnDay) {
        var pickupInfo = (0, _format2.default)(pickupDay),
            returnInfo = (0, _format2.default)(returnDay);
        pickupInfo.year == returnInfo.year && pickupInfo.month == returnInfo.month && pickupInfo.day == returnInfo.day ? hasTodayPickupAndReturn = true : hasTodayPickupAndReturn = false;
    } else {
        hasTodayPickupAndReturn = false;
    }

    //重置warn组件的定时器
    if (warnTimer) {
        clearTimeout(warnTimer);
        warnTimer = null;
    } else {
        warnTimer = null;
    }

    if (timer2) {
        clearTimeout(timer2);
        timer2 = null;
    } else {
        timer2 = null;
    }

    warnID = null;
    //打开默认为pickup选项
    timeType = 'pickup';
}

function searchParentNodeOffsetTop(node, targetParentNodeClassName) {
    if (node.parentNode.className != targetParentNodeClassName) {
        return searchParentNodeOffsetTop(node.parentNode, targetParentNodeClassName);
    } else {
        return node.parentNode.offsetTop;
    }
}

var Time = function (_Component) {
    _inherits(Time, _Component);

    function Time(props) {
        _classCallCheck(this, Time);

        // 日期和时间必须分开
        var _this2 = _possibleConstructorReturn(this, (Time.__proto__ || Object.getPrototypeOf(Time)).call(this, props));

        _this2.state = {
            pickupDay: props.pickupDay,
            returnDay: props.returnDay,
            pickupTime: props.pickupTime,
            returnTime: props.returnTime,
            isShowWarn: false,
            warnText: '',
            dayCount: props.dayCount,
            isSynchronization: isOpenSynchronization(props.pickupTime, props.returnTime),
            // 开始日期和结束日期的id
            pickupID: props.pickupID,
            returnID: props.returnID,
            // Range
            timeRange: props.timeRange || { start: 0, end: 24 },
            yesterdayRange: props.yesterdayRange
        };
        initGlobalData(_this2.state.pickupDay, _this2.state.returnDay);

        _this2.isYesterday = _this2.isYesterday.bind(_this2);
        _this2.synchTimeData = _this2.synchTimeData.bind(_this2);
        return _this2;
    }

    _createClass(Time, [{
        key: 'componentDidMount',
        value: function componentDidMount() {

            //计算中间日历滑动的框的高度
            var _this = this,
                contentHeight = null,
                tHeaderHeight = null,
                weekListHeight = null,
                dialogTitleHeight = null,
                bottomHeight = null,
                dayListBox = null;

            contentHeight = parseFloat(window.getComputedStyle(document.querySelector('.zzc-dialog')).height);
            tHeaderHeight = parseFloat(window.getComputedStyle(_this.refs.tHeader).height);
            weekListHeight = parseFloat(window.getComputedStyle(_this.refs.weekList).height);
            dialogTitleHeight = parseFloat(window.getComputedStyle(document.querySelector('.zzc-dialog-title-box')).height);
            bottomHeight = _this.refs.bottom ? parseFloat(window.getComputedStyle(_this.refs.bottom).height) : 0;
            dayListBox = _this.refs.dayListBox;
            dayListBox.style.height = contentHeight - (tHeaderHeight + weekListHeight + dialogTitleHeight + bottomHeight) + 'px';
            //如果有选中的日期，就将选中日期置顶
            var startElem = document.querySelector('.day-list-box .start');
            if (startElem) {
                var offsetTop = searchParentNodeOffsetTop(startElem, 'day-item');
                document.querySelector('.day-list-box').scrollTop = offsetTop;
            }
        }

        //日期点击事件

    }, {
        key: 'clickDay',
        value: function clickDay(e) {
            var isClickGoneDate = this.props.isClickGoneDate;


            if (!isClickGoneDate && e.target.getAttribute('data-gone') == '1') {
                return false;
            }
            var targetClassName = e.target.className;
            //点击日期元素
            if ((0, _class.hasClass)(e.target, 'J-day-info')) {
                var year = e.target.getAttribute('data-year'),
                    month = e.target.getAttribute('data-month') - 1,
                    date = e.target.getAttribute('data-date');

                this.selectDay(new Date(year, month, date), this.changeDate.bind(this));
            } else {
                return false;
            }
        }
        // 点击的是否昨天

    }, {
        key: 'isYesterday',
        value: function isYesterday(year, month, date) {
            var currentTime = this.props.currentTime;

            var currDate = new Date(currentTime.y + '-' + currentTime.month + '-' + currentTime.d);
            var paramDate = new Date(year + '-' + month + '-' + date);

            if (currDate - paramDate == 86400000) {
                return true;
            }
            return false;
        }

        //更改日期事件

    }, {
        key: 'changeDate',
        value: function changeDate(type) {
            this.props.onChangeDate({
                pickup: this.state.pickupDay ? this.state.pickupDay : null,
                return: this.state.returnDay ? this.state.returnDay : null
            });
        }

        //获取点击的时间

    }, {
        key: 'selectDay',
        value: function selectDay(_selectDay, callback) {
            this.inspectDay(timeType, _selectDay, callback);
        }

        //获取选择的时间段

    }, {
        key: 'selectTime',
        value: function selectTime(_selectTime, type) {
            var _this3 = this;

            var timeInfo = _selectTime.split(':');

            //没有还车或者取车日期的时候，只设置时间
            if (type == 'pickup') {

                var pickupDay = this.state.pickupDay ? this.combinationOfTime('pickup', this.state.pickupDay, { h: timeInfo[0], m: timeInfo[1] }) : null,
                    dayCount = pickupDay && this.state.returnDay ? (0, _dateTool.setDayCount)(pickupDay, this.state.returnDay) : null;

                this.setState({
                    pickupTime: {
                        h: timeInfo[0],
                        m: timeInfo[1]
                    },
                    pickupDay: pickupDay,
                    dayCount: dayCount
                }, function () {
                    _this3.setWarnInfo(type);
                });
            } else {

                var returnDay = this.state.returnDay ? this.combinationOfTime('return', this.state.returnDay, { h: timeInfo[0], m: timeInfo[1] }) : null,
                    _dayCount = this.state.pickupDay && returnDay ? (0, _dateTool.setDayCount)(this.state.pickupDay, returnDay) : null;

                this.setState({
                    returnTime: {
                        h: timeInfo[0],
                        m: timeInfo[1]
                    },
                    dayCount: _dayCount,
                    returnDay: returnDay
                }, function () {
                    _this3.setWarnInfo(type);
                });
            }
        }

        //更改同步模式

    }, {
        key: 'changeSynchronization',
        value: function changeSynchronization(isSynchronization) {
            if (this.state.isSynchronization == isSynchronization) {
                return false;
            }
            this.setState({
                isSynchronization: isSynchronization
            });
        }

        //同步时间选择

    }, {
        key: 'synchronizationReturnTimeStart',
        value: function synchronizationReturnTimeStart(startData) {
            this.refs.returnRange.synchronizationReturnTimeStart(startData);
        }
    }, {
        key: 'synchronizationReturnTimeMove',
        value: function synchronizationReturnTimeMove(moveData, nextX) {
            this.refs.returnRange.synchronizationReturnTimeMove(moveData, nextX);
        }
    }, {
        key: 'synchronizationReturnTimeEnd',
        value: function synchronizationReturnTimeEnd(endData) {
            this.refs.returnRange.synchronizationReturnTimeEnd(endData);
        }

        //检测选择时间时候符合逻辑

    }, {
        key: 'inspectDay',
        value: function inspectDay(type, selectDay, callback) {
            var _this4 = this;

            var selectDayInfo = (0, _format2.default)(selectDay),
                id = 't-' + selectDayInfo.year + '-' + selectDayInfo.month + '-' + selectDayInfo.day;

            //当前选择的还车时间
            if (type == 'return') {

                var returnTime = this.combinationOfTime('return', selectDay),

                //判断是否同日取还车
                pickupInfo = (0, _format2.default)(this.state.pickupDay),
                    returnInfo = selectDayInfo;

                pickupInfo.year == returnInfo.year && pickupInfo.month == returnInfo.month && pickupInfo.day == returnInfo.day ? hasTodayPickupAndReturn = true : hasTodayPickupAndReturn = false;

                //还车时间小于取车时间，将还车时间赋值到取车时间，还车时间为null，如果为同日取还车跳过if
                if (!hasTodayPickupAndReturn && this.state.pickupDay != null && returnTime.getTime() < this.state.pickupDay.getTime()) {

                    this.changeListDayState('pickup', id);

                    timeType = 'return';
                    this.setState({
                        pickupDay: this.combinationOfTime('pickup', selectDay),
                        returnDay: null,
                        dayCount: null,
                        pickupID: id,
                        returnID: null
                    }, function () {
                        callback && callback();
                        _this4.setWarnInfo(timeType);
                    });
                    //正常设置还车时间
                } else {

                    this.changeListDayState('return', id);

                    timeType = 'pickup';
                    this.setState({
                        returnDay: this.combinationOfTime('return', selectDay),
                        dayCount: this.setDayCount(returnTime, this.state.pickupDay),
                        returnID: id
                    }, function () {
                        callback && callback();
                        _this4.setWarnInfo(timeType);
                    });
                }
            } else {
                this.changeListDayState('pickup', id);

                timeType = 'return';
                this.setState({
                    pickupDay: this.combinationOfTime('pickup', selectDay),
                    returnDay: null,
                    dayCount: null,
                    pickupID: id,
                    returnID: null
                }, function () {
                    callback && callback();
                    _this4.setWarnInfo(timeType);
                });
            }
        }

        //更改列表日期的显示状态

    }, {
        key: 'changeListDayState',
        value: function changeListDayState(currType, id) {
            //当前选择的是pickup
            if (currType == 'pickup') {

                //如果已经选中需要清空选中状态
                if (this.state.pickupID != null || this.state.returnID != null) {

                    var pickupElem = document.querySelector('#' + this.state.pickupID + ''),
                        returnElem = document.querySelector('#' + this.state.returnID + '');

                    //如果已经有取还车，需要将full状态的ul清空状态
                    if (this.state.pickupID != null && this.state.returnID != null) {

                        //更改日历范围可能导致储存的id找不到元素，如果没有该元素，跳过清除状态
                        var fullUl = document.querySelectorAll('.day-item-content .full');
                        if (fullUl.length != 0) {
                            for (var i = 0; i < fullUl.length; i++) {
                                fullUl[i].className = '';
                            }
                        }
                    }

                    //清除取还车日期选中的class
                    if (pickupElem) {
                        //如果当前是支持点击之前日期，需要判断如果当前日期是过期日期，将要保留gone的class
                        if (this.props.isClickGoneDate && pickupElem.children[0].getAttribute('data-gone') == '1') {
                            if (pickupElem.children[0].getAttribute('data-gone') == '1') {
                                pickupElem.className = "gone";
                            }
                        } else {
                            pickupElem.className = '';
                        }
                        pickupElem.parentNode.className = "";
                    }

                    if (returnElem) {
                        //如果当前是支持点击之前日期，需要判断如果当前日期是过期日期，将要保留gone的class
                        if (this.props.isClickGoneDate && returnElem.children[0].getAttribute('data-gone') == '1') {
                            returnElem.className = "gone";
                        } else {
                            returnElem.className = '';
                        }
                        returnElem.parentNode.className = "";
                    }
                }

                var elem = document.querySelector('#' + id + '');
                elem.className = 'start';
                return;
            }

            //当前选择的是return
            if (currType == 'return') {

                var _returnElem = document.querySelector('#' + id + '');
                //取还车同日
                if (this.state.pickupID == id) {
                    _returnElem.className = 'end start';
                } else {
                    var _pickupElem = document.querySelector('#' + this.state.pickupID + ''),
                        returnCol = _returnElem.getAttribute('data-colume'),
                        returnRow = _returnElem.parentNode.getAttribute('data-row'),
                        returnMonth = _returnElem.parentNode.parentNode.getAttribute('data-month'),
                        returnYear = _returnElem.parentNode.parentNode.getAttribute('data-year'),
                        pickupCol = _pickupElem.getAttribute('data-colume'),
                        pickupRow = _pickupElem.parentNode.getAttribute('data-row'),
                        pickupMonth = _pickupElem.parentNode.parentNode.getAttribute('data-month'),
                        pickupYear = _pickupElem.parentNode.parentNode.getAttribute('data-year');

                    //如果取还车是同一行需要特殊处理
                    if (returnRow == pickupRow && pickupYear == returnYear && returnMonth == pickupMonth) {
                        var diff = returnCol - pickupCol - 1,
                            currElem = _pickupElem,
                            className = '';

                        for (var k = 0; k < diff; k++) {
                            var nextElem = null;
                            if (currElem.nextSibling.nodeName != 'LI') {
                                nextElem = currElem.nextSibling.nextSibling;
                            } else {
                                nextElem = currElem.nextSibling;
                            }

                            className += ' row-' + nextElem.getAttribute('data-colume');
                            currElem = nextElem;
                        }
                        _returnElem.parentNode.className = className;
                    } else {
                        _pickupElem.parentNode.className = 's-row-' + (7 - pickupCol);
                        _returnElem.parentNode.className = 'e-row-' + (returnCol - 1);

                        //找到取还中间相隔多少行
                        var ulElem = document.querySelectorAll('.day-item-content ul'),
                            start = false;
                        for (var _i = 0; _i < ulElem.length; _i++) {
                            if (ulElem[_i] == _pickupElem.parentNode) {
                                start = true;
                            } else if (ulElem[_i] == _returnElem.parentNode) {
                                start = false;
                                break;
                            } else {
                                if (start) {
                                    ulElem[_i].className = "full";
                                }
                            }
                        }
                    }
                    _returnElem.className = 'end before';
                    _pickupElem.className = 'start before';
                }
            }
        }

        //将时间和日期合并输出

    }, {
        key: 'combinationOfTime',
        value: function combinationOfTime(type, selectDay, selectTime) {
            //如果传入了指定事件，就将日期和事件合并，否则就按照type和平对应的时间和日期
            if (selectTime) {
                return new Date(new Date(selectDay.setHours(parseInt(selectTime.h))).setMinutes(parseInt(selectTime.m)));
            }

            if (type == 'pickup') {
                return new Date(new Date(selectDay.setHours(parseInt(this.state.pickupTime.h))).setMinutes(parseInt(this.state.pickupTime.m)));
            } else {
                return new Date(new Date(selectDay.setHours(parseInt(this.state.returnTime.h))).setMinutes(parseInt(this.state.returnTime.m)));
            }
        }

        //计算天数

    }, {
        key: 'setDayCount',
        value: function setDayCount(returnDay, pickupDay) {
            var returnTime = returnDay.getTime(),
                pickupTime = pickupDay.getTime(),
                diff = returnTime - pickupTime;

            return Math.ceil(diff / 1000 / 60 / 60 / 24);
        }

        //验证时间选择

    }, {
        key: 'verifyDate',
        value: function verifyDate(pickupDay, returnDay) {

            if (!pickupDay) {
                this.showTextToast(this.props.lang == 'hk' ? _hk2.default.toast1 : _cn2.default.toast1);
                return false;
            }

            if (!returnDay) {
                this.showTextToast(this.props.lang == 'hk' ? _hk2.default.toast2 : _cn2.default.toast2);
                return false;
            }

            var pickupInfo = (0, _format2.default)(pickupDay, this.props.isOpenTimePicker),
                returnInfo = (0, _format2.default)(returnDay, this.props.isOpenTimePicker),
                pTime = parseFloat('' + pickupInfo.hours + (pickupInfo.minutes == '30' ? '.5' : '')),
                rTime = parseFloat('' + returnInfo.hours + (returnInfo.minutes == '30' ? '.5' : ''));

            //当天去还车
            if (pickupInfo.year == returnInfo.year && pickupInfo.month == returnInfo.month && pickupInfo.day == returnInfo.day) {
                //同一时间取还车
                if (pTime == rTime || rTime < pTime) {
                    this.showTextToast(this.props.lang == 'hk' ? _hk2.default.toast3 : _cn2.default.toast3);
                    return false;
                } else {
                    return true;
                }
            }

            return true;
        }

        //显示TextToast弹窗

    }, {
        key: 'showTextToast',
        value: function showTextToast(content, callback) {
            _index4.default.info(content, 2000, callback instanceof Function ? callback : null, document.querySelector('.zzc-popup'));
        }

        //确认时间

    }, {
        key: 'confirm',
        value: function confirm() {

            if (this.verifyDate(this.state.pickupDay, this.state.returnDay)) {
                var pickupInfo = this.state.pickupDay ? (0, _format2.default)(this.state.pickupDay, this.props.isOpenTimePicker) : null,
                    returnInfo = this.state.returnDay ? (0, _format2.default)(this.state.returnDay, this.props.isOpenTimePicker) : null,
                    _props = this.props,
                    confirmEvent = _props.confirmEvent,
                    closeEvent = _props.closeEvent;


                confirmEvent instanceof Function && confirmEvent({
                    pickupTime: pickupInfo,
                    returnTime: returnInfo,
                    dayCount: this.state.dayCount
                });
                closeEvent instanceof Function && closeEvent();
            }
        }

        //设置警告信息

    }, {
        key: 'setWarnInfo',
        value: function setWarnInfo(type) {

            if (!this.props.isOpenTimePicker) {
                return false;
            }

            //如果取还车时间没有不作处理
            if (!this.state.pickupDay || !this.state.returnDay) {
                return false;
            }

            var pickupDay = (0, _format2.default)(this.state.pickupDay, this.props.isOpenTimePicker),
                returnDay = (0, _format2.default)(this.state.returnDay, this.props.isOpenTimePicker),
                pickupTime = parseFloat('' + pickupDay.hours + (pickupDay.minutes == '30' ? '.5' : '')),
                returnTime = parseFloat('' + returnDay.hours + (returnDay.minutes == '30' ? '.5' : ''));

            if (hasTodayPickupAndReturn && pickupTime >= returnTime) {
                if (warnID != 1) {
                    this.hideWarn();
                }
                warnID = 1;
                this.showWarn(this.props.lang == 'hk' ? _hk2.default.warn1 : _cn2.default.warn1);
                return false;
            }

            //超出1小时也会按1天算
            if (!hasTodayPickupAndReturn && pickupDay.time.getTime() < returnDay.time.getTime() && returnTime > pickupTime) {
                if (warnID != 2) {
                    this.hideWarn();
                }
                warnID = 2;
                this.showWarn(this.props.lang == 'hk' ? _hk2.default.warn2 : _cn2.default.warn2);
                return false;
            }

            //以上条件不满足代表通过验证，则马上取消警告框
            this.hideWarn();
        }

        //显示警告框

    }, {
        key: 'showWarn',
        value: function showWarn(text) {
            var _this5 = this;

            //重新倒计时
            if (warnTimer != null) {
                this.warnShowedEvent();
            } else {
                timer2 = setTimeout(function () {
                    _this5.setState({
                        isShowWarn: true,
                        warnText: text
                    });
                }, 100);
            }
        }

        //隐藏警告框

    }, {
        key: 'hideWarn',
        value: function hideWarn() {
            clearTimeout(timer2);
            timer2 = null;
            if (warnTimer != null) {
                clearTimeout(warnTimer);
                warnTimer = null;
                this.setState({
                    isShowWarn: false
                });
            }
        }

        //警告信息弹出后的回调

    }, {
        key: 'warnShowedEvent',
        value: function warnShowedEvent() {
            var _this6 = this;

            //如果当前没有进入倒计时收起，就正常倒计时
            if (warnTimer == null) {
                warnTimer = setTimeout(function () {
                    _this6.setState({
                        isShowWarn: false
                    });
                    warnTimer = null;
                }, 4000);
                //如果正在倒计时的时候再次触发弹出warn，则清除之前的倒计时重新计时
            } else {
                clearTimeout(warnTimer);
                warnTimer = setTimeout(function () {
                    _this6.setState({
                        isShowWarn: false
                    });
                    warnTimer = null;
                }, 4000);
            }
        }

        //有时间选择的底部控件

    }, {
        key: 'haveTimeBottomController',
        value: function haveTimeBottomController() {
            var _this7 = this;

            var _props2 = this.props,
                lang = _props2.lang,
                yesterdayTimeRange = _props2.yesterdayTimeRange,
                currentTime = _props2.currentTime;
            var timeRange = this.state.timeRange;

            return _react2.default.createElement(
                'div',
                { className: 'bottom-controller-box' },
                _react2.default.createElement(_Range2.default, {
                    ref: 'pickupRange',
                    synchronizationReturnTimeStart: function synchronizationReturnTimeStart(data) {
                        _this7.synchronizationReturnTimeStart(data);
                    },
                    synchronizationReturnTimeMove: function synchronizationReturnTimeMove(data, nextX) {
                        _this7.synchronizationReturnTimeMove(data, nextX);
                    },
                    synchronizationReturnTimeEnd: function synchronizationReturnTimeEnd(data) {
                        _this7.synchronizationReturnTimeEnd(data);
                    },
                    synchTimeData: this.synchTimeData,
                    isSynchronization: this.state.isSynchronization,
                    title: lang == 'hk' ? _hk2.default.pickupTime : _cn2.default.pickupTime,
                    rangeType: lang == 'hk' ? _hk2.default.pickup : _cn2.default.pickup,
                    type: 'pickup',
                    timeRange: timeRange,
                    yesterdayTimeRange: yesterdayTimeRange,
                    time: this.state.pickupTime,
                    day: this.state.pickupDay,
                    currentTime: currentTime,
                    isYesterday: this.isYesterday,
                    selectTime: function selectTime(time, type) {
                        _this7.selectTime(time, type);
                    }
                }),
                _react2.default.createElement(_Range2.default, {
                    ref: 'returnRange',
                    title: lang == 'hk' ? _hk2.default.returnTime : _cn2.default.returnTime,
                    rangeType: lang == 'hk' ? _hk2.default.return : _cn2.default.return,
                    type: 'return',
                    timeRange: timeRange,
                    yesterdayTimeRange: yesterdayTimeRange,
                    isSynchronization: this.state.isSynchronization,
                    time: this.state.returnTime,
                    day: this.state.returnDay,
                    pickupDay: this.state.pickupDay,
                    currentTime: currentTime,
                    isYesterday: this.isYesterday,
                    synchTimeData: this.synchTimeData,
                    selectTime: function selectTime(time, type) {
                        _this7.selectTime(time, type);
                    },
                    changeSynchronization: function changeSynchronization(isSynchronization) {
                        _this7.changeSynchronization(isSynchronization);
                    }
                }),
                _react2.default.createElement(
                    'div',
                    { className: 'confirm-box' },
                    _react2.default.createElement(
                        'span',
                        { onClick: function onClick() {
                                _this7.confirm();
                            } },
                        lang == 'hk' ? _hk2.default.confirm : _cn2.default.confirm
                    )
                )
            );
        }

        //没有时间选择的底部控件

    }, {
        key: 'noTimeBottomController',
        value: function noTimeBottomController() {
            var _this8 = this;

            return _react2.default.createElement(
                'div',
                { className: 'bottom-controller-box' },
                _react2.default.createElement(
                    'div',
                    { className: 'confirm-box' },
                    _react2.default.createElement(
                        'span',
                        { onClick: function onClick() {
                                _this8.confirm();
                            } },
                        this.props.lang == 'hk' ? _hk2.default.confirm : _cn2.default.confirm
                    )
                )
            );
        }
    }, {
        key: 'synchTimeData',
        value: function synchTimeData(timeData, type) {
            if (type == 'pickupTime') {
                this.setState({
                    pickupTime: timeData,
                    pickupDay: this.state.pickupDay ? this.combinationOfTime('pickup', this.state.pickupDay, { h: timeData.h, m: timeData.m }) : null
                });
            } else {
                this.setState({
                    returnTime: timeData
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this9 = this;

            var _props3 = this.props,
                hideController = _props3.hideController,
                isOpenTimePicker = _props3.isOpenTimePicker,
                startTime = _props3.startTime,
                endTime = _props3.endTime,
                timeRange = _props3.timeRange,
                dayList = _props3.dayList,
                JSXElem = _props3.JSXElem,
                pickupPlaceholder = _props3.pickupPlaceholder,
                returnPlaceholder = _props3.returnPlaceholder,
                lang = _props3.lang;

            return _react2.default.createElement(
                'div',
                { className: 't-box' },
                _react2.default.createElement(
                    'div',
                    { className: 't-box-content' },
                    _react2.default.createElement(
                        'div',
                        { className: 't-header', ref: 'tHeader' },
                        _react2.default.createElement(_SelectedTime2.default, {
                            'class': 't-pickup-time',
                            title: '\u53D6\u8F66\u65F6\u95F4',
                            isOpenTimePicker: isOpenTimePicker,
                            day: this.state.pickupDay,
                            time: isOpenTimePicker ? this.state.pickupTime : null,
                            placeholder: pickupPlaceholder
                        }),
                        this.state.dayCount ? _react2.default.createElement(
                            'div',
                            { className: 't-total-day' },
                            _react2.default.createElement(
                                'span',
                                null,
                                this.state.dayCount + '\u5929'
                            )
                        ) : _react2.default.createElement(
                            'div',
                            { className: 't-none-day' },
                            _react2.default.createElement('i', { className: 'iconfont-arrows' })
                        ),
                        _react2.default.createElement(_SelectedTime2.default, {
                            'class': 't-return-time',
                            title: '\u8FD8\u8F66\u65F6\u95F4',
                            isOpenTimePicker: isOpenTimePicker,
                            day: this.state.returnDay,
                            time: isOpenTimePicker ? this.state.returnTime : null,
                            placeholder: returnPlaceholder
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { ref: 'weekList' },
                        _react2.default.createElement(_WeekList2.default, null)
                    ),
                    _react2.default.createElement('div', {
                        dangerouslySetInnerHTML: { __html: JSXElem },
                        className: 'day-list-box',
                        ref: 'dayListBox',
                        onClick: function onClick(e) {
                            _this9.clickDay(e);
                        }
                    })
                ),
                !hideController && _react2.default.createElement(
                    'div',
                    { ref: 'bottom', className: isOpenTimePicker ? "bottom-controller" : "bottom-controller no-time" },
                    isOpenTimePicker ? this.haveTimeBottomController() : this.noTimeBottomController(),
                    _react2.default.createElement(_index2.default, {
                        text: this.state.warnText,
                        isShow: this.state.isShowWarn,
                        showedEvent: function showedEvent() {
                            _this9.warnShowedEvent();
                        }
                    })
                )
            );
        }
    }]);

    return Time;
}(_react.Component);

exports.default = Time;