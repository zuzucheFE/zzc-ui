/**
 * Created by Lam on 17/1/24.
 */
import React, {Component} from "react";
import ReactDOM from "react-dom";
import Base from "../tool/base";
import "./style.scss";

function info (opt){

    if (document.querySelector('.toast-box')) {
        return false;
    }

    let content = opt.content,
        duration = opt.duration || 3000,
        onClose = opt.callBack && opt.callBack instanceof Function ? opt.callBack : function(){},
        targetParent = opt.targetParent || document.body,
        elem = document.createElement('div'),
        zIndex = opt.zIndex || 999;

    elem.className = 'toast-box';
    elem.style.zIndex = zIndex;
    targetParent.appendChild(elem);

    ReactDOM.render(
        <div className='toast-content'>
            <p dangerouslySetInnerHTML={{__html: content}} />
        </div>,elem
    )


    setTimeout(() => {
        info.prototype.toastChange(elem,duration,onClose,targetParent);
    },100);

}

info.prototype = new Base;

export default info;