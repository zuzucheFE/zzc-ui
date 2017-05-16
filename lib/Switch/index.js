'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Switch = function (_Component) {
    _inherits(Switch, _Component);

    function Switch(props) {
        _classCallCheck(this, Switch);

        var _this = _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).call(this, props));

        _this.state = {
            isOpen: _this.props.defaultStyle ? _this.props.defaultStyle : false,
            isDisabled: _this.props.disabled ? true : false
        };
        return _this;
    }

    _createClass(Switch, [{
        key: 'toggleSwitch',
        value: function toggleSwitch() {
            var _this2 = this;

            if (!this.state.isDisabled) {
                this.setState({
                    isOpen: !this.state.isOpen
                }, function () {
                    _this2.props.onClick(_this2.state.isOpen);
                });
            }
        }
    }, {
        key: 'setClass',
        value: function setClass() {
            if (this.state.isDisabled) {
                return this.state.isOpen ? 'switch-box switch-disabled open' : 'switch-box switch-disabled close';
            } else {
                return this.state.isOpen ? 'switch-box open' : 'switch-box close';
            }
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'div',
                {
                    onClick: this.toggleSwitch.bind(this),
                    className: this.setClass()
                },
                _react2.default.createElement('div', { className: 'round' })
            );
        }
    }]);

    return Switch;
}(_react.Component);

exports.default = Switch;