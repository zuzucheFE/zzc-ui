'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('./components/Popup/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./components/DayListBox/index.js');

var _index4 = _interopRequireDefault(_index3);

require('./style.css');

require('./reseatStyle/reset.css');

var _debug = require('./tool/debug.js');

var _debug2 = _interopRequireDefault(_debug);

var _setDayList = require('./tool/setDayList');

var _setDayList2 = _interopRequireDefault(_setDayList);

var _arrayToDate = require('./tool/arrayToDate');

var _format = require('../tool/format');

var _format2 = _interopRequireDefault(_format);

var _compare = require('./tool/compare');

var _dateTool = require('./tool/dateTool');

var _createElem = require('./tool/createElem.js');

var _createElem2 = _interopRequireDefault(_createElem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by lamho on 2017/3/30.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


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

var Picker = function (_Component) {
    _inherits(Picker, _Component);

    function Picker(props) {
        _classCallCheck(this, Picker);

        var _this = _possibleConstructorReturn(this, (Picker.__proto__ || Object.getPrototypeOf(Picker)).call(this, props));

        var _this$props = _this.props,
            startTime = _this$props.startTime,
            endTime = _this$props.endTime;

        //如果没有传开始和结束日期，默认是今天到明年今天

        var initStartTime = (0, _arrayToDate.startArrayToDate)(startTime),
            initEndTime = (0, _arrayToDate.endArrayToDate)(endTime, initStartTime),
            pickupTime = (0, _dateTool.setTime)(props.pickupTime, _this.props.defaultTime),
            pickupDay = (0, _dateTool.setDay)(props.pickupTime),
            returnTime = (0, _dateTool.setTime)(props.returnTime, _this.props.defaultTime),
            returnDay = (0, _dateTool.setDay)(props.returnTime),
            dayList = (0, _setDayList2.default)(initStartTime, initEndTime, pickupDay, returnDay),
            pickupInfo = (0, _dateTool.setDay)(props.pickupTime) ? (0, _format2.default)(props.pickupTime) : null,
            returnInfo = (0, _dateTool.setDay)(props.returnTime) ? (0, _format2.default)(props.returnTime) : null,
            dayCount = pickupDay && returnDay ? (0, _dateTool.setDayCount)(pickupDay, returnDay) : null;

        //在初始化不渲染的时候，就将dayList数组做出来，存在picker里面，之后的dayList用的都是这个初始化出来的数组。
        //当开始和结束日期改变的时候，会触发setState去更改这个数组，不用在显示选择框的时候再去做这个dayList数组
        _this.state = {
            dayList: dayList,
            startTime: initStartTime,
            endTime: initEndTime,
            pickupTime: pickupTime,
            returnTime: returnTime,
            pickupDay: pickupDay,
            returnDay: returnDay,
            pickupID: pickupInfo ? 't-' + pickupInfo.year + '-' + pickupInfo.month + '-' + pickupInfo.day : null,
            returnID: returnInfo ? 't-' + returnInfo.year + '-' + returnInfo.month + '-' + returnInfo.day : null,
            dayCount: dayCount,
            JSXElem: (0, _createElem2.default)(JSON.parse(JSON.stringify(dayList))),
            isPropsWrong: false
        };
        return _this;
    }

    _createClass(Picker, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if ((0, _debug2.default)(this.props)) {
                return false;
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            var _this2 = this;

            //在不切换显示的时候更改了日期，需要记录到state中
            if (nextProps.visibility == this.props.visibility) {
                var oldPropsData = JSON.stringify({
                    pickupTime: this.props.pickupTime,
                    returnTime: this.props.returnTime,
                    startTime: this.props.startTime,
                    endTime: this.props.endTime,
                    defaultTime: this.props.defaultTime,
                    timeRange: this.props.timeRange
                });
                var nextPropsData = JSON.stringify({
                    pickupTime: nextProps.pickupTime,
                    returnTime: nextProps.returnTime,
                    startTime: nextProps.startTime,
                    endTime: nextProps.endTime,
                    defaultTime: nextProps.defaultTime,
                    timeRange: nextProps.timeRange
                });
                if (oldPropsData != nextPropsData) {
                    this.resetAllData(nextProps);
                    return true;
                } else {
                    return false;
                }
            }

            //改变visibility代表需要更改显示
            if (nextProps.visibility != this.props.visibility) {
                this.startComponent(nextProps.visibility);
                // 在关闭时，获取到选择的时间，然后先计算对应的dayList的状态
                if (!nextProps.visibility) {
                    requestAnimationFrame(function () {
                        _this2.resetAllData(nextProps);
                    });
                }
                return true;
            }

            return false;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {

            //改变日历范围
            if (nextProps.startTime && nextProps.endTime) {
                var newStart = (0, _arrayToDate.startArrayToDate)(nextProps.startTime).getTime(),
                    newEnd = (0, _arrayToDate.endArrayToDate)(nextProps.endTime, nextProps.startTime).getTime(),
                    oldStart = this.state.startTime.getTime(),
                    oldEnd = this.state.endTime.getTime();

                //改变时间范围
                if (newStart != oldStart || newEnd != oldEnd) {
                    var initStartTime = (0, _arrayToDate.startArrayToDate)(nextProps.startTime),
                        initEndTime = (0, _arrayToDate.endArrayToDate)(nextProps.endTime, nextProps.startTime),
                        dayList = (0, _setDayList2.default)(initStartTime, initEndTime, null, null);

                    this.setState({
                        pickupTime: (0, _dateTool.setTime)(null, this.props.defaultTime),
                        returnTime: (0, _dateTool.setTime)(null, this.props.defaultTime),
                        pickupDay: null,
                        returnDay: null,
                        pickupID: null,
                        returnID: null,
                        dayCount: null,
                        startTime: initStartTime,
                        endTime: initEndTime,
                        dayList: dayList,
                        JSXElem: (0, _createElem2.default)(JSON.parse(JSON.stringify(dayList)))
                    });
                }
            }
        }

        //重新计算所有参数

    }, {
        key: 'resetAllData',
        value: function resetAllData(nextProps) {
            var newPickupTime = nextProps.pickupTime ? (0, _format2.default)(nextProps.pickupTime) : null,
                oldPickupTime = this.props.pickupTime ? (0, _format2.default)(this.props.pickupTime) : null,
                newReturnTime = nextProps.returnTime ? (0, _format2.default)(nextProps.returnTime) : null,
                oldReturnTime = this.props.returnTime ? (0, _format2.default)(this.props.returnTime) : null,
                pickupTime = (0, _dateTool.setTime)(nextProps.pickupTime, nextProps.defaultTime),
                pickupDay = (0, _dateTool.setDay)(nextProps.pickupTime),
                returnTime = (0, _dateTool.setTime)(nextProps.returnTime, nextProps.defaultTime),
                returnDay = (0, _dateTool.setDay)(nextProps.returnTime),
                dayList = (0, _setDayList2.default)(this.state.startTime, this.state.endTime, pickupDay, returnDay);

            var pickupInfo = pickupDay ? (0, _format2.default)(pickupDay) : null,
                returnInfo = returnDay ? (0, _format2.default)(returnDay) : null;

            this.setState({
                dayList: dayList,
                JSXElem: (0, _createElem2.default)(JSON.parse(JSON.stringify(dayList))),
                pickupTime: pickupTime,
                returnTime: returnTime,
                pickupDay: pickupDay,
                returnDay: returnDay,
                dayCount: pickupDay && returnDay ? (0, _dateTool.setDayCount)(pickupDay, returnDay) : null,
                pickupID: pickupInfo ? 't-' + pickupInfo.year + '-' + pickupInfo.month + '-' + pickupInfo.day : null,
                returnID: returnInfo ? 't-' + returnInfo.year + '-' + returnInfo.month + '-' + returnInfo.day : null
            });
        }
    }, {
        key: 'startComponent',
        value: function startComponent(isShow) {
            if (isShow) {
                this.show();
            } else {
                this.hide();
            }
        }
    }, {
        key: 'show',
        value: function show() {
            var _props = this.props,
                _confirmEvent = _props.confirmEvent,
                _closeEvent = _props.closeEvent,
                defaultTime = _props.defaultTime,
                timeRange = _props.timeRange;


            _index2.default.show(_react2.default.createElement(_index4.default, {
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                dayList: this.state.dayList,
                pickupTime: this.state.pickupTime,
                returnTime: this.state.returnTime,
                pickupDay: this.state.pickupDay,
                returnDay: this.state.returnDay,
                dayCount: this.state.dayCount,
                defaultTime: defaultTime,
                timeRange: timeRange,
                pickupID: this.state.pickupID,
                returnID: this.state.returnID,
                JSXElem: this.state.JSXElem,
                confirmEvent: function confirmEvent(opt) {
                    _confirmEvent(opt);
                },
                closeEvent: function closeEvent() {
                    _closeEvent && _closeEvent();
                }
            }), {
                direction: 'bottom',
                title: '选择当地取还车时间',
                titleBtn: {
                    right: {
                        isShow: false
                    },
                    left: {
                        name: _react2.default.createElement('i', { className: 'iconfont-goback' })
                    }
                },
                style: {
                    height: '100%'
                },
                confirm: function confirm() {
                    if (_confirmEvent) {
                        _confirmEvent();
                    }
                },
                close: function close() {
                    if (_closeEvent) {
                        _closeEvent();
                    }
                },
                afterConfirm: function afterConfirm() {}
            });
        }
    }, {
        key: 'hide',
        value: function hide() {
            _index2.default.hide();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.props.children
            );
        }
    }]);

    return Picker;
}(_react.Component);

exports.default = Picker;