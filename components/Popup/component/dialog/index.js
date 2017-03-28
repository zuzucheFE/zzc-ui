/**
 * Created by lamho on 2017/3/28.
 */
import React, {Component} from 'react';
import './style.scss';

export default class Dialog extends Component {
    constructor(props) {
        super(props);
    }

    clickConfirm() {
        this.props.confirm || function() {};
        if( typeof  this.props.afterConfirm == 'function'){

            this.props.afterConfirm() && (() => {
                this.props.confirm();
                this.props.close()
            })();

        }else{
            this.props.confirm();
            this.props.close()
        }
    }

    clickCancel() {
        this.props.cancel || function() {};

        this.props.cancel();
        this.props.close()
    }

    render() {

        let {child, title} = this.props;

        return (
            <div className='zzc-dialog'>
                {
                    !!title && <div className="zzc-dialog-title">
                        <div onClick={this.clickCancel.bind(this)} className="zzc-dialog-btn">取消</div>
                        <h5>这是一个title</h5>
                        <div onClick={this.clickConfirm.bind(this)} className="zzc-dialog-btn confirm">确定</div>
                    </div>
                }
                {child}
            </div>
        )
    }
}