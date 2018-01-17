/**
 * Created by samciu on 16/12/23.
 */

import React, { Component } from 'react';

import './index.scss'

class Modal extends Component {

    constructor( props ) {
        super( props );
    }

    componentDidUpdate() {
        if ( !this.refs.modalBox ) { 
            return false;
        }
        if ( this.props.visible ) {
            this.refs.modalBox.style.display = 'block';
            setTimeout( () => {
                this.refs.modalMask.className = 'modal-mask show';
                setTimeout( () => {
                    this.refs.modalWrap.className = 'modal-wrap show';
                    setTimeout( () => {
                        this.refs.modalContent.className = 'modal-content-box show';
                    }, 350 );
                }, 100 );
            }, 14 );
        } else {
            this.refs.modalBox.className = 'hide-modal';
            this.refs.modalWrap.className = 'modal-wrap';
            setTimeout( () => {
                this.refs.modalMask.className = 'modal-mask';
                setTimeout( () => {
                    this.refs.modalContent.className = 'modal-content-box';
                    this.refs.modalBox.style.display = 'none';
                }, 100 );
            }, 300 );
        }

    }

    setBtn( data ) {
        return (
            <div className="modal-btn-group">
                {
                    data.map( ( item, key ) => {
                        return ( <div key={`modal-btn-${key}-${new Date().getTime()}`} style={item.style ? item.style : {}} className="modal-close" onClick={() => {
                            item.click instanceof Function && item.click();
                            this.props.onCancel();
                        }}>{item.btnText}</div> )
                    } )
                }
            </div>

        )
    }

    render() {

        return (
            <div ref="modalBox" style={{ display: 'none' }}>
                <div ref="modalMask" className="modal-mask"></div>
                <div ref="modalWrap" className="modal-wrap">
                    <div className="modal-back" onClick={this.props.onCancel} />
                    <div className="modal-content">
                        {
                            typeof this.props.content == 'string' ?
                                <div
                                    className="modal-content-box"
                                    ref="modalContent"
                                    dangerouslySetInnerHTML={{ __html: this.props.content }}
                                >
                                </div> :
                                <div
                                    className="modal-content-box"
                                    ref="modalContent"
                                >
                                    {this.props.content}
                                </div>
                        }
                        {
                            this.props.btn ?
                                this.setBtn( this.props.btn ) :
                                <div className="modal-close" onClick={this.props.onCancel}>关闭</div>

                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;