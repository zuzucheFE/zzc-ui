'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../../Tooltip/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by lamho on 2017/4/12.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


function isMobile() {
    var sUserAgent = navigator.userAgent.toLowerCase(),
        bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
        bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os",
        bIsMidp = sUserAgent.match(/midp/i) == "midp",
        bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
        bIsUc = sUserAgent.match(/ucweb/i) == "ucweb",
        bIsAndroid = sUserAgent.match(/android/i) == "android",
        bIsCE = sUserAgent.match(/windows ce/i) == "windows ce",
        bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile",
        bIsWebview = sUserAgent.match(/webview/i) == "webview";
    return bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM;
}

var Range = function (_Component) {
    _inherits(Range, _Component);

    function Range(props) {
        _classCallCheck(this, Range);

        var _this = _possibleConstructorReturn(this, (Range.__proto__ || Object.getPrototypeOf(Range)).call(this, props));

        _this.state = {
            maxSlideWidth: null, //最大滑动距离
            timeArr: [], //时间数组
            start: !!props.timeRange ? props.timeRange.start : 0, //开始范围
            end: !!props.timeRange ? props.timeRange.end : 24, //结束范围
            currTime: props.time.h + ':' + props.time.m, //当前时间
            currSlideWidth: '', //当前滑动到的时间
            startX: 0, //上一次滚动的位置
            btnClass: 'range-btn', //控制btn的样式
            isActive: false,
            touchStartEvent: null,
            touchMoveEvent: null,
            touchEndEvent: null
        };

        return _this;
    }

    _createClass(Range, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {

            if (nextState.currSlideWidth != this.state.currSlideWidth) {
                return true;
            }
            if (nextState.currTime != this.state.currTime) {
                return true;
            }
            if (nextState.startX != this.state.startX) {
                return true;
            }
            if (nextState.btnClass != this.state.btnClass) {
                return true;
            }
            if (nextState.isActive != this.state.isActive) {
                return true;
            }
            return false;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var btnWidth = parseFloat(window.getComputedStyle(this.refs.btn).width),
                rangeContentWidth = parseFloat(window.getComputedStyle(this.refs.content).width);

            this.setState({
                timeArr: this.setTimeArr(rangeContentWidth - btnWidth),
                maxSlideWidth: rangeContentWidth - btnWidth,
                touchStartEvent: this.touchStart.bind(this),
                touchMoveEvent: this.touchMove.bind(this),
                touchEndEvent: this.touchEnd.bind(this),
                mouseDownEvent: this.mouseDown.bind(this),
                mouseMoveEvent: this.mouseMove.bind(this),
                mouseUpEvent: this.mouseUp.bind(this)
            }, function () {
                _this2.setDefaultTime();

                if (isMobile()) {
                    _this2.refs.btn.addEventListener('touchstart', _this2.state.touchStartEvent);

                    _this2.refs.btn.addEventListener('touchmove', _this2.state.touchMoveEvent);

                    _this2.refs.btn.addEventListener('touchend', _this2.state.touchEndEvent);
                } else {
                    _this2.refs.btn.addEventListener('mousedown', _this2.state.mouseDownEvent);
                    _this2.refs.btn.addEventListener('mouseup', _this2.state.mouseUpEvent);
                }
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (isMobile()) {
                this.refs.btn.removeEventListener('touchstart', this.state.touchStartEvent);

                this.refs.btn.removeEventListener('touchmove', this.state.touchMoveEvent);

                this.refs.btn.removeEventListener('touchend', this.state.touchEndEvent);
            } else {
                this.refs.btn.removeEventListener('mousedown', this.state.mouseDownEvent);
                this.refs.btn.removeEventListener('mouseup', this.state.mouseUpEvent);
            }
        }
    }, {
        key: 'touchStart',
        value: function touchStart(event) {

            event.preventDefault();

            //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
            if (this.props.synchronizationReturnTimeStart && this.props.isSynchronization) {
                this.props.synchronizationReturnTimeStart({
                    startX: event.targetTouches[0].pageX,
                    btnClass: 'range-btn active',
                    isActive: true
                });
            }

            this.setState({
                startX: event.targetTouches[0].pageX,
                btnClass: 'range-btn active',
                isActive: true
            });
        }
    }, {
        key: 'mouseDown',
        value: function mouseDown(event) {
            event.preventDefault();
            //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
            if (this.props.synchronizationReturnTimeStart && this.props.isSynchronization) {
                this.props.synchronizationReturnTimeStart({
                    startX: event.pageX,
                    btnClass: 'range-btn active',
                    isActive: true
                });
            }

            this.setState({
                startX: event.pageX,
                btnClass: 'range-btn active',
                isActive: true
            });

            this.refs.btn.addEventListener('mousemove', this.state.mouseMoveEvent);
        }
    }, {
        key: 'touchMove',
        value: function touchMove(event) {

            event.preventDefault();

            var currX = event.changedTouches[0].clientX - this.state.startX,
                currBtnTransform = parseFloat(this.refs.btnBox.style.webkitTransform.split('(')[1].split(')')[0]),
                nextX = currBtnTransform + currX;

            //当注定更改还车时间选择的时候，将不再同步
            if (this.props.isSynchronization && this.props.type == 'return') {
                this.props.changeSynchronization(false);
            }

            if (nextX <= 0) {
                //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
                if (this.props.synchronizationReturnTimeMove && this.props.isSynchronization) {
                    this.props.synchronizationReturnTimeMove({
                        currSlideWidth: 0,
                        currTime: this.state.timeArr[0].content
                    }, null);
                }
                this.setState({
                    currSlideWidth: 0,
                    currTime: this.state.timeArr[0].content
                });
                return false;
            }

            if (nextX > this.state.maxSlideWidth) {
                //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
                if (this.props.synchronizationReturnTimeMove && this.props.isSynchronization) {
                    this.props.synchronizationReturnTimeMove({
                        currTime: this.state.timeArr[this.state.timeArr.length - 1].content,
                        currSlideWidth: this.state.maxSlideWidth
                    }, null);
                }
                this.setState({
                    currTime: this.state.timeArr[this.state.timeArr.length - 1].content,
                    currSlideWidth: this.state.maxSlideWidth
                });
                return false;
            }

            this.getCurrTime(nextX);

            //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
            if (this.props.synchronizationReturnTimeMove && this.props.isSynchronization) {
                this.props.synchronizationReturnTimeMove({
                    startX: event.changedTouches[0].clientX,
                    currSlideWidth: nextX
                }, nextX);
            }
            this.setState({
                startX: event.changedTouches[0].clientX,
                currSlideWidth: nextX
            });
        }
    }, {
        key: 'mouseMove',
        value: function mouseMove(event) {

            event.preventDefault();

            var currX = event.pageX - this.state.startX,
                currBtnTransform = parseFloat(this.refs.btnBox.style.webkitTransform.split('(')[1].split(')')[0]),
                nextX = currBtnTransform + currX;

            //当注定更改还车时间选择的时候，将不再同步
            if (this.props.isSynchronization && this.props.type == 'return') {
                this.props.changeSynchronization(false);
            }

            if (nextX <= 0) {
                //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
                if (this.props.synchronizationReturnTimeMove && this.props.isSynchronization) {
                    this.props.synchronizationReturnTimeMove({
                        currSlideWidth: 0,
                        currTime: this.state.timeArr[0].content
                    }, null);
                }
                this.setState({
                    currSlideWidth: 0,
                    currTime: this.state.timeArr[0].content
                });
                return false;
            }

            if (nextX > this.state.maxSlideWidth) {
                //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
                if (this.props.synchronizationReturnTimeMove && this.props.isSynchronization) {
                    this.props.synchronizationReturnTimeMove({
                        currTime: this.state.timeArr[this.state.timeArr.length - 1].content,
                        currSlideWidth: this.state.maxSlideWidth
                    }, null);
                }
                this.setState({
                    currTime: this.state.timeArr[this.state.timeArr.length - 1].content,
                    currSlideWidth: this.state.maxSlideWidth
                });
                return false;
            }

            this.getCurrTime(nextX);

            //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
            if (this.props.synchronizationReturnTimeMove && this.props.isSynchronization) {
                this.props.synchronizationReturnTimeMove({
                    startX: event.pageX,
                    currSlideWidth: nextX
                }, nextX);
            }
            this.setState({
                startX: event.pageX,
                currSlideWidth: nextX
            });
        }
    }, {
        key: 'touchEnd',
        value: function touchEnd(event) {
            var _this3 = this;

            event.preventDefault();

            //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
            if (this.props.synchronizationReturnTimeEnd && this.props.isSynchronization) {
                this.props.synchronizationReturnTimeEnd({
                    btnClass: 'range-btn',
                    isActive: false
                });
            }

            this.setState({
                btnClass: 'range-btn',
                isActive: false
            }, function () {
                _this3.props.selectTime(_this3.state.currTime, _this3.props.type);
            });
        }
    }, {
        key: 'mouseUp',
        value: function mouseUp(event) {
            var _this4 = this;

            event.preventDefault();
            this.refs.btn.removeEventListener('mousemove', this.state.mouseMoveEvent);

            //如果有传同步时间函数则在滑动时执行同步函数同步到还车时间选择框中
            if (this.props.synchronizationReturnTimeEnd && this.props.isSynchronization) {
                this.props.synchronizationReturnTimeEnd({
                    btnClass: 'range-btn',
                    isActive: false
                });
            }

            this.setState({
                btnClass: 'range-btn',
                isActive: false
            }, function () {
                _this4.props.selectTime(_this4.state.currTime, _this4.props.type);
            });
        }

        //被同步的响应函数

    }, {
        key: 'synchronizationReturnTimeStart',
        value: function synchronizationReturnTimeStart(startData) {
            if (this.props.type == 'return') {
                this.setState(startData);
            }
        }
    }, {
        key: 'synchronizationReturnTimeMove',
        value: function synchronizationReturnTimeMove(moveData, nextX) {
            if (this.props.type == 'return') {

                if (nextX) {
                    this.getCurrTime(nextX);
                }
                this.setState(moveData);
            }
        }
    }, {
        key: 'synchronizationReturnTimeEnd',
        value: function synchronizationReturnTimeEnd(endData) {
            var _this5 = this;

            if (this.props.type == 'return') {
                this.setState(endData, function () {
                    _this5.props.selectTime(_this5.state.currTime, _this5.props.type);
                });
            }
        }

        //滚动时获取对应的时间

    }, {
        key: 'getCurrTime',
        value: function getCurrTime(nextX) {
            var timeArr = this.state.timeArr,
                currXEstimateIndex = parseInt(nextX / (this.state.maxSlideWidth / timeArr.length));

            if (!timeArr[currXEstimateIndex] || this.state.currTime == timeArr[currXEstimateIndex].content) {
                return false;
            } else {
                this.setState({
                    currTime: timeArr[currXEstimateIndex].content
                });
            }
        }

        //设置默认滑动时间框的位置

    }, {
        key: 'setDefaultTime',
        value: function setDefaultTime() {

            var curr = this.state.currTime,
                hour = curr.split(':')[0],
                minute = curr.split(':')[1],
                timeArr = this.state.timeArr,
                len = timeArr.length,
                targetTime = null;

            for (var i = 0; i < len; i++) {
                var targetHour = timeArr[i].content.split(':')[0],
                    targetMinute = timeArr[i].content.split(':')[1];

                if (targetHour == hour && targetMinute == minute) {
                    targetTime = timeArr[i];
                    break;
                }
            }

            this.setState({
                currSlideWidth: targetTime.width
            });
        }

        //计算传入的时间范围组成对应每一部的距离和时间

    }, {
        key: 'setTimeArr',
        value: function setTimeArr(totalSlideWidth) {
            var step = this.state.start == 0 ? (this.state.end - this.state.start) * 2 : (this.state.end - this.state.start) * 2 + 1,
                stepWidth = totalSlideWidth / (step - 1),
                //因为第一个时间为0.所以不做计算，所以应该算少一次
            arr = [],
                hour = this.state.start;

            for (var i = 0; i < step; i) {
                //第一个时间为0，不做计算
                if (i == 0) {
                    arr.push({
                        content: hour + ':00',
                        width: 0
                    });
                } else {
                    arr.push({
                        content: hour + ':00',
                        width: stepWidth * i
                    });
                }
                i++;
                if (i < step) {
                    arr.push({
                        content: hour + ':30',
                        width: stepWidth * i
                    });
                    hour++;
                    i++;
                }
            }
            return arr;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                title = _props.title,
                rangeType = _props.rangeType;


            return _react2.default.createElement(
                'div',
                { className: 'range-box' },
                _react2.default.createElement('i', null),
                _react2.default.createElement(
                    'p',
                    { className: 'title' },
                    title
                ),
                _react2.default.createElement(
                    'section',
                    { className: 'range-content', ref: 'content' },
                    _react2.default.createElement('div', { className: 'range-content-bg' }),
                    _react2.default.createElement(
                        'div',
                        { className: 'range-btn-box', style: {
                                transform: 'translateX(' + this.state.currSlideWidth + 'px)',
                                webkitTransform: 'translateX(' + this.state.currSlideWidth + 'px)'
                            }, ref: 'btnBox' },
                        _react2.default.createElement(
                            'div',
                            { className: this.state.btnClass, ref: 'btn' },
                            this.state.currTime,
                            _react2.default.createElement(_index2.default, {
                                isShow: this.state.isActive,
                                content: '' + this.state.currTime + rangeType
                            })
                        ),
                        _react2.default.createElement('div', { className: 'range-btn-bg' })
                    )
                ),
                _react2.default.createElement('i', null)
            );
        }
    }]);

    return Range;
}(_react.Component);

exports.default = Range;