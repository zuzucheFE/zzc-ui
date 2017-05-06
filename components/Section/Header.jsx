/**
 * Created by samciu on 17/1/12.
 */

import React, {Component} from 'react';

class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <header className="zzc-section-title" onClick={this.props.onClick}>
                <div className="zzc-section-title-content">
                    {
                        !!this.props.thumb && (
                            <img src={this.props.thumb}/>
                        )
                    }
                    {this.props.title}
                </div>
                {
                    !!this.props.extra && (
                        <div className="zzc-section-title-extra">{this.props.extra}</div>
                    )
                }

                {
                    !!this.props.arrow && (
                        <div className="zzc-section-title-arrow"><i className="iconfont-right"/></div>
                    )
                }
            </header>
        )
    }
}

export default Header;