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
            })();

        } else {
            _this.props.confirm();
        }
    }

    clickCancel() {
        let _this = this;
        _this.props.close();
    }

    render() {

        let {title, defaultTitleBtn} = this.props,
            btnOpt = defaultTitleBtn ? defaultTitleBtn : {
                    left: {
                        name: '取消',
                        isShow: true
                    },
                    right: {
                        name: '确定',
                        isShow: true
                    },
                };

        return (
            <div className='zzc-dialog'>
                {
                    !!title && <div className="zzc-dialog-title-box">
                        <div className="zzc-dialog-title">
                            {
                                btnOpt.left.isShow &&
                                <div
                                    onClick={this.clickCancel.bind(this)}
                                    style={btnOpt.left.style && btnOpt.left.style}
                                    className="zzc-dialog-btn">{btnOpt.left.name}</div>
                            }
                            <h5>{title}</h5>
                            {
                                btnOpt.right.isShow &&
                                <div
                                    onClick={this.clickConfirm.bind(this)}
                                    style={btnOpt.right.style && btnOpt.right.style}
                                    className="zzc-dialog-btn confirm">{btnOpt.right.name}</div>
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