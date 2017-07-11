'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.css');

var _DateList = require('./component/DateList.js');

var _DateList2 = _interopRequireDefault(_DateList);

var _SelectedTime = require('./component/SelectedTime.js');

var _SelectedTime2 = _interopRequireDefault(_SelectedTime);

var _WeekList = require('./component/WeekList.js');

var _WeekList2 = _interopRequireDefault(_WeekList);

var _Range = require('./component/Range.js');

var _Range2 = _interopRequireDefault(_Range);

var _WarnSlideTip = require('../WarnSlideTip');

var _WarnSlideTip2 = _interopRequireDefault(_WarnSlideTip);

var _TextToast = require('../../../TextToast');

var _TextToast2 = _interopRequireDefault(_TextToast);

var _format = require('../../../tool/format');

var _format2 = _interopRequireDefault(_format);

var _dateTool = require('../../tool/dateTool');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by lamho on 2017/3/30.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var timeType = 'pickup',
    topHeight = 0,
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

var Time = function (_Component) {
    _inherits(Time, _Component);

    function Time(props) {
        _classCallCheck(this, Time);

        //日期和时间必须分开
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
            //开始日期和结束日期的id
            pickupID: _this2.props.pickupID,
            returnID: _this2.props.returnID
        };

        initGlobalData(_this2.state.pickupDay, _this2.state.returnDay);
        return _this2;
    }

    _createClass(Time, [{
        key: 'componentDidMount',
        value: function componentDidMount() {

            var _this = this,
                windowHeight = window.screen.height,
                tHeaderHeight = null,
                weekListHeight = null,
                dialogTitleHeight = null,
                bottomHeight = null,
                dayListBox = null;

            tHeaderHeight = parseFloat(window.getComputedStyle(_this.refs.tHeader).height);
            weekListHeight = parseFloat(window.getComputedStyle(_this.refs.weekList).height);
            dialogTitleHeight = parseFloat(window.getComputedStyle(document.querySelector('.zzc-dialog-title-box')).height);
            bottomHeight = parseFloat(window.getComputedStyle(_this.refs.bottom).height);
            dayListBox = _this.refs.dayListBox;

            dayListBox.style.height = windowHeight - (tHeaderHeight + weekListHeight + dialogTitleHeight + bottomHeight) + 'px';
            topHeight = tHeaderHeight + weekListHeight + dialogTitleHeight;

            //延迟加载日期列表
            // setTimeout(() => {
            //     this.setState({
            //         asynCreatDayList : true
            //     });
            // },14);

        }

        //获取点击的时间

    }, {
        key: 'selectDay',
        value: function selectDay(_selectDay) {
            this.inspectDay(timeType, _selectDay);
        }

        //获取选择的时间段

    }, {
        key: 'selectTime',
        value: function selectTime(_selectTime, type) {
            var _this3 = this;

            var timeInfo = _selectTime.split(':');

            //没有还车或者取车日期的时候，只设置时间
            if (type == 'pickup') {
                this.setState({
                    pickupTime: {
                        h: timeInfo[0],
                        m: timeInfo[1]
                    },
                    pickupDay: this.state.pickupDay ? this.combinationOfTime('pickup', this.state.pickupDay, { h: timeInfo[0], m: timeInfo[1] }) : null
                }, function () {
                    _this3.setWarnInfo(type);
                });
            } else {

                var returnDay = this.state.returnDay ? this.combinationOfTime('return', this.state.returnDay, { h: timeInfo[0], m: timeInfo[1] }) : null,
                    dayCount = this.state.pickupDay && returnDay ? (0, _dateTool.setDayCount)(this.state.pickupDay, returnDay) : null;

                this.setState({
                    returnTime: {
                        h: timeInfo[0],
                        m: timeInfo[1]
                    },
                    dayCount: dayCount,
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
        value: function inspectDay(type, selectDay) {
            var _this4 = this;

            var selectDayInfo = (0, _format2.default)(selectDay),
                id = 't-' + selectDayInfo.year + '-' + (selectDayInfo.month >= 10 ? selectDayInfo.month : '0' + selectDayInfo.month) + '-' + selectDayInfo.day;

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
                    _this4.setWarnInfo(timeType);
                });
            }
        }

        //更改列表日期的显示状态

    }, {
        key: 'changeListDayState',
        value: function changeListDayState(currType, id) {

            var i = document.createElement('i');

            //当前选择的是pickup
            if (currType == 'pickup') {

                //如果已经选中需要清空选中状态
                if (this.state.pickupID != null || this.state.returnID != null) {

                    var pickupElem = document.querySelector('#' + this.state.pickupID + ''),
                        returnElem = document.querySelector('#' + this.state.returnID + '');

                    //如果已经有取还车，需要将full状态的ul清空状态
                    if (this.state.pickupID != null && this.state.returnID != null) {

                        //更改日历范围可能导致储存的id找不到元素，如果没有该元素，跳过清除状态
                        if (pickupElem && returnElem) {
                            var returnRow = returnElem.parentNode.getAttribute('data-row'),
                                pickupRow = pickupElem.parentNode.getAttribute('data-row');

                            var currRow = parseInt(pickupRow);
                            while (currRow <= returnRow) {
                                document.querySelector('.day-item ul[data-row="' + currRow + '"]').className = '';
                                currRow++;
                            }
                        }
                    }

                    //清除取还车的i提示
                    if (this.state.pickupID == this.state.returnID) {
                        var _i = document.getElementById('start-end-tips');
                        _i.parentNode.removeChild(_i);
                    } else {
                        var startI = document.getElementById('start-tips'),
                            endI = document.getElementById('end-tips');

                        startI && startI.parentNode.removeChild(startI);
                        endI && endI.parentNode.removeChild(endI);
                    }

                    //清除取还车日期选中的class
                    if (pickupElem) {
                        pickupElem.className = '';
                    }

                    if (returnElem) {
                        returnElem.className = '';
                    }
                }

                var elem = document.querySelector('#' + id + '');

                i.innerHTML = '取车';
                i.id = 'start-tips';
                elem.className = 'start';
                elem.childNodes[0].appendChild(i);

                return;
            }

            //当前选择的是return
            if (currType == 'return') {

                var _returnElem = document.querySelector('#' + id + '');

                //取还车同日
                if (this.state.pickupID == id) {
                    var _i2 = document.querySelector('#' + id + ' span i');
                    _i2.innerHTML = '取还车';
                    _i2.id = 'start-end-tips';
                    _returnElem.className = 'end start';
                } else {
                    var returnCol = _returnElem.getAttribute('data-colume'),
                        _returnRow = _returnElem.parentNode.getAttribute('data-row'),
                        _pickupElem = document.querySelector('#' + this.state.pickupID + ''),
                        pickupCol = _pickupElem.getAttribute('data-colume'),
                        _pickupRow = _pickupElem.parentNode.getAttribute('data-row');

                    i.innerHTML = '还车';
                    i.id = 'end-tips';

                    //如果取还车是同一行需要特殊处理
                    if (_returnRow == _pickupRow) {

                        var diff = returnCol - pickupCol - 1,
                            currElem = _pickupElem,
                            className = '';
                        for (var k = 0; k < diff; k++) {
                            className += ' row-' + currElem.nextSibling.getAttribute('data-colume');
                            currElem = currElem.nextSibling;
                        }
                        _returnElem.parentNode.className = className;
                    } else {
                        _pickupElem.parentNode.className = 's-row-' + (7 - pickupCol);
                        _returnElem.parentNode.className = 'e-row-' + (returnCol - 1);

                        //找到取还中间相隔多少行
                        var _currRow = parseInt(_pickupRow) + 1;
                        while (_currRow < _returnRow) {
                            document.querySelector('.day-item ul[data-row="' + _currRow + '"]').className = 'full';
                            _currRow++;
                        }
                    }
                    _returnElem.className = 'end before';
                    _pickupElem.className = 'start before';

                    _returnElem.childNodes[0].appendChild(i);
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
                this.showTextToast('请选择取车时间');
                return false;
            }

            if (!returnDay) {
                this.showTextToast('请选择还车时间');
                return false;
            }

            var pickupInfo = (0, _format2.default)(pickupDay),
                returnInfo = (0, _format2.default)(returnDay),
                pTime = parseFloat('' + pickupInfo.hours + (pickupInfo.minutes == '30' ? '.5' : '')),
                rTime = parseFloat('' + returnInfo.hours + (returnInfo.minutes == '30' ? '.5' : ''));

            //当天去还车
            if (pickupInfo.year == returnInfo.year && pickupInfo.month == returnInfo.month && pickupInfo.day == returnInfo.day) {
                //同一时间取还车
                if (pTime == rTime || rTime < pTime) {
                    this.showTextToast('当日取还，还车时间需晚于取车时间');
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
            _TextToast2.default.show({
                content: content,
                duration: 2000,
                callBack: callback instanceof Function ? callback : null,
                zIndex: 9999,
                targetParent: document.querySelector('.zzc-popup')
            });
        }

        //确认时间

    }, {
        key: 'confirm',
        value: function confirm() {

            if (this.verifyDate(this.state.pickupDay, this.state.returnDay)) {
                var pickupInfo = this.state.pickupDay ? (0, _format2.default)(this.state.pickupDay) : null,
                    returnInfo = this.state.returnDay ? (0, _format2.default)(this.state.returnDay) : null,
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

            //如果取还车时间没有不作处理
            if (!this.state.pickupDay || !this.state.returnDay) {
                return false;
            }

            var pickupDay = (0, _format2.default)(this.state.pickupDay),
                returnDay = (0, _format2.default)(this.state.returnDay),
                pickupTime = parseFloat('' + pickupDay.hours + (pickupDay.minutes == '30' ? '.5' : '')),
                returnTime = parseFloat('' + returnDay.hours + (returnDay.minutes == '30' ? '.5' : ''));

            if (hasTodayPickupAndReturn && pickupTime >= returnTime) {
                if (warnID != 1) {
                    this.hideWarn();
                }
                warnID = 1;
                this.showWarn('当日取还，还车时间需晚于取车时间');
                return false;
            }

            //还车时间小于取车时间，例如：10：00取车  还车是9：00
            if (pickupTime > returnTime) {
                if (warnID != 2) {
                    this.hideWarn();
                }
                warnID = 2;
                this.showWarn('不满24小时按1天算');
                return false;
            }

            //以上条件不满足代表通过验证，则马上手气警告框
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
    }, {
        key: 'render',
        value: function render() {
            var _this7 = this;

            var _props2 = this.props,
                startTime = _props2.startTime,
                endTime = _props2.endTime,
                timeRange = _props2.timeRange,
                dayList = _props2.dayList;

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
                            day: this.state.pickupDay,
                            time: this.state.pickupTime,
                            placeholder: '\u9009\u62E9\u53D6\u8F66\u65F6\u95F4'
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
                            day: this.state.returnDay,
                            time: this.state.returnTime,
                            placeholder: '\u9009\u62E9\u8FD8\u8F66\u65F6\u95F4'
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { ref: 'weekList' },
                        _react2.default.createElement(_WeekList2.default, null)
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'day-list-box', ref: 'dayListBox' },
                        _react2.default.createElement(_DateList2.default, {
                            startTime: startTime,
                            endTime: endTime,
                            dayList: JSON.parse(JSON.stringify(dayList)) //断开引用
                            , selectDay: function selectDay(selectTime) {
                                _this7.selectDay(selectTime);
                            },
                            topHeight: topHeight,
                            pickupDay: this.state.pickupDay,
                            returnDay: this.state.returnDay
                        })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { ref: 'bottom', className: 'bottom-controller' },
                    _react2.default.createElement(
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
                            isSynchronization: this.state.isSynchronization,
                            title: '\u53D6\u8F66\u65F6\u95F4',
                            rangeType: '\u53D6\u8F66',
                            type: 'pickup',
                            timeRange: timeRange,
                            time: this.state.pickupTime,
                            day: this.state.pickupDay,
                            selectTime: function selectTime(time, type) {
                                _this7.selectTime(time, type);
                            }
                        }),
                        _react2.default.createElement(_Range2.default, {
                            ref: 'returnRange',
                            title: '\u8FD8\u8F66\u65F6\u95F4',
                            rangeType: '\u8FD8\u8F66',
                            type: 'return',
                            timeRange: timeRange,
                            isSynchronization: this.state.isSynchronization,
                            time: this.state.returnTime,
                            day: this.state.returnDay,
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
                                '\u786E\u8BA4'
                            )
                        )
                    ),
                    _react2.default.createElement(_WarnSlideTip2.default, {
                        text: this.state.warnText,
                        isShow: this.state.isShowWarn,
                        showedEvent: function showedEvent() {
                            _this7.warnShowedEvent();
                        }
                    })
                )
            );
        }
    }]);

    return Time;
}(_react.Component);

exports.default = Time;