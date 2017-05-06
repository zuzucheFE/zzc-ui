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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by samciu on 17/1/12.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Header = function (_Component) {
    _inherits(Header, _Component);

    function Header(props) {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
    }

    _createClass(Header, [{
        key: "render",
        value: function render() {

            return _react2.default.createElement(
                "header",
                { className: "zzc-section-title", onClick: this.props.onClick },
                _react2.default.createElement(
                    "div",
                    { className: "zzc-section-title-content" },
                    !!this.props.thumb && _react2.default.createElement("img", { src: this.props.thumb }),
                    this.props.title
                ),
                !!this.props.extra && _react2.default.createElement(
                    "div",
                    { className: "zzc-section-title-extra" },
                    this.props.extra
                ),
                !!this.props.arrow && _react2.default.createElement(
                    "div",
                    { className: "zzc-section-title-arrow" },
                    _react2.default.createElement("i", { className: "iconfont-right" })
                )
            );
        }
    }]);

    return Header;
}(_react.Component);

exports.default = Header;