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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by lamho on 2017/3/28.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Dialog = function (_Component) {
    _inherits(Dialog, _Component);

    function Dialog(props) {
        _classCallCheck(this, Dialog);

        return _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props));
    }

    _createClass(Dialog, [{
        key: 'clickConfirm',
        value: function clickConfirm() {
            var _this = this;
            this.props.confirm || function () {};
            if (typeof _this.props.afterConfirm == 'function') {

                this.props.afterConfirm() && function () {
                    _this.props.confirm();
                }();
            } else {
                _this.props.confirm();
            }
        }
    }, {
        key: 'clickCancel',
        value: function clickCancel() {
            var _this = this;
            _this.props.close();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                title = _props.title,
                defaultTitleBtn = _props.defaultTitleBtn,
                btnOpt = defaultTitleBtn ? defaultTitleBtn : {
                left: {
                    name: '取消',
                    isShow: true
                },
                right: {
                    name: '确定',
                    isShow: true
                }
            };


            return _react2.default.createElement(
                'div',
                { className: 'zzc-dialog' },
                !!title && _react2.default.createElement(
                    'div',
                    { className: 'zzc-dialog-title-box' },
                    _react2.default.createElement(
                        'div',
                        { className: 'zzc-dialog-title' },
                        btnOpt.left.isShow && _react2.default.createElement(
                            'div',
                            {
                                onClick: this.clickCancel.bind(this),
                                style: btnOpt.left.style && btnOpt.left.style,
                                className: 'zzc-dialog-btn' },
                            btnOpt.left.name
                        ),
                        _react2.default.createElement(
                            'h5',
                            null,
                            title
                        ),
                        btnOpt.right.isShow && _react2.default.createElement(
                            'div',
                            {
                                onClick: this.clickConfirm.bind(this),
                                style: btnOpt.right.style && btnOpt.right.style,
                                className: 'zzc-dialog-btn confirm' },
                            btnOpt.right.name
                        )
                    ),
                    _react2.default.createElement('div', { className: 'zzc-dialog-title-perch' })
                ),
                this.props.children
            );
        }
    }]);

    return Dialog;
}(_react.Component);

exports.default = Dialog;