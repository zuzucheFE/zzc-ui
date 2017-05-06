/**
 * Created by Lam on 17/1/16.
 */


/**
 * <button onClick={() => {Toast.info('操你妈逼一万遍',1000,() => {console.log(321)})}}>info</button>
 * **/

import React, {Component} from "react";
import "./style.scss";
import Info from "./Components/Info/index.jsx";


class Toast extends Component{

    constructor(props) {
        super(props);
    }

    static info = Info;

}

export default Toast;
