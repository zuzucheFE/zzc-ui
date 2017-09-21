/**
 * Created by samciu on 17/4/13.
 */
import React, {Component} from 'react';
import ReactDOM from "react-dom";
import Swiper from 'swiper';

import 'swiper/dist/css/swiper.css';
import './index.scss';

class ImageViewerContainer extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        new Swiper('.swiper-container-modal', {
            loop: true,
            initialSlide: this.props.data.showIndex - 1,
            lazyLoading : true,
            lazyLoadingOnTransitionStart : true,
        });
    }

    render() {

        let {photos} = this.props.data;

        return (
            <div className="mask modal black" onClick={
                ()=>{close();}
            }>
                <div className="modal-box image">
                    <div className="swiper-container swiper-container-modal">
                        <ul className="swiper-wrapper">
                            {
                                photos.map((item,i)=>{
                                    return (
                                        <li className="swiper-slide">
                                            <img className="swiper-lazy" data-src={item.url} />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

function close() {
    let div = document.querySelector('.image-viewer');
    if (div) {
        div && ReactDOM.unmountComponentAtNode(div);
        div.parentNode.removeChild(div);
    }
}

export default function(data) {
    let div = document.querySelector('.image-viewer');

    if (!div) {
        div = document.createElement('div');
        div.className = 'image-viewer';
        document.body.appendChild(div);
    }

    ReactDOM.render(<ImageViewerContainer data={data}/>, div);
}