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
function info(opt) {

    if (document.querySelector('.toast-box')) {
        return false;
    }

    var content = opt.content,
        duration = opt.duration || 3000,
        onClose = opt.callBack && opt.callBack instanceof Function ? opt.callBack : function () {},
        targetParent = opt.targetParent || document.body,
        elem = document.createElement('div'),
        zIndex = opt.zIndex || 999;

    elem.className = 'toast-box';
    elem.style.zIndex = zIndex;
    targetParent.appendChild(elem);

    _reactDom2.default.render(_react2.default.createElement(
        "div",
        { className: "toast-content" },
        _react2.default.createElement("p", { dangerouslySetInnerHTML: { __html: content } })
    ), elem);

    setTimeout(function () {
        info.prototype.toastChange(elem, duration, onClose, targetParent);
    }, 100);
}

info.prototype = new _base2.default();

exports.default = info;