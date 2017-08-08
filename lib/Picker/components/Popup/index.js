'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _index = require('../../../Dialog/index.js');

var _index2 = _interopRequireDefault(_index);

var _combine = require('../../../tool/combine');

var _combine2 = _interopRequireDefault(_combine);

var _Event = require('../../../tool/Event');

var _Event2 = _interopRequireDefault(_Event);

var _hasClass = require('../../../tool/hasClass');

var _hasClass2 = _interopRequireDefault(_hasClass);

require('./index.css');

require('../../../Animation/style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by lamho on 2017/3/27.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var parentDiv = null,
    dialog = null,
    createOpt = null;

function create(content, opt) {

    var direction = opt.direction || 'bottom',
        style = opt.style || {},
        defaultTitleBtn = {
        left: {
            name: '取消',
            isShow: true
        },
        right: {
            name: '确定',
            isShow: true
        }
    };

    //set dialog title btn
    if (!!opt.titleBtn) {
        defaultTitleBtn = (0, _combine2.default)(defaultTitleBtn, opt.titleBtn);
    }

    parentDiv = document.createElement('div');
    document.body.appendChild(parentDiv);
    var component = _reactDom2.default.render(_react2.default.createElement(
        'div',
        { className: 'zzc-popup' },
        _react2.default.createElement('div', { className: 'popup-mark zzc-animation-fade' }),
        _react2.default.createElement(
            'div',
            { style: style, className: 'popup-content ' + direction + ' zzc-animation-slide slide-' + direction },
            _react2.default.createElement(
                _index2.default,
                {
                    title: opt.title,
                    defaultTitleBtn: defaultTitleBtn,
                    close: closePopup,
                    confirm: opt.confirm,
                    afterConfirm: opt.afterConfirm
                },
                content
            )
        )
    ), parentDiv);
    addPopupEvent();
    openPopup();
    return component;
}

//绑定popup-content事件
function addPopupEvent() {
    var popupNode = document.querySelector('.zzc-popup .popup-content');
    //绑定事件
    _Event2.default.addEndEventListener(popupNode, function () {
        //关闭后的操作
        if (!(0, _hasClass2.default)(popupNode.className, 'slide-in')) {
            _Event2.default.removeEndEventListener(popupNode, function () {});
            var html = document.querySelector('html');
            document.body.style.height = '';
            document.body.style.overflow = '';
            html.style.height = '';
            html.style.overflow = '';
            clear();
        } else {
            requestAnimationFrame(function () {
                //显示剩余月份
                var dayItems = document.querySelectorAll('.day-item');
                for (var i = 0; i < dayItems.length; i++) {
                    dayItems[i].className = "day-item";
                }
                var html = document.querySelector('html');
                document.body.style.height = '100%';
                document.body.style.overflow = 'hidden';
                html.style.height = '100%';
                html.style.overflow = 'hidden';
            });
        }
    });
}

//打开popup
function openPopup() {
    var content = document.querySelector('.zzc-popup .popup-content'),
        mark = document.querySelector('.zzc-popup .popup-mark');
    content.className = content.className + ' slide-in';
    mark.className = mark.className + ' fade-in';
}

//关闭popup
function closePopup() {
    var content = document.querySelector('.zzc-popup .popup-content'),
        mark = document.querySelector('.zzc-popup .popup-mark'),
        dayItems = document.querySelectorAll('.day-item');

    //隐藏所日月份
    for (var i = 0; i < dayItems.length; i++) {
        dayItems[i].className = "day-item hidden-item";
    }

    if (content && mark) {
        var contentClassArr = content.className.split(' '),
            markClassArr = mark.className.split(' '),
            slideIndex = contentClassArr.indexOf('slide-in'),
            fadeIndex = markClassArr.indexOf('fade-in');

        slideIndex && contentClassArr.splice(slideIndex, 1);
        fadeIndex && markClassArr.splice(fadeIndex, 1);

        content.className = contentClassArr.join(' ');
        mark.className = markClassArr.join(' ');
    } else {
        return;
    }
}

function clear() {
    if (parentDiv) {
        //保证动画结束后才执行cancel回调
        createOpt.close();
        _reactDom2.default.unmountComponentAtNode(parentDiv);
        parentDiv.parentNode.removeChild(parentDiv);
        parentDiv = null;
        dialog = null;
    } else {
        return;
    }
}

/**
 * @param content dialog的内容，传入jsx
 * @param opt.title dialog的title，不传则不初始化出来
 * @param opt.direction popup的弹出方向，默认为bottom
 * @param opt.style popup-content节点的样式
 * @param opt.confirm 确认按钮函数
 * @param opt.cancel 取消按钮函数
 * @param opt.afterConfirm 确认前执行的函数，返回true才会执行confirm
 *
 * @param titleBtn 配置title的两边的btn
 *
 *      @param titleBtn.left    左边按钮
 *
 *          @param titleBtn.left.name         左边按钮文案
 *          @param titleBtn.left.isShow       用于隐藏
 *      @param titleBtn.right   右边按钮
 *
 *          @param titleBtn.left.name         右边按钮文案
 *          @param titleBtn.left.isShow       用于隐藏
 *
 * **/

var Popup = function (_Component) {
    _inherits(Popup, _Component);

    function Popup(props) {
        _classCallCheck(this, Popup);

        var _this = _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).call(this, props));

        _this.state = {
            dialog: null
        };
        return _this;
    }

    _createClass(Popup, null, [{
        key: 'show',
        value: function show(content, opt) {
            closePopup();
            if (parentDiv != null) {
                return false;
            }
            createOpt = opt;
            dialog = create(content, opt);
        }
    }, {
        key: 'hide',
        value: function hide() {
            closePopup();
        }
    }]);

    return Popup;
}(_react.Component);

exports.default = Popup;