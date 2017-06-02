/**
 * Created by lamho on 2017/3/16.
 */
import React, { Component } from "react";
import './style.scss';
import { Card } from "zzc-ui";

export default class App extends Component {

    constructor( props ) {
        super( props );
    }

    render() {
        return (
            <div>
                <p>普通Card</p>
                <Card>
                    <Card.Header title='title' extra={<span>（租租车提供）</span>}></Card.Header>
                    <Card.Body>
                        <div className="card-content-box">
                            <div className="text">content</div>
                        </div>
                    </Card.Body>
                </Card>
                <br/>
                <br/>
                <p>满宽度Card</p>
                <Card full>
                    <Card.Header title='title' extra={<span>（租租车提供）</span>}></Card.Header>
                    <Card.Body>
                        <div className="card-content-box">
                            <div className="text">content</div>
                        </div>
                    </Card.Body>
                </Card>
                <br/>
                <br/>
                <p>没有头部Card</p>
                <Card full>
                    <Card.Body>
                        <div className="card-content-box">
                            <div className="text">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad amet cum deserunt dignissimos, est id quo unde! Beatae consectetur error esse excepturi, necessitatibus nihil pariatur perferendis repudiandae tempore ut, velit?</p>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }

}