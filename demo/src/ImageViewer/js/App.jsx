/**
 * Created by lamho on 2017/3/16.
 */
import React, { Component } from "react";
import './style.scss';
import { ImageViewer } from "zzc-ui"

export default class App extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            photoList: [
                { url: '../img/liuzichen01.jpeg' },
                { url: '../img/liuzichen02.jpeg' }
            ]
        };
    }

    openImageView( index ) {
        ImageViewer( {
            title: '',
            photos: this.state.photoList,
            showIndex: index + 1
        } );
    }

    render() {
        return (
            <div>
                <div className="img-box">
                    {
                        this.state.photoList.map(( item, k ) => {
                            return (
                                <p onClick={() => {
                                    this.openImageView( k );
                                }} key={`phote${k}`}><img src={item.url} /></p>
                            );
                        } )
                    }
                </div>
                <br />
                <button onClick={this.openImageView.bind( this )}>点击我（默认3秒）</button>
                <br />
            </div>
        )
    }

}