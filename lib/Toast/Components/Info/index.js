"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _base = require("../tool/base");

var _base2 = _interopRequireDefault(_base);

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Lam on 17/1/24.
 */
function info() {
    for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
        arg[_key] = arguments[_key];
    }

    if (document.querySelector('.toast-box')) {
        var currToastBox = document.querySelector('.toast-box');
        clearTimeout(info.prototype.timer);
        info.prototype.timer = null;
        currToastBox.className = 'toast-box';
        setTimeout(function () {
            currToastBox.parentNode.removeChild(currToastBox);
            info.apply(undefined, arg);
        }, 200);
        return false;
    }

    var content = arg[0],
        duration = parseInt(arg[1] || 3000),
        onClose = arg[2] && arg[2] instanceof Function ? arg[2] : function () {},
        elem = document.createElement('div');

    elem.className = 'toast-box';
    document.body.appendChild(elem);

    _reactDom2.default.render(_react2.default.createElement(
        "div",
        { className: "toast-content" },
        _react2.default.createElement("p", { dangerouslySetInnerHTML: { __html: content } })
    ), elem);

    setTimeout(function () {
        document.querySelector('.textToast-box') && document.querySelector('.textToast-box').addEventListener('click', function () {
            info.prototype._closeInfo(info.prototype);
        });
        info.prototype.toastChange(elem, duration, onClose);
    }, 100);
}

info.prototype = new _base2.default();

exports.default = info;