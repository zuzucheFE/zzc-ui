/**
 * Created by lamho on 2017/4/19.
 */
import React,{Component} from 'react';
import './style.scss';
import Event from '../../tool/Event';

export default class WarnSlideTip extends Component{

    constructor(props) {
        super(props);
        this.state = {
            animateEvent : null
        };
    }

    componentWillReceiveProps() {
        let fn = this.warnSlideAnimateCallback.bind(this);
        this.setState({
            animateEvent: fn
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.isShow != this.props.isShow || nextProps.text != this.props.text){
            return true;
        }

        return false;
    }

    componentDidUpdate() {
        Event.addEndEventListener(this.refs.warnBox,this.state.animateEvent);
    }

    warnSlideAnimateCallback() {
        Event.removeEndEventListener(this.refs.warnBox,this.state.animateEvent);
        if(this.props.isShow){
            this.props.showedEvent();
        }
    }

    render() {

        let {isShow,text} = this.props;
        return (
            <div ref="warnBox" className={isShow ? 'warn-slide-tip-box show' : 'warn-slide-tip-box'}>
                <p>{text}</p>
            </div>
        );
    }

}