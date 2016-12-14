import React from 'react';
import { connect } from 'react-redux';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';
import styles from '../styles/MyHisList.css';
import ProjectsListItem from '../components/ProjectsListItem';
import actions from '../../actions/myHisListAction_creators';
import { bindActionCreators } from 'redux';
import { Button,Col,ListGroup } from 'react-bootstrap';
import AddProjectModal from '../components/AddProjectModal';
import ConfirmModal from '../components/ConfirmModal';
import ResultModal from '../components/ResultModal';


class MyHisList extends React.Component {

    shouldComponentUpdate(nextProps){
        return nextProps.containerState != this.props.containerState;
    }

    render() {

        let {containerState, actioncreator} = this.props;

        if (containerState.projectsList.length == 0 && containerState.justLogin == true) {
            actioncreator.getAllProjects();
        }

        // actioncreator.getAllProjects();

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
                            <div className={styles.button1}></div>
                            <div className={styles.button1}>
                                <Button bsSize="sm" bsStyle="success" onClick={actioncreator.addProjectButtonClick}>新建</Button>
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
                        ): <div>暂无项目,请创建</div>
                        }
                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles.top}>
                        <div className={styles.top2}>
                        </div>
                    </div>

                    <div className={styles.bottom}>
                        <div className={styles.bottom2}>
                        </div>
                    </div>

                </div>

                <AddProjectModal componentState={containerState.addProjectModal}
                                 actions={{shutAddProjectModal: actioncreator.shutAddProjectModal,
                                           createProj: actioncreator.createProj,
                                           popAlertAddProj: actioncreator.popAlertAddProj,
                                           shutSelfCheckModal: actioncreator.shutSelfCheckModal
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


export default connect(selectState,buildActionDispatcher)(MyHisList);