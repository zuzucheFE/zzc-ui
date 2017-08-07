'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.css');

var _Event = require('../../../tool/Event');

var _Event2 = _interopRequireDefault(_Event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by lamho on 2017/4/19.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var WarnSlideTip = function (_Component) {
    _inherits(WarnSlideTip, _Component);

    function WarnSlideTip(props) {
        _classCallCheck(this, WarnSlideTip);

        var _this = _possibleConstructorReturn(this, (WarnSlideTip.__proto__ || Object.getPrototypeOf(WarnSlideTip)).call(this, props));

        _this.state = {
            animateEvent: null
        };
        return _this;
    }

    _createClass(WarnSlideTip, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            var fn = this.warnSlideAnimateCallback.bind(this);
            this.setState({
                animateEvent: fn
            });
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            if (nextProps.isShow != this.props.isShow || nextProps.text != this.props.text) {
                return true;
            }

            return false;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            _Event2.default.addEndEventListener(this.refs.warnBox, this.state.animateEvent);
        }
    }, {
        key: 'warnSlideAnimateCallback',
        value: function warnSlideAnimateCallback() {
            _Event2.default.removeEndEventListener(this.refs.warnBox, this.state.animateEvent);
            if (this.props.isShow) {
                this.props.showedEvent();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                isShow = _props.isShow,
                text = _props.text;

            return _react2.default.createElement(
                'div',
                { ref: 'warnBox', className: isShow ? 'warn-slide-tip-box show' : 'warn-slide-tip-box' },
                _react2.default.createElement(
                    'p',
                    null,
                    text
                )
            );
        }
    }]);

    return WarnSlideTip;
}(_react.Component);

exports.default = WarnSlideTip;