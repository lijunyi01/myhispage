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
import ItemInMainR from '../components/ItemInMainR';


class MyHisList extends React.Component {

    shouldComponentUpdate(nextProps){
        return nextProps.containerState != this.props.containerState;
    }

    componentDidMount(){
        console.log("MyHisList did mount");
    }


    componentDidUpdate() {
        let {containerState, actioncreator} = this.props;

        console.log("MyHisList did update");
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


    render() {

        let {containerState, actioncreator} = this.props;

        if (containerState.projectsList.length == 0 && containerState.justLogin == true) {
            actioncreator.getAllProjects();
        }

        let ileft = 0;

        return (
            <div className={styles.myHisListMain}>
                <div className={styles.list}>
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
                <div className={styles.main}>
                    <div className={styles.top}>
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

                    <div className={styles.bottom}>
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
                                        <div className={styles.itemsleft}>
                                            {
                                                containerState.projectContents[containerState.activeId].map(
                                                    (item, index)=> {
                                                        return <ItemInMain key={item.itemId} componentState={item}
                                                                           index={index}/>
                                                    }
                                                )
                                            }
                                        </div>
                                        <div ref="canvasdiv2" className={styles.timeline}>
                                            <MyCanvas componentState={containerState.projectContents[containerState.activeId]} canvasWidth={containerState.canvasWidthforActiveId}/>
                                        </div>
                                        <div className={styles.itemsright}>

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


export default connect(selectState,buildActionDispatcher)(MyHisList);