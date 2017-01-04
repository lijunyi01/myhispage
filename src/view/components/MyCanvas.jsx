import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { findDOMNode } from 'react-dom';

let earlyYear =0 ;
let lastYear = 0;

class MyCanvas extends React.Component {

    shouldComponentUpdate(nextProps){
        return ((nextProps.componentState != this.props.componentState) || nextProps.canvasWidth != this.props.canvasWidth);
    }

    componentDidMount() {
        console.log("didmount");
        this.componentDidUpdate();
    }

    componentDidUpdate(){

        let { componentState } = this.props;

        // console.log(componentState);
        console.log("lastyear:"+lastYear);
        if(lastYear !=0) {
            // console.log("linelength:"+ lineLength);
            const ctx = this.refs.canvas.getContext('2d');
            let canvasWidth = this.refs.canvas.getAttribute('width');
            let canvasHeight = this.refs.canvas.getAttribute('height');
            let lineLength = canvasHeight - 50;

            let yearLength = lastYear - earlyYear;
            let pxPerYear = getPxPerYear(yearLength);
            let yearInterval = getYearInterval(yearLength);
            let timeLineBeginYear = getTimeLineBeginYear(earlyYear,yearInterval);
            // console.log(timeLineBeginYear);
            // console.log(earlyYear);

            //清画布
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            //画主时间箭头
            if(timeLineBeginYear <0 && lastYear>0) {
                //跨公元元年
                ctx.fillStyle = "rgba(0,255,0,0.2)";
                ctx.fillRect(30, 0, 40, pxPerYear * (timeLineBeginYear * -1));
                ctx.fillStyle = "rgba(255,0,0,0.2)";
                ctx.fillRect(30,pxPerYear * (timeLineBeginYear * -1), 40,lineLength - pxPerYear * (timeLineBeginYear * -1));

                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = "rgba(255,0,0,0.2)";
                ctx.moveTo(30, lineLength);
                ctx.lineTo(20, lineLength);
                ctx.lineTo(50, lineLength + 20);
                ctx.lineTo(80, lineLength);
                ctx.lineTo(70, lineLength);
                ctx.stroke();
                ctx.fill();
            }else if(timeLineBeginYear <0 && lastYear<=0){
                //都在公元前
                ctx.fillStyle = "rgba(0,255,0,0.2)";
                ctx.fillRect(30, 0, 40, lineLength);

                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = "rgba(0,255,0,0.2)";
                ctx.moveTo(30, lineLength);
                ctx.lineTo(20, lineLength);
                ctx.lineTo(50, lineLength + 20);
                ctx.lineTo(80, lineLength);
                ctx.lineTo(70, lineLength);
                ctx.stroke();
                ctx.fill();
            }else{
                //都在公元后
                ctx.fillStyle = "rgba(255,0,0,0.2)";
                ctx.fillRect(30, 0, 40, lineLength);

                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = "rgba(255,0,0,0.2)";
                ctx.moveTo(30, lineLength);
                ctx.lineTo(20, lineLength);
                ctx.lineTo(50, lineLength + 20);
                ctx.lineTo(80, lineLength);
                ctx.lineTo(70, lineLength);
                ctx.stroke();
                ctx.fill();
            }

            //画整年份点以及年份数字
            //设置字体样式
            ctx.font = "10px Courier New";
            //设置字体填充颜色和圆点填充颜色
            ctx.fillStyle = "rgba(255,0,0,0.5)";
            for (let i = 0; i <= yearLength + yearInterval; i=i+yearInterval) {
                ctx.beginPath();
                if((timeLineBeginYear + i)<0) {
                    ctx.fillText((timeLineBeginYear + i) * -1, 35, i * pxPerYear + 15);
                    ctx.fillText('B.C.', 35, i * pxPerYear + 25);
                }else if((timeLineBeginYear + i)==0){
                    ctx.fillText('1', 35, i*pxPerYear+15);
                    ctx.fillText('A.D.', 35, i*pxPerYear+25);
                }else{
                    ctx.fillText((timeLineBeginYear + i), 35, i*pxPerYear+15);
                    ctx.fillText('A.D.', 35, i*pxPerYear+25);
                }

                if (i > 0) {
                    ctx.arc(50, i * pxPerYear, 5, 0, Math.PI * 2, true);
                }
                ctx.fill();
            }

            //画时间段或时间点
            ctx.fillStyle = "rgba(0,0,255,0.5)";
            for (let i = 0; i < componentState.length; i++) {
                ctx.beginPath();
                if(componentState[i].itemType<=2){    //点时间
                    if(i%2 ==0){    //偶数项,左边
                        ctx.arc(10, (componentState[i].startYear - timeLineBeginYear) * pxPerYear, 5, 0, Math.PI * 2, true);
                        ctx.fillText(Math.abs(componentState[i].startYear), 8, (componentState[i].startYear - timeLineBeginYear) * pxPerYear + 15);
                    }else{    //奇数项,右边
                        ctx.arc(90, (componentState[i].startYear - timeLineBeginYear) * pxPerYear, 5, 0, Math.PI * 2, true);
                        ctx.fillText(Math.abs(componentState[i].startYear), 86, (componentState[i].startYear - timeLineBeginYear) * pxPerYear + 15);
                    }
                }else{    //段时间
                    if(i%2 ==0){    //偶数项,左边
                        ctx.fillRect(5, (componentState[i].startYear - timeLineBeginYear) * pxPerYear, 10, (componentState[i].endYear - componentState[i].startYear) * pxPerYear);
                    }else{    //奇数项,右边
                        ctx.fillRect(85, (componentState[i].startYear - timeLineBeginYear) * pxPerYear, 10, (componentState[i].endYear - componentState[i].startYear) * pxPerYear);
                    }

                }
                ctx.fill();
                // ctx.stroke();
            }




        }
    }


    render() {

        let { componentState,canvasWidth } = this.props;

        earlyYear = 0;
        lastYear = 0;
        console.log("canvas render");
        // console.log(componentState);
        console.log("canvas width:" + canvasWidth);
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

        let yearLength = lastYear - earlyYear;
        let pxPerYear = getPxPerYear(yearLength);
        let yearInterval = getYearInterval(yearLength);
        let timeLineBeginYear = getTimeLineBeginYear(earlyYear,yearInterval);

        let canvasHeigth = yearLength*pxPerYear <50 ? 300 : (lastYear-timeLineBeginYear+yearInterval)*pxPerYear+ 50;

        return (
            <canvas ref="canvas" width={canvasWidth} height={canvasHeigth}/>
        );

    }
}

function getPxPerYear(yearLength) {
    let ret;
    if(yearLength <50){
        ret = 30;
    }else if(yearLength <100){
        ret = 20;
    }else if(yearLength <500){
        ret = 10;
    }else if(yearLength <1000){
        ret = 5;
    }else if(yearLength <5000){
        ret = 1;
    }else{
        ret = 5000/yearLength;
    }
    return ret;
}

function getYearInterval(yearLength) {
    let ret;
    if(yearLength <50){
        ret = 5;
    }else if(yearLength <100){
        ret = 10;
    }else if(yearLength <500){
        ret = 25;
    }else if(yearLength <1000){
        ret = 50;
    }else if(yearLength <5000){
        ret = 100;
    }else{
        ret = 200;
    }
    return ret;
}

function getTimeLineBeginYear(earlyYear,yearInterval) {
    let ret = 0;
    if(earlyYear < 0){
        ret = ((parseInt(earlyYear/yearInterval))-1)*yearInterval;
    }else{
        if(earlyYear == (parseInt(earlyYear/yearInterval))*yearInterval){    //earlyYear 在箭头起点,则将箭头起点提前
            ret = earlyYear - yearInterval;
        }else {
            ret = (parseInt(earlyYear / yearInterval)) * yearInterval;
        }
    }
    return ret;
}

export default MyCanvas;