'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by lamho on 2017/3/30.
 */
var EVENT_NAME_MAP = {
    transitionend: {
        transition: 'transitionend',
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'mozTransitionEnd',
        OTransition: 'oTransitionEnd',
        msTransition: 'MSTransitionEnd'
    },

    animationend: {
        animation: 'animationend',
        WebkitAnimation: 'webkitAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        OAnimation: 'oAnimationEnd',
        msAnimation: 'MSAnimationEnd'
    }
};

var endEvents = [];

function detectEvents() {

    var testEl = document.createElement('div');
    var style = testEl.style;

    //判断是否支持AnimationEvent
    if (!!('AnimationEvent' in window)) {
        delete EVENT_NAME_MAP.animationend.animation;
    }

    //判断是否支持TransitionEvent
    if (!!('TransitionEvent' in window)) {
        delete EVENT_NAME_MAP.transitionend.transition;
    }

    for (var baseEventName in EVENT_NAME_MAP) {

        //判断是否为EVENT_NAME_MAP的私有属性,防止循环原型上的属性
        if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {

            var baseEvents = EVENT_NAME_MAP[baseEventName];
            for (var styleName in baseEvents) {

                /**
                 * AnimationEvent 或 TransitionEvent 存在window作用域，则可以直接使用
                 * transitionend 和 animationend进行事件绑定
                 * 否则使用webkitTransitionEnd 和 webkitAnimationEnd 则可
                 * **/
                endEvents.push(baseEvents[styleName]);
                break;
            }
        }
    }
}

//加载完成dom
(function () {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        detectEvents();
    }
})();

function addEventListener(node, eventName, eventListener, _this) {
    if (_this) {
        node.addEventListener(eventName, eventListener.bind(_this), false);
    } else {
        node.addEventListener(eventName, eventListener, false);
    }
}

function removeEventListener(node, eventName, eventListener, _this) {
    if (_this) {
        node.removeEventListener(eventName, eventListener.bind(_this), false);
    } else {
        node.removeEventListener(eventName, eventListener, false);
    }
}

var TransitionEvents = {
    addEndEventListener: function addEndEventListener(node, eventListener, _this) {
        if (endEvents.length === 0) {
            window.setTimeout(eventListener, 0);
            return;
        }

        _this = _this ? _this : null;

        endEvents.forEach(function (endEvents) {
            addEventListener(node, endEvents, eventListener, _this);
        });
    },
    removeEndEventListener: function removeEndEventListener(node, eventListener, _this) {
        if (endEvents.length === 0) {
            return;
        }
        endEvents.forEach(function (endEvent) {
            removeEventListener(node, endEvent, eventListener, _this);
        });
    }
};

exports.default = TransitionEvents;