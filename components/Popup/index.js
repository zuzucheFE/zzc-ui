/**
 * Created by lamho on 2017/3/27.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Dialog from './component/dialog/';
import './index.scss';
import "../Animation/style.scss";


let parentDiv = null,
    dialog = null;

function create(content,opt) {

    let direction = opt.direction || 'bottom',
        style = opt.style || {};

    parentDiv = document.createElement('div');
    document.body.appendChild(parentDiv);
    let component = ReactDOM.render(
        <div className="zzc-popup">
            <div className="popup-mark zzc-animation-fade"></div>
            <div style={style} className={`popup-content ${direction} zzc-animation-silde silde-${direction}`}>
                <Dialog
                    title={opt.title}
                    close={close}
                    confirm={opt.confirm}
                    cancel={opt.cancel}
                    afterConfirm={opt.afterConfirm}
                >
                    {content}
                </Dialog>
            </div>
        </div>,
        parentDiv
    );

    checkJSXElem();

    return component;
}

function checkJSXElem() {

    let timer = setInterval(() => {
        if(document.querySelector('.zzc-popup .popup-content')){
            clearInterval(timer);
            open();
        }
    },12);

}

function open() {
    let content = document.querySelector('.zzc-popup .popup-content'),
        mark = document.querySelector('.zzc-popup .popup-mark');
    content.className = content.className + ' silde-in';
    mark.className = mark.className + ' fade-in';
}

function close() {
    let content = document.querySelector('.zzc-popup .popup-content'),
        mark = document.querySelector('.zzc-popup .popup-mark');

    if(content && mark){
        let contentClassArr = content.className.split(' '),
            markClassArr = mark.className.split(' '),
            sildeIndex = contentClassArr.indexOf('silde-in'),
            fadeIndex = markClassArr.indexOf('fade-in');

        sildeIndex && contentClassArr.splice(sildeIndex, 1);
        fadeIndex && markClassArr.splice(fadeIndex,1);

        content.className = contentClassArr.join(' ');
        mark.className = markClassArr.join(' ');


        //绑事件
        setTimeout(() => {
            clear();
        },500)
    }else{
        return;
    }

}

function clear() {
    if(parentDiv){
        ReactDOM.unmountComponentAtNode(parentDiv);
        parentDiv.parentNode.removeChild(parentDiv);
        parentDiv = null;
        dialog = null;
    }else{
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
 * **/

export default class Popup extends Component {

    constructor(props) {
        super(props);
    }

    static show(content,opt) {
        close();
        if(parentDiv != null){
            return false;
        }
        dialog = create(content,opt);
    }

    static hide() {
        close();
    }

}