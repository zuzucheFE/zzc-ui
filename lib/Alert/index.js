"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var title = (arguments.length <= 0 ? undefined : arguments[0]) || '';
    var content = arguments.length <= 1 ? undefined : arguments[1];
    var actions = (arguments.length <= 2 ? undefined : arguments[2]) || [{ text: '确定' }];
    var parentElem = (arguments.length <= 3 ? undefined : arguments[3]) || 'body'; //将元素插入到什么元素,默认body

    var box = void 0;

    if (!content || content == '') {
        console.error('请输入内容!');
        return;
    }

    var div = document.createElement('div');
    div.className = 'zzc-alert-box';
    parentElem == 'body' ? document.body.appendChild(div) : document.querySelector(parentElem).appendChild(div);

    function close() {
        var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

        box.className = 'zzc-alert-content';
        setTimeout(function () {
            var alertBox = document.querySelector('.zzc-alert-box');
            if (alertBox) {
                var parentNode = alertBox.parentNode;
                parentNode.removeChild(alertBox);
                _reactDom2.default.unmountComponentAtNode(div);
                callback();
            }
        }, 100);
    }

    function show() {
        document.querySelector('.zzc-alert-mark').className = 'zzc-alert-mark show';
        box = document.querySelector('.zzc-alert-content');
        box.className = 'zzc-alert-content show';
    }

    function _setButton(actions) {

        var elemArr = [];

        if (actions.length == 1) {

            var button = actions[0];
            var orginPress = button.onPress || function () {};

            elemArr.push(_react2.default.createElement(
                "button",
                {
                    className: "singles",
                    style: button.style ? button.style : {},
                    onClick: function onClick() {
                        close();
                        orginPress();
                    }
                },
                button.text
            ));
        } else {
            elemArr = actions.map(function (button, i) {

                var orginPress = button.onPress || function () {};

                return _react2.default.createElement(
                    "button",
                    {
                        key: i + "-" + new Date().getTime(),
                        style: button.style ? button.style : {},
                        onClick: function onClick() {
                            close();
                            orginPress();
                        }
                    },
                    button.text
                );
            });
        }

        return elemArr;
    }

    _reactDom2.default.render(_react2.default.createElement(
        "div",
        { className: "zzc-alert" },
        _react2.default.createElement("div", { className: "zzc-alert-mark" }),
        _react2.default.createElement(
            "div",
            { className: "zzc-alert-box", onClick: function onClick() {
                    close();
                } },
            _react2.default.createElement(
                "div",
                { className: "zzc-alert-content" },
                title == '' ? '' : _react2.default.createElement(
                    "h2",
                    { className: "zzc-alert-header" },
                    title
                ),
                _react2.default.createElement(
                    "div",
                    { className: "zzc-alert-body" },
                    content
                ),
                _react2.default.createElement(
                    "div",
                    { className: "zzc-alert-footer" },
                    _react2.default.createElement(
                        "div",
                        { className: "zzc-alert-buttonGroup" },
                        _setButton(actions)
                    )
                )
            )
        )
    ), div);

    setTimeout(function () {
        show();
    }, 100);

    return {
        close: close
    };
};

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }