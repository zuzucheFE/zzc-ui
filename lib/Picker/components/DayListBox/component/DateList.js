'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DateListItem = require('./DateListItem.js');

var _DateListItem2 = _interopRequireDefault(_DateListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by lamho on 2017/3/30.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var DateList = function (_Component) {
    _inherits(DateList, _Component);

    function DateList(props) {
        _classCallCheck(this, DateList);

        return _possibleConstructorReturn(this, (DateList.__proto__ || Object.getPrototypeOf(DateList)).call(this, props));
    }

    //只有取还车日期不一样时才会去执行组件的计算


    _createClass(DateList, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {

            var newY = nextProps.pickupDay ? nextProps.pickupDay.getFullYear() : null,
                newM = nextProps.pickupDay ? nextProps.pickupDay.getMonth() : null,
                newD = nextProps.pickupDay ? nextProps.pickupDay.getDate() : null,
                oldY = this.props.pickupDay ? this.props.pickupDay.getFullYear() : null,
                oldM = this.props.pickupDay ? this.props.pickupDay.getMonth() : null,
                oldD = this.props.pickupDay ? this.props.pickupDay.getDate() : null;

            if (newY != oldY || newM != oldM || newD != oldD) {
                return true;
            }

            newY = nextProps.returnDay ? nextProps.returnDay.getFullYear() : null;
            newM = nextProps.returnDay ? nextProps.returnDay.getMonth() : null;
            newD = nextProps.returnDay ? nextProps.returnDay.getDate() : null;
            oldY = this.props.returnDay ? this.props.returnDay.getFullYear() : null;
            oldM = this.props.returnDay ? this.props.returnDay.getMonth() : null;
            oldD = this.props.returnDay ? this.props.returnDay.getDate() : null;

            if (newY != oldY || newM != oldM || newD != oldD) {
                return true;
            }

            return false;
        }
    }, {
        key: 'clickDay',
        value: function clickDay(year, month, date) {
            this.props.selectDay(new Date(year, month - 1, date));
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var startElem = document.querySelector('.day-list-box .start');
            if (startElem) {
                var startOffsetTop = startElem.offsetTop;
                setTimeout(function () {
                    document.querySelector('.day-list-box').scrollTop = startOffsetTop - _this2.props.topHeight;
                }, 100);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _props = this.props,
                startTime = _props.startTime,
                endTime = _props.endTime,
                pickupDay = _props.pickupDay,
                returnDay = _props.returnDay,
                dayList = _props.dayList;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var dayList = this.props.dayList;

            return _react2.default.createElement(
                'div',
                null,
                dayList.map(function (e, i) {
                    return _react2.default.createElement(_DateListItem2.default, { data: e, key: 'date-' + i, clickDay: _this3.clickDay.bind(_this3) });
                })
            );
        }
    }]);

    return DateList;
}(_react.Component);

exports.default = DateList;