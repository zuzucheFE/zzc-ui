function base(){

    this.elem = null;
    this.duration = null;
    this.onClose = null;
    this.currState = 'hidden';

    this.toastChange = function(elem,duration,onClose){

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
    }

    this._removeInfo = function (_this){
        document.body.removeChild(_this.elem);
        _this.onClose();
    }

    this._elemTransitionend = function(_this){


        if(_this.currState == 'show'){
            setTimeout(() => {_this._closeInfo(_this)},_this.duration);
        }else{
            _this._removeInfo(_this);
        }
    }

}

export default base;