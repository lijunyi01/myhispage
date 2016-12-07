import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';
import styles from '../styles/ProjectsList.css';
// import appleimage from '../images/apple.png';
import { ListGroupItem } from 'react-bootstrap';

class ProjectsList extends React.Component {

    shouldComponentUpdate(nextProps){
        return (nextProps.componentState != this.props.componentState || nextProps.activeId != this.props.activeId);
    }

    render() {

        let { componentState, actions ,activeId } = this.props;

        return (
            <div className={styles.projectsListItem}>
                <div className={styles.projectsListItem2} onClick={() => actions.getProjectContent(componentState.id)} >
                    <div className={styles.info}>
                        <div className={styles.name}>{componentState.projectname}</div>
                        <div className={styles.des}>{componentState.projectdes}</div>
                    </div>
                    <div className={styles.createdate}>
                        {componentState.createtime}
                    </div>
                </div>
            </div>
        );

    }
}

export default ProjectsList;