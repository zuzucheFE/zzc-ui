"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by lamho on 2017/4/6.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var WeekList = function (_Component) {
    _inherits(WeekList, _Component);

    function WeekList(props) {
        _classCallCheck(this, WeekList);

        return _possibleConstructorReturn(this, (WeekList.__proto__ || Object.getPrototypeOf(WeekList)).call(this, props));
    }

    //只需要初始化一次


    _createClass(WeekList, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
            return false;
        }
    }, {
        key: "render",
        value: function render() {

            var boxClassName = this.props.class;

            return _react2.default.createElement(
                "div",
                { className: "week-list" },
                _react2.default.createElement(
                    "ul",
                    null,
                    _react2.default.createElement(
                        "li",
                        null,
                        "\u65E5"
                    ),
                    _react2.default.createElement(
                        "li",
                        null,
                        "\u4E00"
                    ),
                    _react2.default.createElement(
                        "li",
                        null,
                        "\u4E8C"
                    ),
                    _react2.default.createElement(
                        "li",
                        null,
                        "\u4E09"
                    ),
                    _react2.default.createElement(
                        "li",
                        null,
                        "\u56DB"
                    ),
                    _react2.default.createElement(
                        "li",
                        null,
                        "\u4E94"
                    ),
                    _react2.default.createElement(
                        "li",
                        null,
                        "\u516D"
                    )
                )
            );
        }
    }]);

    return WeekList;
}(_react.Component);

exports.default = WeekList;