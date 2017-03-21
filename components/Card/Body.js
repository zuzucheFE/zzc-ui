/**
 * Created by samciu on 17/1/9.
 */
import React, {Component} from 'react';

class Body extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="zzc-card-content clear">{this.props.children}</div>
        )
    }
}

export default Body;