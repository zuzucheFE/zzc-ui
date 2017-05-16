/**
 * Created by lamho on 2017/3/16.
 */
import React, {Component} from "react";
import './style.scss';
import {Section} from "zzc-ui";

export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }


    render() {
        return (
            <div>
                <Section>
                    <Section.Header title='title' extra='副标题' onClick={() => {
                        alert('123')
                    }}/>
                    <Section.Body>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim harum illum itaque odit totam
                            vitae voluptates. Asperiores cumque explicabo ipsam ipsum iste iure iusto, maxime quasi
                            repudiandae similique sunt tempore.</p>
                    </Section.Body>
                </Section>
                <br/>
                <Section>
                    <Section.Header title='title' className="aaaaa" extra='副标题' onClick={() => {
                        alert('123')
                    }}/>
                    <Section.Body className="aaaaa">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim harum illum itaque odit totam
                            vitae voluptates. Asperiores cumque explicabo ipsam ipsum iste iure iusto, maxime quasi
                            repudiandae similique sunt tempore.</p>
                    </Section.Body>
                </Section>
            </div>
        )
    }

}