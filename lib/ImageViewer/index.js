'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (data) {
    var div = document.querySelector('.image-viewer');

    if (!div) {
        div = document.createElement('div');
        div.className = 'image-viewer';
        document.body.appendChild(div);
    }

    _reactDom2.default.render(_react2.default.createElement(ImageViewerContainer, { data: data }), div);
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _swiper = require('swiper');

var _swiper2 = _interopRequireDefault(_swiper);

require('swiper/dist/css/swiper.css');

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by samciu on 17/4/13.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ImageViewerContainer = function (_Component) {
    _inherits(ImageViewerContainer, _Component);

    function ImageViewerContainer(props) {
        _classCallCheck(this, ImageViewerContainer);

        return _possibleConstructorReturn(this, (ImageViewerContainer.__proto__ || Object.getPrototypeOf(ImageViewerContainer)).call(this, props));
    }

    _createClass(ImageViewerContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            new _swiper2.default('.swiper-container-modal', {
                loop: true,
                initialSlide: this.props.data.showIndex - 1
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var photos = this.props.data.photos;


            return _react2.default.createElement(
                'div',
                { className: 'mask modal black', onClick: function onClick() {
                        close();
                    } },
                _react2.default.createElement(
                    'div',
                    { className: 'modal-box image' },
                    _react2.default.createElement(
                        'div',
                        { className: 'swiper-container swiper-container-modal' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'swiper-wrapper' },
                            photos.map(function (item, i) {
                                return _react2.default.createElement(
                                    'li',
                                    { className: 'swiper-slide' },
                                    _react2.default.createElement('img', { src: item.url })
                                );
                            })
                        )
                    )
                )
            );
        }
    }]);

    return ImageViewerContainer;
}(_react.Component);

function close() {
    var div = document.querySelector('.image-viewer');
    if (div) {
        div && _reactDom2.default.unmountComponentAtNode(div);
        div.parentNode.removeChild(div);
    }
}