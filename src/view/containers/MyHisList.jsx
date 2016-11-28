import React from 'react';
import { connect } from 'react-redux';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';
import styles from '../styles/MyHisList.css';
import ProjectsListItem from '../components/ProjectsListItem';
import actions from '../../actions/myHisListAction_creators';
import { bindActionCreators } from 'redux';


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
            <div className={styles.myHisList}>
                <div className={styles.projectList}>
                    { containerState.projectsList.length==0?
                        <div className={styles.emptytip}>您还没有建立过项目</div>
                        : containerState.projectsList.map(project => <ProjectsListItem key={project.id} componentState ={project} />) }
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