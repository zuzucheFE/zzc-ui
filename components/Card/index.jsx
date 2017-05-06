/**
 * Created by samciu on 17/1/9.
 */
import React, {Component} from 'react';

import Header from './Header.jsx';
import Body from './Body.jsx';
import './index.scss';

class Card extends Component {

    static Header = Header;

    static Body = Body;

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className={this.props.full ? 'zzc-card full' : 'zzc-card'}>
                {this.props.children}
            </div>
        )
    }
}

export default Card;