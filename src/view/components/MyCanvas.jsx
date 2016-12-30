import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { findDOMNode } from 'react-dom';

let earlyYear =0 ;
let lastYear = 0;

class MyCanvas extends React.Component {

    shouldComponentUpdate(nextProps){
        return (nextProps.componentState != this.props.componentState);
    }

    componentDidMount() {
    }

    componentDidUpdate(){

        let { componentState } = this.props;

        // console.log(componentState);
        if(lastYear !=0) {
            // console.log("linelength:"+ lineLength);
            const ctx = this.refs.canvas.getContext('2d');
            let canvasWidth = this.refs.canvas.getAttribute('width');
            let canvasHeight = this.refs.canvas.getAttribute('height');
            let lineLength = canvasHeight -50;

            ctx.clearRect(0, 0, canvasWidth,canvasHeight);
            ctx.fillStyle = "rgba(255,0,0,0.2)";
            ctx.fillRect(30, 0, 40, lineLength);

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgba(255,0,0,0.2)";
            ctx.moveTo(30, lineLength);
            ctx.lineTo(20, lineLength);
            ctx.lineTo(50, lineLength+20);
            ctx.lineTo(80, lineLength);
            ctx.lineTo(70, lineLength);
            ctx.stroke();
            ctx.fill();
        }
    }


    render() {

        let { componentState } = this.props;

        earlyYear = 0;
        lastYear = 0;
        if(componentState != undefined) {
            for (let i = 0; i < componentState.length; i++) {
                if (earlyYear == 0) {
                    earlyYear = componentState[i].startYear;
                } else {
                    if (componentState[i].startYear < earlyYear) {
                        earlyYear = componentState[i].startYear;
                    }
                }

                if (lastYear == 0) {
                    lastYear = componentState[i].endYear;
                } else {
                    if (componentState[i].endYear > lastYear) {
                        lastYear = componentState[i].endYear;
                    }
                }
            }
        }

        let canvasHeigth = (lastYear - earlyYear)*5 <50 ? 100 : (lastYear - earlyYear)*5+ 50;

        return (
            <canvas ref="canvas" width={100} height={canvasHeigth}/>
        );

    }
}

export default MyCanvas;