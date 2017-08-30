import ReactDOM from "react-dom";

function base(){

    this.elem = null;
    this.duration = null;
    this.onClose = null;
    this.currState = 'hidden';
    this.timer = null;

    this.toastChange = function(elem,duration,onClose,id,queue){

        this.elem = elem;
        this.duration = duration;
        this.onClose = onClose;

        // this.elem.addEventListener('webkitAnimationEnd',() => {this._elemTransitionend(this)});
        this.elem.addEventListener('webkitTransitionEnd',() => {this._elemTransitionend(this)});
        this.currState = 'show';
        this.elem.className = 'toast-box show';
    }

    this._closeInfo = function(_this){
        _this.elem.className = 'toast-box';
        _this.currState = 'hidden';
        clearTimeout( _this.timer );
        _this.timer = null;
    }

    this._removeInfo = function (_this){
        ReactDOM.unmountComponentAtNode(_this.elem);
        document.body.removeChild(_this.elem);
        _this.onClose();
    }

    this._elemTransitionend = function(_this){


        if(_this.currState == 'show'){
            this.timer = setTimeout(() => {_this._closeInfo(_this)},_this.duration);
        }else{
            _this._removeInfo(_this);
        }
    }

}

export default base;