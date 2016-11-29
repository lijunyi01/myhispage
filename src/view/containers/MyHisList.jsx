import React from 'react';
import { connect } from 'react-redux';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';
import styles from '../styles/MyHisList.css';
import ProjectsList from '../components/ProjectsList';
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
            // <div className={styles.myHisListMain}>
            //     <div className={styles.myHisList}>
            //         <div className={styles.projectList}>
            //             { containerState.projectsList.length==0?
            //                 <div className={styles.emptytip}></div>
            //                 : containerState.projectsList.map(project => <ProjectsList key={project.id} componentState ={project} />) }
            //         </div>
            //     </div>
            //     <div className={styles.oneItem}>
            //         <p>asdfadfeeeeeeeeeeeeeeeeeeeeee</p>
            //     </div>
            // </div>
            <Row>
                <Col md={4}>
                    <Row>
                        <p>This is a list</p>
                    </Row>
                    <ListGroup>
                    {/*<div className={styles.myHisList}>*/}
                        {/*<div className={styles.projectList}>*/}
                            { containerState.projectsList.length==0?
                                <div className={styles.emptytip}></div>
                                : containerState.projectsList.map(project => <ProjectsList key={project.id} componentState ={project} activeId={containerState.activeId} />)
                            }
                        {/*</div>*/}
                    {/*</div>*/}
                    </ListGroup>
                </Col>
                <Col md={4} smHidden xsHidden>
                    <div className={styles.oneItem}>
                        <p>asdfasdfsadfsadf</p>
                    </div>
                </Col>
            </Row>
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