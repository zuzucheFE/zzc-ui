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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by samciu on 16/12/23.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Modal = function (_Component) {
    _inherits(Modal, _Component);

    function Modal(props) {
        _classCallCheck(this, Modal);

        return _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));
    }

    _createClass(Modal, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _this2 = this;

            if (!this.refs.modalBox) {
                return false;
            }
            if (this.props.visible) {
                this.refs.modalBox.style.display = 'block';
                setTimeout(function () {
                    _this2.refs.modalMask.className = 'modal-mask show';
                    setTimeout(function () {
                        _this2.refs.modalWrap.className = 'modal-wrap show';
                        setTimeout(function () {
                            _this2.refs.modalContent.className = 'modal-content-box show';
                        }, 350);
                    }, 100);
                }, 14);
            } else {
                this.refs.modalBox.className = 'hide-modal';
                this.refs.modalWrap.className = 'modal-wrap';
                setTimeout(function () {
                    _this2.refs.modalMask.className = 'modal-mask';
                    setTimeout(function () {
                        _this2.refs.modalContent.className = 'modal-content-box';
                        _this2.refs.modalBox.style.display = 'none';
                    }, 100);
                }, 300);
            }
        }
    }, {
        key: 'setBtn',
        value: function setBtn(data) {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                { className: 'modal-btn-group' },
                data.map(function (item, key) {
                    return _react2.default.createElement(
                        'div',
                        { key: 'modal-btn-' + key + '-' + new Date().getTime(), style: item.style ? item.style : {}, className: 'modal-close', onClick: function onClick() {
                                item.click instanceof Function && item.click();
                                _this3.props.onCancel();
                            } },
                        item.btnText
                    );
                })
            );
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'div',
                { ref: 'modalBox', style: { display: 'none' } },
                _react2.default.createElement('div', { ref: 'modalMask', className: 'modal-mask' }),
                _react2.default.createElement(
                    'div',
                    { ref: 'modalWrap', className: 'modal-wrap' },
                    _react2.default.createElement('div', { className: 'modal-back', onClick: this.props.onCancel }),
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-content' },
                        typeof this.props.content == 'string' ? _react2.default.createElement('div', {
                            className: 'modal-content-box',
                            ref: 'modalContent',
                            dangerouslySetInnerHTML: { __html: this.props.content }
                        }) : _react2.default.createElement(
                            'div',
                            {
                                className: 'modal-content-box',
                                ref: 'modalContent'
                            },
                            this.props.content
                        ),
                        this.props.btn ? this.setBtn(this.props.btn) : _react2.default.createElement(
                            'div',
                            { className: 'modal-close', onClick: this.props.onCancel },
                            '\u5173\u95ED'
                        )
                    )
                )
            );
        }
    }]);

    return Modal;
}(_react.Component);

exports.default = Modal;