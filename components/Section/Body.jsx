/**
 * Created by samciu on 17/1/12.
 */
import React, {Component} from 'react';

class Body extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let { className = '' } = this.props;

        return (
            <div className={`zzc-section-content clear ${className}`}>{this.props.children}</div>
        )
    }
}

export default Body;