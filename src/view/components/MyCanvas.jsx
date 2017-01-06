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

        let { componentState,pxPerYear,timeLineBeginYear,lastYear,earlyYear,yearInterval } = this.props;

        // console.log(componentState);
        console.log("lastyear:"+lastYear);
        if(lastYear !=0) {
            // console.log("linelength:"+ lineLength);
            const ctx = this.refs.canvas.getContext('2d');
            let canvasWidth = this.refs.canvas.getAttribute('width');
            let canvasHeight = this.refs.canvas.getAttribute('height');
            let lineLength = canvasHeight - 50;

            let yearLength = lastYear - earlyYear;

            //清画布
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            //画主时间箭头
            let canvasXCenterPos = parseInt(canvasWidth/2);
            if(timeLineBeginYear <0 && lastYear>0) {
                //跨公元元年
                ctx.fillStyle = "rgba(0,255,0,0.2)";
                ctx.fillRect(canvasXCenterPos-20, 0, 40, pxPerYear * (timeLineBeginYear * -1));
                ctx.fillStyle = "rgba(255,0,0,0.2)";
                ctx.fillRect(canvasXCenterPos-20,pxPerYear * (timeLineBeginYear * -1), 40,lineLength - pxPerYear * (timeLineBeginYear * -1));

            }else if(timeLineBeginYear <0 && lastYear<=0){
                //都在公元前
                ctx.fillStyle = "rgba(0,255,0,0.2)";
                ctx.fillRect(canvasXCenterPos-20, 0, 40, lineLength);

            }else{
                //都在公元后
                ctx.fillStyle = "rgba(255,0,0,0.2)";
                ctx.fillRect(canvasXCenterPos-20, 0, 40, lineLength);

            }
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgba(255,0,0,0.2)";
            ctx.moveTo(canvasXCenterPos-20, lineLength);
            ctx.lineTo(canvasXCenterPos-30, lineLength);
            ctx.lineTo(canvasXCenterPos, lineLength + 20);
            ctx.lineTo(canvasXCenterPos+30, lineLength);
            ctx.lineTo(canvasXCenterPos+20, lineLength);
            ctx.stroke();
            ctx.fill();

            //画整年份点以及年份数字
            //设置字体样式
            ctx.font = "10px Courier New";
            //设置字体填充颜色和圆点填充颜色
            ctx.fillStyle = "rgba(255,0,0,0.5)";
            for (let i = 0; i <= yearLength + yearInterval; i=i+yearInterval) {
                ctx.beginPath();
                if((timeLineBeginYear + i)<0) {
                    ctx.fillText((timeLineBeginYear + i) * -1, canvasXCenterPos-15, i * pxPerYear + 15);
                    ctx.fillText('B.C.', canvasXCenterPos-15, i * pxPerYear + 25);
                }else if((timeLineBeginYear + i)==0){
                    ctx.fillText('1', canvasXCenterPos-15, i*pxPerYear+15);
                    ctx.fillText('A.D.', canvasXCenterPos-15, i*pxPerYear+25);
                }else{
                    ctx.fillText((timeLineBeginYear + i), canvasXCenterPos-15, i*pxPerYear+15);
                    ctx.fillText('A.D.', canvasXCenterPos-15, i*pxPerYear+25);
                }

                if (i > 0) {
                    ctx.arc(canvasXCenterPos, i * pxPerYear, 5, 0, Math.PI * 2, true);
                }
                ctx.fill();
            }

            //画时间段或时间点
            ctx.fillStyle = "rgba(0,0,255,0.5)";
            ctx.strokeStyle = "rgba(0,255,0,0.5)";
            for (let i = 0; i < componentState.length; i++) {
                ctx.beginPath();
                if(componentState[i].itemType<=2){    //点时间
                    let showYear;
                    if(componentState[i].startYear<0){
                        showYear = Math.abs(componentState[i].startYear) +' B.C.';
                    }else{
                        showYear = componentState[i].startYear + ' A.D.';
                    }
                    if(i%2 ==0){    //偶数项,左边
                        ctx.arc(canvasXCenterPos-40, (componentState[i].startYear - timeLineBeginYear) * pxPerYear, 5, 0, Math.PI * 2, true);
                        ctx.moveTo(canvasXCenterPos-40,(componentState[i].startYear - timeLineBeginYear) * pxPerYear);
                        ctx.lineTo(canvasXCenterPos-parseInt(canvasWidth/2),(componentState[i].startYear - timeLineBeginYear) * pxPerYear);
                        ctx.stroke();
                        ctx.fillText(showYear, canvasXCenterPos-100, (componentState[i].startYear - timeLineBeginYear) * pxPerYear - 10);
                    }else{    //奇数项,右边
                        ctx.arc(canvasXCenterPos+40, (componentState[i].startYear - timeLineBeginYear) * pxPerYear, 5, 0, Math.PI * 2, true);
                        ctx.moveTo(canvasXCenterPos+40,(componentState[i].startYear - timeLineBeginYear) * pxPerYear);
                        ctx.lineTo(canvasXCenterPos+parseInt(canvasWidth/2),(componentState[i].startYear - timeLineBeginYear) * pxPerYear);
                        ctx.stroke();
                        ctx.fillText(showYear,canvasXCenterPos+60, (componentState[i].startYear - timeLineBeginYear) * pxPerYear - 10);
                    }
                }else{    //段时间
                    if(i%2 ==0){    //偶数项,左边
                        ctx.fillRect(canvasXCenterPos-45, (componentState[i].startYear - timeLineBeginYear) * pxPerYear, 10, (componentState[i].endYear - componentState[i].startYear) * pxPerYear);
                    }else{    //奇数项,右边
                        ctx.fillRect(canvasXCenterPos+35, (componentState[i].startYear - timeLineBeginYear) * pxPerYear, 10, (componentState[i].endYear - componentState[i].startYear) * pxPerYear);
                    }

                }
                ctx.fill();
                // ctx.stroke();
            }




        }
    }


    render() {

        let { componentState,canvasWidth,pxPerYear,timeLineBeginYear,lastYear,earlyYear,yearInterval } = this.props;

        let yearLength = lastYear - earlyYear;

        let canvasHeigth = yearLength*pxPerYear <50 ? 300 : (lastYear-timeLineBeginYear+yearInterval)*pxPerYear+ 50;

        return (
            <canvas ref="canvas" width={canvasWidth} height={canvasHeigth}/>
        );

    }
}

export default MyCanvas;