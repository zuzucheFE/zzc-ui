'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Event = require('../../../tool/Event');

var _Event2 = _interopRequireDefault(_Event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function base() {

    this.elem = null;
    this.duration = null;
    this.onClose = null;
    this.currState = 'hidden';
    this.targetParent = null;
    this.transactionEndFn = null;

    this.toastChange = function (elem, duration, onClose, targetParent) {

        this.elem = elem;
        this.duration = duration;
        this.onClose = onClose;
        this.targetParent = targetParent ? targetParent : null;
        this.transactionEndFn = this._elemTransitionend.bind(this);

        _Event2.default.addEndEventListener(this.elem, this.transactionEndFn);

        this.currState = 'show';
        this.elem.className = 'toast-box show';
    };

    //关闭
    this._closeInfo = function (_this) {
        _this.elem.className = 'toast-box';
        _this.currState = 'hidden';
    };

    //删除
    this._removeInfo = function (_this) {
        _reactDom2.default.unmountComponentAtNode(_this.elem);
        _this.targetParent.removeChild(_this.elem);
        _this.onClose();
    };

    this._elemTransitionend = function () {
        var _this2 = this;

        if (this.currState == 'show') {
            setTimeout(function () {
                _this2._closeInfo(_this2);
            }, this.duration);
        } else {
            _Event2.default.removeEndEventListener(this.elem, this.transactionEndFn);
            this._removeInfo(this);
        }
    };
}

exports.default = base;