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
        let _this = this;
        this.props.confirm || function () {
        };
        if (typeof _this.props.afterConfirm == 'function') {

            this.props.afterConfirm() && (() => {
                _this.props.confirm();
                _this.props.close();
            })();

        } else {
            _this.props.confirm();
            _this.props.close();
        }
    }

    clickCancel() {
        let _this = this;
        _this.props.close();
    }

    render() {

        let {title, defaultTitleBtn} = this.props;

        return (
            <div className='zzc-dialog'>
                {
                    !!title && <div className="zzc-dialog-title-box">
                        <div className="zzc-dialog-title">
                            {
                                defaultTitleBtn.left.isShow && <div onClick={this.clickCancel.bind(this)} className="zzc-dialog-btn">{defaultTitleBtn.left.name}</div>
                            }
                            <h5>{title}</h5>
                            {
                                defaultTitleBtn.right.isShow && <div onClick={this.clickConfirm.bind(this)} className="zzc-dialog-btn confirm">{defaultTitleBtn.right.name}</div>
                            }
                        </div>
                        <div className="zzc-dialog-title-perch"></div>
                    </div>
                }

                {this.props.children}
            </div>
        );
    }
}