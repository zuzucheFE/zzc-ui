/**
 * Created by lamho on 2017/3/27.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dialog from '../../../Dialog/index.jsx';
import combine from '../../../tool/combine';
import Event from '../../../tool/Event';
import hasClass from '../../../tool/hasClass';
import './index.scss';
import "../../../Animation/style.scss";


let parentDiv = null,
    dialog = null,
    createOpt = null;

function create( content, opt ) {

    let direction = opt.direction || 'bottom',
        style = opt.style || {},
        defaultTitleBtn = {
            left: {
                name: '取消',
                isShow: true
            },
            right: {
                name: '确定',
                isShow: true
            },
        };

    //set dialog title btn
    if ( !!opt.titleBtn ) {
        defaultTitleBtn = combine( defaultTitleBtn, opt.titleBtn );
    }

    parentDiv = document.createElement( 'div' );
    document.body.appendChild( parentDiv );
    let component = ReactDOM.render(
        <div className="zzc-popup">
            <div className="popup-mark zzc-animation-fade"></div>
            <div style={style} className={`popup-content ${direction} zzc-animation-slide slide-${direction}`}>
                <Dialog
                    title={opt.title}
                    defaultTitleBtn={defaultTitleBtn}
                    close={closePopup}
                    confirm={opt.confirm}
                    afterConfirm={opt.afterConfirm}
                >
                    {content}
                </Dialog>
            </div>
        </div>,
        parentDiv
    );
    addPopupEvent();
    openPopup();
    return component;
}

//绑定popup-content事件
function addPopupEvent() {
    let popupNode = document.querySelector( '.zzc-popup .popup-content' );
    
    //绑定事件
    Event.addEndEventListener( popupNode, function () {
        //关闭后的操作
        if ( !hasClass( popupNode.className, 'slide-in' ) ) {
            Event.removeEndEventListener( popupNode, () => { } );
            let html = document.querySelector( 'html' );
            document.body.style.height = '';
            document.body.style.overflow = '';
            html.style.height = '';
                html.style.overflow = '';
            clear();
        } else {
            requestAnimationFrame(() => {
                //显示剩余月份
                let dayItems = document.querySelectorAll( '.day-item' );
                for ( let i = 0; i < dayItems.length; i++ ) {
                    dayItems[i].className = "day-item";
                }
                let html = document.querySelector( 'html' );
                document.body.style.height = '100%';
                document.body.style.overflow = 'hidden';
                html.style.height = '100%';
                html.style.overflow = 'hidden';
            } );
        }
    } );

}

//打开popup
function openPopup() {
    let content = document.querySelector( '.zzc-popup .popup-content' ),
        mark = document.querySelector( '.zzc-popup .popup-mark' );
    content.className = content.className + ' slide-in';
    mark.className = mark.className + ' fade-in';

}

//关闭popup
function closePopup() {
    let content = document.querySelector( '.zzc-popup .popup-content' ),
        mark = document.querySelector( '.zzc-popup .popup-mark' ),
        dayItems = document.querySelectorAll( '.day-item' );

    //隐藏所日月份
    for ( let i = 0; i < dayItems.length; i++ ) {
        dayItems[i].className = "day-item hidden-item";
    }

    if ( content && mark ) {
        let contentClassArr = content.className.split( ' ' ),
            markClassArr = mark.className.split( ' ' ),
            slideIndex = contentClassArr.indexOf( 'slide-in' ),
            fadeIndex = markClassArr.indexOf( 'fade-in' );

        slideIndex && contentClassArr.splice( slideIndex, 1 );
        fadeIndex && markClassArr.splice( fadeIndex, 1 );

        content.className = contentClassArr.join( ' ' );
        mark.className = markClassArr.join( ' ' );

    } else {
        return;
    }

}

function clear() {
    if ( parentDiv ) {
        //保证动画结束后才执行cancel回调
        createOpt.close();
        ReactDOM.unmountComponentAtNode( parentDiv );
        parentDiv.parentNode.removeChild( parentDiv );
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

export default class Popup extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            dialog: null
        };
    }

    static show( content, opt ) {
        closePopup();
        if ( parentDiv != null ) {
            return false;
        }
        createOpt = opt;
        dialog = create( content, opt );
    }

    static hide() {
        closePopup();
    }

    static update() { 

    }

}