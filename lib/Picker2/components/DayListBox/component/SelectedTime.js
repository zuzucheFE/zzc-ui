'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getWeek = require('../../../tool/getWeek');

var _getWeek2 = _interopRequireDefault(_getWeek);

var _Event = require('../../../../tool/Event');

var _Event2 = _interopRequireDefault(_Event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by lamho on 2017/4/6.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var SelectedTime = function (_Component) {
    _inherits(SelectedTime, _Component);

    function SelectedTime(props) {
        _classCallCheck(this, SelectedTime);

        var _this = _possibleConstructorReturn(this, (SelectedTime.__proto__ || Object.getPrototypeOf(SelectedTime)).call(this, props));

        _this.state = {
            currDay: _this.props.day,
            nextDay: _this.props.day,
            currTime: _this.props.time,
            nextTime: _this.props.time,
            animateEvent: null
        };

        return _this;
    }

    _createClass(SelectedTime, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {

            var stateNextDay = new Date(nextState.nextDay).getTime(),
                stateCurrDay = new Date(this.state.currDay).getTime();

            if (stateNextDay == stateCurrDay) {
                return false;
            }
            return true;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {

            //需要重新去计算最新的时间和日期的时间对象，否则会出现bug
            this.setState({
                nextDay: nextProps.day ? new Date(new Date(new Date(nextProps.day).setHours(nextProps.time.h)).setMinutes(nextProps.time.m)) : null,
                nextTime: nextProps.time
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var fn = this.animateBoxAnimateCallBack.bind(this);
            this.setState({
                animateEvent: fn
            }, function () {
                _Event2.default.addEndEventListener(_this2.refs.timeAnimateBox, _this2.state.animateEvent);
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var animateBox = this.refs.timeAnimateBox;
            animateBox.className = 't-animate-box zzc-animation-up-slide in';
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _Event2.default.removeEndEventListener(this.refs.timeAnimateBox, this.state.animateEvent);
        }
    }, {
        key: 'animateBoxAnimateCallBack',
        value: function animateBoxAnimateCallBack() {
            var animateBox = this.refs.timeAnimateBox;

            this.setState({
                currDay: this.state.nextDay,
                currTime: this.state.nextTime
            }, function () {
                animateBox.className = 't-animate-box';
            });
        }
    }, {
        key: 'setTimeInfoContent',
        value: function setTimeInfoContent(title, placeholder) {

            var currDateDay = null,
                currMonth = null,
                currDate = null,
                currWeek = null,
                nextDateDay = null,
                nextMonth = null,
                nextDate = null,
                nextWeek = null;

            if (!!this.state.currDay) {
                currDateDay = new Date(this.state.currDay);
                currMonth = currDateDay.getMonth() + 1;
                currDate = currDateDay.getDate();
                currWeek = currDateDay.getDay();
            }

            if (!!this.state.nextDay) {
                nextDateDay = new Date(this.state.nextDay);
                nextMonth = nextDateDay.getMonth() + 1;
                nextDate = nextDateDay.getDate();
                nextWeek = nextDateDay.getDay();
            }

            return _react2.default.createElement(
                'div',
                { className: 't-animate-box', ref: 'timeAnimateBox' },
                _react2.default.createElement(
                    'div',
                    { className: 't-time-box', ref: 'currBox' },
                    !!this.state.currDay ? _react2.default.createElement(
                        'div',
                        { className: 't-time-info' },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 't-day' },
                                currMonth,
                                '\u6708',
                                currDate,
                                '\u65E5'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 't-time' },
                                this.state.currTime.h + ':' + this.state.currTime.m
                            )
                        )
                    ) : _react2.default.createElement(
                        'div',
                        { className: 't-time-box' },
                        _react2.default.createElement(
                            'div',
                            { className: 't-placeholder' },
                            _react2.default.createElement(
                                'p',
                                null,
                                placeholder
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 't-time-box', ref: 'nextBox' },
                    !!this.state.nextDay ? _react2.default.createElement(
                        'div',
                        { className: 't-time-info' },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'span',
                                { className: 't-day' },
                                nextMonth,
                                '\u6708',
                                nextDate,
                                '\u65E5'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 't-time' },
                                this.state.nextTime.h + ':' + this.state.nextTime.m
                            )
                        )
                    ) : _react2.default.createElement(
                        'div',
                        { className: 't-time-box' },
                        _react2.default.createElement(
                            'div',
                            { className: 't-placeholder' },
                            _react2.default.createElement(
                                'p',
                                null,
                                placeholder
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var boxClassName = this.props.class,
                _props = this.props,
                title = _props.title,
                placeholder = _props.placeholder,
                time = _props.time;


            return _react2.default.createElement(
                'div',
                { className: boxClassName },
                this.setTimeInfoContent(title, placeholder, time)
            );
        }
    }]);

    return SelectedTime;
}(_react.Component);

exports.default = SelectedTime;