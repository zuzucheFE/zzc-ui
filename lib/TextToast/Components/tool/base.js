'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function base() {

    this.elem = null;
    this.duration = null;
    this.onClose = null;
    this.currState = 'hidden';
    this.timer = null;

    this.toastChange = function (elem, duration, onClose, id, queue) {
        var _this2 = this;

        this.elem = elem;
        this.duration = duration;
        this.onClose = onClose;

        // this.elem.addEventListener('webkitAnimationEnd',() => {this._elemTransitionend(this)});
        this.elem.addEventListener('webkitTransitionEnd', function () {
            _this2._elemTransitionend(_this2);
        });
        this.currState = 'show';
        this.elem.className = 'textToast-box show';
    };

    this._closeInfo = function (_this) {
        _this.elem.className = 'textToast-box';
        _this.currState = 'hidden';
        clearTimeout(_this.timer);
        _this.timer = null;
    };

    this._removeInfo = function (_this) {
        _reactDom2.default.unmountComponentAtNode(_this.elem);
        document.body.removeChild(_this.elem);
        _this.onClose();
    };

    this._elemTransitionend = function (_this) {

        if (_this.currState == 'show') {
            this.timer = setTimeout(function () {
                _this._closeInfo(_this);
            }, _this.duration);
        } else {
            _this._removeInfo(_this);
        }
    };
}

exports.default = base;