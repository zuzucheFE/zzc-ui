/**
 * Created by lamho on 2017/3/16.
 */
import React, {Component} from "react";
import './style.scss';
import {Switch} from "zzc-ui";

export default class App extends Component{

    constructor(props) {
        super( props );
        this.state = {
            isOpen : false
        }
    }

    click(style) { 
        console.log(style);
    }

    render(){

        return(
            <div style={{padding:'1rem'}}>
                <Switch
                    defaultStyle={false}
                    onClick={this.click.bind( this )}
                />
                <br/>
                <Switch
                    defaultStyle={true}
                    onClick={this.click.bind( this )}
                />
                <br/>
                <Switch
                    defaultStyle={false}
                    onClick={this.click.bind( this )}
                    disabled
                />
                <br/>
                <Switch
                    defaultStyle={true}
                    onClick={this.click.bind( this )}
                    disabled
                />
            </div>
        );
    }

}