'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var rowNo = 1;

var DateListItem = function (_Component) {
    _inherits(DateListItem, _Component);

    function DateListItem(props) {
        _classCallCheck(this, DateListItem);

        return _possibleConstructorReturn(this, (DateListItem.__proto__ || Object.getPrototypeOf(DateListItem)).call(this, props));
    }

    _createClass(DateListItem, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (rowNo != 1) {
                rowNo = 1;
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            return false;
        }
    }, {
        key: 'setUlClass',
        value: function setUlClass(currRow) {
            var isActive = false,
                isStart = false,
                isEnd = false,
                startNo = null,
                endNo = null;

            for (var i = 7; i; i--) {
                if (currRow[i - 1].isActive) {
                    isActive = true;
                }
                if (currRow[i - 1].isStart) {
                    isActive = true;
                    isStart = true;
                    startNo = i;
                }
                if (currRow[i - 1].isEnd) {
                    isActive = true;
                    isEnd = true;
                    endNo = i;
                }
            }

            if (!isActive) {
                return '';
            }

            //取还车同一行并且不是同一天取还车
            if (isStart && isEnd && startNo != endNo) {
                var diff = endNo - startNo - 1,
                    className = '',
                    currNo = startNo + 1;
                for (var k = 0; k < diff; k++) {
                    className += ' row-' + currNo;
                    currNo++;
                }
                return className;
            }

            //取还车同一天
            if (isStart && isEnd && startNo == endNo) {
                return '';
            }

            //取车日期的行
            if (isStart && isActive) {
                return 's-row-' + (7 - startNo);
            }

            //还车日期的行
            if (isEnd && isActive) {
                return 'e-row-' + (endNo - 1);
            }

            //整行active
            if (isActive) {
                return 'full';
            }
        }
    }, {
        key: 'setLiClass',
        value: function setLiClass(isGone, isBefore, isStart, isEnd, isActive) {
            var className = '';

            if (isGone) {
                className += ' gone ';
            }

            if (isStart) {
                className += isBefore ? ' start before ' : ' start ';
            }

            if (isEnd) {
                className += isBefore ? ' end before ' : ' end ';
            }

            //如果是当天去还车就特殊处理重定className的值
            if (isStart && isEnd) {
                className = 'start end';
            }

            return className;
        }

        //设置li所有的属性

    }, {
        key: 'setLiAttribute',
        value: function setLiAttribute(data, currData, colume) {
            return _react2.default.createElement(
                'li',
                { id: currData.date != '' ? 't-' + data.year + '-' + data.month + '-' + currData.date : '',
                    className: this.setLiClass(currData.isGone, currData.isBefore, currData.isStart, currData.isEnd, currData.isActive),
                    'data-colume': colume
                },
                _react2.default.createElement(
                    'span',
                    { 'data-gone': currData.isGone ? '1' : '0',
                        'data-year': data.year,
                        'data-month': data.month,
                        'data-date': currData.date
                    },
                    currData.content,
                    this.setTips(currData.isStart, currData.isEnd)
                )
            );
        }

        //设置取还车tips

    }, {
        key: 'setTips',
        value: function setTips(isStart, isEnd) {
            if (isStart && isEnd) {
                return _react2.default.createElement(
                    'i',
                    { id: 'start-end-tips' },
                    '\u53D6\u8FD8\u8F66'
                );
            } else if (isStart) {
                return _react2.default.createElement(
                    'i',
                    { id: 'start-tips' },
                    '\u53D6\u8F66'
                );
            } else if (isEnd) {
                return _react2.default.createElement(
                    'i',
                    { id: 'end-tips' },
                    '\u8FD8\u8F66'
                );
            }
        }
    }, {
        key: 'createDateItemList',
        value: function createDateItemList(data) {
            var list = data.dayList,
                row = list.length / 7,
                itemListJSXElement = [];

            for (var i = 0; i < row; i++) {
                var currRow = list.splice(0, 7),
                    currRowJSXElement = _react2.default.createElement(
                    'ul',
                    { 'data-row': rowNo, className: this.setUlClass(currRow) },
                    this.setLiAttribute(data, currRow[0], 1),
                    this.setLiAttribute(data, currRow[1], 2),
                    this.setLiAttribute(data, currRow[2], 3),
                    this.setLiAttribute(data, currRow[3], 4),
                    this.setLiAttribute(data, currRow[4], 5),
                    this.setLiAttribute(data, currRow[5], 6),
                    this.setLiAttribute(data, currRow[6], 7)
                );
                itemListJSXElement.push(currRowJSXElement);
                rowNo++;
            }

            return itemListJSXElement;
        }
    }, {
        key: 'render',
        value: function render() {
            var data = this.props.data;

            return _react2.default.createElement(
                'div',
                { className: 'day-item' },
                _react2.default.createElement(
                    'div',
                    { className: 'day-item-title' },
                    _react2.default.createElement(
                        'span',
                        null,
                        data.year,
                        '\u5E74'
                    ),
                    _react2.default.createElement(
                        'span',
                        null,
                        data.month,
                        '\u6708'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'day-item-content' },
                    this.createDateItemList(data)
                )
            );
        }
    }]);

    return DateListItem;
}(_react.Component);

exports.default = DateListItem;