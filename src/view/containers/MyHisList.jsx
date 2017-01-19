import React from 'react';
import { connect } from 'react-redux';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
import { render,findDOMNode } from 'react-dom';
import styles from '../styles/MyHisList.css';
import ProjectsListItem from '../components/ProjectsListItem';
import actions from '../../actions/myHisListAction_creators';
import { bindActionCreators } from 'redux';
import { Button,Col,ListGroup,ButtonToolbar } from 'react-bootstrap';
import AddProjectModal from '../components/AddProjectModal';
import ConfirmModal from '../components/ConfirmModal';
import ResultModal from '../components/ResultModal';
import AddItemModal from '../components/AddItemModal';
import MyCanvas from '../components/MyCanvas';
import ItemInMain from '../components/ItemInMain';
import ChangeTipsModal from '../components/ChangeTipsModal';



let itemInMainParam = {};

class MyHisList extends React.Component {

    shouldComponentUpdate(nextProps){
        return nextProps.containerState != this.props.containerState;
    }

    componentDidMount(){
        //延时调用
        // setTimeout(()=>{
        //     console.log("MyHisList did mount");
        // },5000);

        // setInterval(()=>{
        //     console.log("MyHisList did mount");
        // },5000);

        window.addEventListener('resize',()=>{console.log('window resize');this.setCanvasWidth()},false);

    }


    componentDidUpdate() {

        this.setCanvasWidth();

    }

    setCanvasWidth() {
        let {containerState, actioncreator} = this.props;

        console.log("set canvas width");
        let divdom = findDOMNode(this.refs.canvasdiv2);
        if(divdom != undefined) {
            let specs = divdom.getBoundingClientRect();
            let canvasWidth = specs.width;
            console.log("width:" + canvasWidth);
            if (canvasWidth != containerState.canvasWidthforActiveId) {
                actioncreator.setCanvasWidth(canvasWidth);
            }
        }

    }

    getLeftPos(projectId,index,topPos,timeLineBeginYear,pxPerYear){

        let { containerState } = this.props;

        let itemList = containerState.projectContents[projectId];

        let leftPos;

        if(index%2 ==0) {
            leftPos =40;
            if (index >= 2) {
                if (topPos == itemInMainParam[index - 2].topPos) {
                    leftPos = itemInMainParam[index - 2].leftPos - 15;

                } else if (Math.abs(topPos - itemInMainParam[index - 2].topPos) < 90) {
                    if (itemInMainParam[index - 2].leftPos == 40) {
                        leftPos = 50;
                    }
                }

            }
        }else{
            leftPos = containerState.canvasWidthforActiveId/0.3*0.65;
            if (index >= 2) {
                if (topPos == itemInMainParam[index - 2].topPos) {
                    leftPos = itemInMainParam[index - 2].leftPos + 15;

                } else if (Math.abs(topPos - itemInMainParam[index - 2].topPos) < 90) {
                    if (itemInMainParam[index - 2].leftPos == leftPos) {
                        leftPos = leftPos -10;
                    }
                }

            }
        }
        return leftPos;
    }

    getTopPos(projectId,index,timeLineBeginYear,pxPerYear){

        let { containerState } = this.props;
        let marginTop = 30;
        let topPos = marginTop;

        let itemList = containerState.projectContents[projectId];

        if(itemList[index].itemType < 3) {    //点事件
            topPos = (itemList[index].startYear - timeLineBeginYear) * pxPerYear - 40 + marginTop;
        }else{       //段事件
            let rectTopY = (itemList[index].startYear - timeLineBeginYear) * pxPerYear + marginTop;
            let rectHeight = (itemList[index].endYear - itemList[index].startYear) * pxPerYear;
            topPos = rectTopY + rectHeight/2 -40;
        }

        return topPos;
    }

    render() {

        let {containerState, actioncreator} = this.props;

        if (containerState.projectsList.length == 0 && containerState.justLogin == true) {
            actioncreator.getAllProjects();
        }

        itemInMainParam = {};

        let lastYear = 0;
        let earlyYear = 0;
        let projectItemList = containerState.projectContents[containerState.activeId];
        if( projectItemList != undefined) {
            for (let i = 0; i < projectItemList.length; i++) {
                if (earlyYear == 0) {
                    earlyYear = projectItemList[i].startYear;
                } else {
                    if (projectItemList[i].startYear < earlyYear) {
                        earlyYear = projectItemList[i].startYear;
                    }
                }

                if (lastYear == 0) {
                    lastYear = projectItemList[i].endYear;
                } else {
                    if (projectItemList[i].endYear > lastYear) {
                        lastYear = projectItemList[i].endYear;
                    }
                }
            }
        }

        let yearLength = lastYear - earlyYear;
        let pxPerYear = getPxPerYear(yearLength);
        let yearInterval = getYearInterval(yearLength);
        let timeLineBeginYear = getTimeLineBeginYear(earlyYear,yearInterval);

        return (
            <div className={styles.myHisListMain}>
                <div className={styles.list} style={{display:(containerState.fullsizeShow?"none":"block")}}>
                    <div className={styles.top}>
                        <div className={styles.infoarea}>
                            <p>我的笔记</p>
                        </div>
                        <div className={styles.buttonarea}>
                            <div className={styles.button1}></div>
                            <div className={styles.button1}></div>
                            <div className={styles.button1}></div>
                            <div className={styles.button1}>
                                <Button bsSize="sm" bsStyle="success" onClick={actioncreator.addProjectButtonClick}>新建笔记</Button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottom}>
                        {containerState.projectsList.length > 0 ?
                            containerState.projectsList.map(project => <ProjectsListItem key={project.id} componentState ={project} activeId={containerState.activeId}
                                                                                      actions={{getProjectContent: actioncreator.getProjectContent,
                                                                                                deleteProj: actioncreator.deleteProj,
                                                                                                showConfirm: actioncreator.showConfirm,
                                                                                      }}
                                                                    />
                        ): containerState.justLogin? <div>loading...</div> : <div>暂无项目,请创建</div>
                        }
                    </div>
                </div>
                <div className={styles.main} style={{width:(containerState.fullsizeShow?"100%":"calc(100% - 300px)")}}>
                    <div className={styles.top} style={{display:(containerState.fullsizeShow?"none":"block")}}>
                        <div className={styles.top2}>
                            <div className={styles.info}>
                            </div>
                            <div className={styles.toolbar}>
                                { containerState.activeId == -1?
                                    <ButtonToolbar>
                                        <Button bsSize="sm" bsStyle="success" disabled>新增事件</Button>
                                    </ButtonToolbar>
                                    :
                                    <ButtonToolbar>
                                        <Button bsSize="sm" bsStyle="success"
                                                onClick={()=>actioncreator.addItemButtonClick(containerState.activeId)}>新增事件</Button>
                                    </ButtonToolbar>
                                }
                            </div>
                        </div>
                    </div>

                    <div className={styles.bottom}  onDoubleClick={actioncreator.zoomButtonClick} style={{height:(containerState.fullsizeShow?"100%":"calc(100% - 100px)")}}>
                        {   (containerState.projectContents[containerState.activeId] == undefined || containerState.projectContents[containerState.activeId].length == 0) ?
                            <div className={styles.bottom2empty}>空空如也</div>
                            :
                            <div className={styles.bottom2}>
                                {   hasHighLevelItem(containerState.projectContents[containerState.activeId])?
                                    <div className={styles.timebackground}>
                                        <div id='canvasdiv1' className={styles.timeline}>
                                            <MyCanvas componentState={containerState.projectContents[containerState.activeId]}/>
                                        </div>
                                        <div className={styles.itemsright}>

                                        </div>
                                    </div>
                                    :
                                    <div className={styles.notimebackground}>
                                        <div className={styles.zoomdiv} onClick={
                                            (event) => {
                                                event.stopPropagation();
                                                actioncreator.zoomButtonClick();
                                        }}>

                                        </div>

                                        {
                                            containerState.projectContents[containerState.activeId].map(
                                                (item, index)=> {
                                                    let topPos=0;
                                                    topPos = this.getTopPos(containerState.activeId,index,timeLineBeginYear,pxPerYear);
                                                    let leftPos=0;
                                                    leftPos = this.getLeftPos(containerState.activeId,index,topPos,timeLineBeginYear,pxPerYear);
                                                    itemInMainParam[index] = {'topPos':topPos,'leftPos':leftPos};

                                                    return <ItemInMain key={item.itemId} componentState={item} leftPos={leftPos} topPos={topPos} index={index}
                                                                       actions={{modifyTipsButtonClick:actioncreator.modifyTipsButtonClick,
                                                                       }}
                                                           />
                                                }
                                            )
                                        }
                                        <div ref="canvasdiv2" className={styles.timeline}>
                                            <MyCanvas componentState={containerState.projectContents[containerState.activeId]} canvasWidth={containerState.canvasWidthforActiveId}
                                                      pxPerYear={pxPerYear} timeLineBeginYear={timeLineBeginYear} lastYear={lastYear} earlyYear={earlyYear} yearInterval={yearInterval}/>
                                        </div>

                                    </div>
                                }
                            </div>
                        }
                    </div>

                </div>

                <AddProjectModal componentState={containerState.addProjectModal}
                                 actions={{shutAddProjectModal: actioncreator.shutAddProjectModal,
                                           createProj: actioncreator.createProj,
                                           popAlert: actioncreator.popAlert,
                                           shutSelfCheckModal: actioncreator.shutSelfCheckModal
                                         }
                                 }
                />

                <AddItemModal componentState={containerState.addItemModal}
                                 actions={{shutAddItemModal: actioncreator.shutAddItemModal,
                                     createItem: actioncreator.createItem,
                                     popAlert: actioncreator.popAlert,
                                     shutSelfCheckModal: actioncreator.shutSelfCheckModal,
                                     changeTmRadio:actioncreator.changeTmRadio,
                                     changeYearRadio:actioncreator.changeYearRadio,
                                     createProjItem: actioncreator.createProjItem
                                     }
                                 }
                />

                <ConfirmModal componentState={containerState.confirmModal}
                              actions={{
                                  shutConfirmModal: actioncreator.shutConfirmModal,
                                  deleteProj: actioncreator.deleteProj
                              }}

                />

                <ChangeTipsModal componentState={containerState.changeTipsModal}
                                 itemTipMapList={(containerState.activeId != -1 && containerState.activeItemIndex!= -1)? containerState.projectContents[containerState.activeId][containerState.activeItemIndex].itemTipMapList :[]}
                                 actions={{
                                     shutChangeTipsModal: actioncreator.shutChangeTipsModal,
                                 }}
                />

                <ResultModal componentState={containerState.resultModal} actions={{shutResultModal: actioncreator.shutResultModal}}/>

            </div>
        );
    }

}

function selectState(state) {
    return {
        containerState: state.myHisListState
    };
}

function buildActionDispatcher(dispatch) {
    return {
        actioncreator: bindActionCreators(actions, dispatch)
    };
}

function hasHighLevelItem(list) {
    let ret = false;
    for (let i = 0; i < list.length; i++) {
        if (list[i].itemLevel > 0) {
            ret = true;
            break;
        }
    }
    return ret;
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


export default connect(selectState,buildActionDispatcher)(MyHisList);