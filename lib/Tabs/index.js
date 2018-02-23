'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by samciu on 16/12/22.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Tab = function (_PureComponent) {
    _inherits(Tab, _PureComponent);

    function Tab(props) {
        _classCallCheck(this, Tab);

        var _this = _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).call(this, props));

        _this.state = {
            currentIndex: _this.props.defaultIndex || 0
        };
        return _this;
    }

    _createClass(Tab, [{
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps) {
            this.setState({
                currentIndex: nextProps.defaultIndex
            });
        }
    }, {
        key: 'changeCurrentIndex',
        value: function changeCurrentIndex(index) {
            this.setState({ currentIndex: index });
            this.props.onChange && this.props.onChange(index);
        }
    }, {
        key: 'check_nav_index',
        value: function check_nav_index(index) {
            return index == this.state.currentIndex ? "nav-item active" : "nav-item";
        }
    }, {
        key: 'check_tab_index',
        value: function check_tab_index(index) {
            return index == this.state.currentIndex ? "tab-item show" : "tab-item";
        }
    }, {
        key: 'setStyle',
        value: function setStyle(index) {
            if (!!this.props.defaultColor && index == this.state.currentIndex) {
                return { color: this.props.defaultColor };
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'tabs' },
                _react2.default.createElement(
                    'nav',
                    { className: 'tab-nav' },
                    _react2.default.createElement(
                        'ul',
                        null,
                        _react2.default.Children.map(this.props.children, function (element, index) {
                            return _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'div',
                                    { onClick: function onClick() {
                                            _this2.changeCurrentIndex(index);
                                        }, className: _this2.check_nav_index(index) },
                                    _react2.default.createElement(
                                        'span',
                                        { style: _this2.setStyle(index) },
                                        element.props.name
                                    )
                                )
                            );
                        })
                    )
                ),
                _react2.default.createElement('div', { className: 'tab-placeholder' }),
                _react2.default.createElement(
                    'div',
                    { className: 'tabs-container' },
                    _react2.default.Children.map(this.props.children, function (element, index) {
                        return _react2.default.createElement(
                            'div',
                            { className: _this2.check_tab_index(index) },
                            element
                        );
                    })
                )
            );
        }
    }]);

    return Tab;
}(_react.PureComponent);

exports.default = Tab;