/**
 * Created by samciu on 17/1/9.
 */
import React, {Component} from 'react';

class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <header className="zzc-card-title">{this.props.title}{this.props.extra}</header>
        )
    }
}

export default Header;