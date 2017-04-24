import ReactDOM from "react-dom";
import Event from '../../../../tool/Event';

function base(){

    this.elem = null;
    this.duration = null;
    this.onClose = null;
    this.currState = 'hidden';
    this.targetParent = null;
    this.transactionEndFn = null;

    this.toastChange = function(elem,duration,onClose,targetParent){

        this.elem = elem;
        this.duration = duration;
        this.onClose = onClose;
        this.targetParent = targetParent ? targetParent : null;
        this.transactionEndFn = this._elemTransitionend.bind(this);

        Event.addEndEventListener(this.elem,this.transactionEndFn);

        this.currState = 'show';
        this.elem.className = 'toast-box show';
    }

    //关闭
    this._closeInfo = function(_this){
        _this.elem.className = 'toast-box';
        _this.currState = 'hidden';
    }

    //删除
    this._removeInfo = function (_this){
        ReactDOM.unmountComponentAtNode(_this.elem);
        _this.targetParent.removeChild(_this.elem);
        _this.onClose();
    }

    this._elemTransitionend = function(){

        if(this.currState == 'show'){
            setTimeout(() => {this._closeInfo(this)},this.duration);
        }else{
            Event.removeEndEventListener(this.elem,this.transactionEndFn);
            this._removeInfo(this);
        }
    }

}

export default base;