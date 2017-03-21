/**
 * Created by Lam on 17/1/16.
 */

/**
 * <div onClick={() => {alert('删除','确认删除吗?',[
 *      { text: '取消', onPress: () => console.log('cancel')},
 *      { text: '删除', onPress: () => console.log('ok'),style: {'color':'#108ee9','fontWeight':'bold'}},
 * ])}}>Alert</div>
 *
 * **/


import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./style.scss";


export default function (...args) {
    const title = args[0] || '';
    const content = args[1];
    const actions = args[2] || [{ text: '确定' }];
    const parentElem = args[3] || 'body';//将元素插入到什么元素,默认body

    let box;

    if(!content || content == ''){
        console.error('请输入内容!');
        return;
    }


    let div = document.createElement('div');
    parentElem == 'body' ? document.body.appendChild(div) : document.querySelector(parentElem).appendChild(div);

    function close(callback = () => {}) {
        box.className = 'zzc-alert-content'
        setTimeout(() => {
            document.querySelector('.zzc-alert-mark').className = 'zzc-alert-mark';
            setTimeout(() => {
                ReactDOM.unmountComponentAtNode(div);
                div.parentNode.removeChild(div);

                callback();
            }, 100);
        }, 100)

    }

    function show() {
        document.querySelector('.zzc-alert-mark').className = 'zzc-alert-mark show';
        box = document.querySelector('.zzc-alert-content');
        box.className = 'zzc-alert-content show'
    }

    function _setButton(actions){

        let elemArr = [];

        if(actions.length == 1){

            let button = actions[0];
            const orginPress = button.onPress || function() {};

            elemArr.push(<button
                className='singles'
                style={button.style ? button.style : {}}
                onClick={() => {
                    close();
                    orginPress();
                }}
            >{button.text}</button>)
        }else{
            elemArr = actions.map((button,i) => {

                const orginPress = button.onPress || function() {};

                return (<button
                    key={`${i}-${new Date().getTime()}`}
                    style={button.style ? button.style : {}}
                    onClick={() => {
                        close();
                        orginPress();
                    }}
                >{button.text}</button>)
            })
        }

        return elemArr;

    }

    ReactDOM.render(
        <div className="zzc-alert">
            <div className="zzc-alert-mark"></div>
            <div className="zzc-alert-box">
                <div className="zzc-alert-content">
                    {
                        title == '' ? '' : <h2 className="zzc-alert-header">{title}</h2>
                    }
                    <div className="zzc-alert-body">{content}</div>
                    <div className="zzc-alert-footer">
                        <div className="zzc-alert-buttonGroup">
                            {
                                _setButton(actions)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>, div);


    setTimeout(() => {
        show();
    },100);

    return {
        close : close
    };
}
