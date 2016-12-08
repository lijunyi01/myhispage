import React from 'react';
import { connect } from 'react-redux';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';
import styles from '../styles/MyHisList.css';
import ProjectsListItem from '../components/ProjectsListItem';
import actions from '../../actions/myHisListAction_creators';
import { bindActionCreators } from 'redux';
import { Row,Col,ListGroup } from 'react-bootstrap';


class MyHisList extends React.Component {

    shouldComponentUpdate(nextProps){
        return nextProps.containerState != this.props.containerState;
    }

    render() {

        let {containerState, actioncreator} = this.props;

        if (containerState.projectsList.length == 0) {
            actioncreator.getAllProjects();
        }

        return (
            <div className={styles.myHisListMain}>
                <div className={styles.list}>
                    <div className={styles.top}>
                       <p>我的笔记</p>
                    </div>
                    <div className={styles.bottom}>
                        {containerState.projectsList.map(project => <ProjectsListItem key={project.id} componentState ={project} activeId={containerState.activeId} actions={{getProjectContent: actioncreator.getProjectContent}} />)}
                    </div>
                </div>
                <div className={styles.main}>

                </div>
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