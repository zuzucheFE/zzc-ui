import React, { Component } from 'react';
import './style.scss';

export default class Switch extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            isOpen: this.props.defaultStyle ? this.props.defaultStyle : false,
            isDisabled: this.props.disabled ? true : false
        };
    }

    toggleSwitch() {
        if ( !this.state.isDisabled ) {
            this.setState( {
                isOpen: !this.state.isOpen
            }, () => {
                this.props.onClick( this.state.isOpen );
            } );
        }

    }

    setClass() {
        if ( this.state.isDisabled ) {
            return this.state.isOpen ? 'switch-box switch-disabled open' : 'switch-box switch-disabled close'
        } else {
            return this.state.isOpen ? 'switch-box open' : 'switch-box close'
        }
    }

    render() {

        return (
            <div
                onClick={this.toggleSwitch.bind( this )}
                className={this.setClass()}
            >
                <div className="round"></div>
            </div>
        )

    }

}