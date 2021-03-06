/**
 * Created by Lam on 17/1/24.
 */
import React, {Component} from "react";
import ReactDOM from "react-dom";
import Base from "../tool/base";
import "./style.scss";

function info( ...arg ) {
    
    if (document.querySelector('.textToast-box')) {
        let currToastBox = document.querySelector( '.textToast-box' );
        clearTimeout( info.prototype.timer );
        info.prototype.timer = null;
        currToastBox.className = 'textToast-box';
        setTimeout(() => { 
            currToastBox.parentNode.removeChild( currToastBox );
            info( ...arg );
        }, 200 );
        return false;
    }

    let content = arg[0],
        duration = parseInt(arg[1] || 3000),
        onClose = arg[2] && arg[2] instanceof Function ? arg[2] : function(){},
        elem = document.createElement('div');

    elem.className = 'textToast-box';
    if ( arg[3] ) {
        arg[3].appendChild(elem);
    } else { 
        document.body.appendChild(elem);
    }

    ReactDOM.render(
        <div className='textToast-content'>
            <p dangerouslySetInnerHTML={{__html: content}} />
        </div>,elem
    )

    setTimeout( () => {
        document.querySelector( '.textToast-box' ) && document.querySelector( '.textToast-box' ).addEventListener( 'click', function () { 
            info.prototype._closeInfo(info.prototype);
        } );
        info.prototype.toastChange( elem, duration, onClose, arg[3] );
    },100);

}

info.prototype = new Base;

export default info;