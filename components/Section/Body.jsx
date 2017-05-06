/**
 * Created by samciu on 17/1/12.
 */
import React, {Component} from 'react';

class Body extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="zzc-section-content clear">{this.props.children}</div>
        )
    }
}

export default Body;