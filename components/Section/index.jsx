/**
 * Created by samciu on 17/1/12.
 */
import React, {Component} from 'react';

import Header from './Header.jsx';
import Body from './Body.jsx';

import './index.scss';

class Section extends Component {

    static Header = Header;

    static Body = Body;

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <section className='zzc-section'>
                {this.props.children}
            </section>
        )
    }
}

export default Section;