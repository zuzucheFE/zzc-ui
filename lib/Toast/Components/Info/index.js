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

    if (document.querySelector('.toast-box')) {
        return false;
    }

    var content = arguments.length <= 0 ? undefined : arguments[0],
        duration = parseInt((arguments.length <= 1 ? undefined : arguments[1]) || 3000),
        onClose = (arguments.length <= 2 ? undefined : arguments[2]) && (arguments.length <= 2 ? undefined : arguments[2]) instanceof Function ? arguments.length <= 2 ? undefined : arguments[2] : function () {},
        elem = document.createElement('div');

    elem.className = 'toast-box';
    document.body.appendChild(elem);

    _reactDom2.default.render(_react2.default.createElement(
        "div",
        { className: "toast-content" },
        _react2.default.createElement("p", { dangerouslySetInnerHTML: { __html: content } })
    ), elem);

    setTimeout(function () {
        info.prototype.toastChange(elem, duration, onClose);
    }, 100);
}

info.prototype = new _base2.default();

exports.default = info;