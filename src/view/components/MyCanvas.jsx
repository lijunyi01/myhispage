import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
import { findDOMNode } from 'react-dom';
import styles from '../styles/ProjectsListItem.css';
// import appleimage from '../images/apple.png';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';

class MyCanvas extends React.Component {

    shouldComponentUpdate(nextProps){
        return (nextProps.componentState != this.props.componentState);
        // let ret = false;
        // if(nextProps.componentState != this.props.componentState){
        //     ret = true;
        //     this.updateCanvas1(nextProps.componentState);
        // }else{
        //     ret = false;
        // }
        // return ret;
    }

    componentDidMount() {
        // console.log("did mount");
        this.updateCanvas();
    }

    updateCanvas() {

        // let { componentState, actions } = this.props;

        // console.log("comstate:");

        // let data = this.refs.canvas.getAttribute("data");

        // console.log("data:"+this.componentState);

        // const ctx = this.refs.canvas.getContext('2d');
        // ctx.fillStyle = "rgba(255,0,0,0.2)";
        // ctx.fillRect(30,0, 40, 800);
        //
        // ctx.beginPath() ;
        // ctx.lineWidth = 2 ;
        // ctx.strokeStyle = "rgba(255,0,0,0.2)";
        // ctx.moveTo(30,800);
        // ctx.lineTo(20,800);
        // ctx.lineTo(50,820);
        // ctx.lineTo(80,800);
        // ctx.lineTo(70,800);
        // ctx.stroke();
        // ctx.fill();
    }

    componentDidUpdate(){
        // console.log("componentDidUpdate");
        let { componentState } = this.props;
        console.log(componentState);
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0,0,100,900);
        ctx.fillStyle = "rgba(255,0,0,0.2)";
        ctx.fillRect(30,0, 40, 800);

        ctx.beginPath() ;
        ctx.lineWidth = 2 ;
        ctx.strokeStyle = "rgba(255,0,0,0.2)";
        ctx.moveTo(30,800);
        ctx.lineTo(20,800);
        ctx.lineTo(50,820);
        ctx.lineTo(80,800);
        ctx.lineTo(70,800);
        ctx.stroke();
        ctx.fill();
    }

    // updateCanvas1(data) {
    //
    //     // let { componentState, actions } = this.props;
    //
    //     // console.log("comstate:");
    //
    //     // let data = this.refs.canvas.getAttribute("data");
    //
    //     console.log("data:"+data);
    //
    //     const ctx = this.refs.canvas.getContext('2d');
    //     ctx.clearRect(0,0,100,900);
    //     ctx.fillStyle = "rgba(255,0,0,0.2)";
    //     ctx.fillRect(30,0, 40, 800);
    //
    //     ctx.beginPath() ;
    //     ctx.lineWidth = 2 ;
    //     ctx.strokeStyle = "rgba(255,0,0,0.2)";
    //     ctx.moveTo(30,800);
    //     ctx.lineTo(20,800);
    //     ctx.lineTo(50,820);
    //     ctx.lineTo(80,800);
    //     ctx.lineTo(70,800);
    //     ctx.stroke();
    //     ctx.fill();
    // }

    render() {

        let { componentState, actions } = this.props;

        console.log("render");

        // console.log(componentState);

        // console.log("comstate2:"+componentState);

        return (
            <canvas ref="canvas" width={100} height={900} data={componentState}>
                {/*{updateCanvas1()}*/}
            </canvas>
        );

    }
}


// function updateCanvas1() {
//
//     // let { componentState, actions } = this.props;
//
//     console.log("comstate:");
//
//     //let data = refs.canvas.getAttribute("data");
//     let data = findDOMNode(refs.canvas).getAttribute('data');
//
//     console.log("data:"+data);
//
//     const ctx = findDOMNode(refs.canvas).getContext('2d');
//     ctx.fillStyle = "rgba(255,0,0,0.2)";
//     ctx.fillRect(30,0, 40, 800);
//
//     ctx.beginPath() ;
//     ctx.lineWidth = 2 ;
//     ctx.strokeStyle = "rgba(255,0,0,0.2)";
//     ctx.moveTo(30,800);
//     ctx.lineTo(20,800);
//     ctx.lineTo(50,820);
//     ctx.lineTo(80,800);
//     ctx.lineTo(70,800);
//     ctx.stroke();
//     ctx.fill();
// }


export default MyCanvas;