/**
 * Created by samciu on 16/12/22.
 */

import React, {Component} from 'react';

import './index.scss'

class Tab extends Component {

    constructor(props) {
        super(props);
        this.state={
            currentIndex : this.props.defaultIndex || 0
        }
    }

    componentWillUpdate(nextProps) { 
        this.setState( {
            currentIndex: nextProps.defaultIndex
        } );
    }

    changeCurrentIndex(index) {
        this.setState({currentIndex : index});
        this.props.onChange && this.props.onChange(index);
    }

    check_nav_index(index) {
        return index == this.state.currentIndex ? "nav-item active" : "nav-item";
    }

    check_tab_index(index) {
        return index == this.state.currentIndex ? "tab-item show" : "tab-item";
    }

    setStyle(index) {
        if(!!this.props.defaultColor && index == this.state.currentIndex){
            return {color:this.props.defaultColor}
        }
    }

    render() {

        return (
            <div className="tabs">
                <nav className="tab-nav">
                    <ul>
                        {React.Children.map(this.props.children, (element, index) => {
                            return (
                                <li>
                                    <div onClick={() => {
                                        this.changeCurrentIndex(index);
                                    }} className={this.check_nav_index(index)}>
                                        <span style={this.setStyle(index)}>{ element.props.name }</span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div className="tab-placeholder" />
                <div className="tabs-container">
                    {React.Children.map(this.props.children, (element, index)=> {
                        return (
                            <div className={this.check_tab_index(index)}>{element}</div>
                        );
                    })}
                </div>
            </div>

        )
    }
}

export default Tab;