import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';
import styles from '../styles/ProjectsListItem.css';
// import appleimage from '../images/apple.png';

class ProjectsListItem extends React.Component {

    shouldComponentUpdate(nextProps){
        return nextProps.componentState != this.props.componentState;
    }

    render() {

        let { componentState, actions } = this.props;

        // if (componentState.isEaten) return null;


        return (
            <div className={styles.projectsListItem}>
                {/*<div className={styles.apple}><img src="../images/apple.png" alt=""/></div>*/}
                {/*<div className={styles.apple}><img src={appleimage} alt=""/></div>*/}
                <div className={styles.info}>
                    {/*<div className={styles.name}> 项目 - {componentState.id}号</div>*/}
                    <div className={styles.name}>{componentState.projectname}</div>
                </div>
                <div className={styles.createdate}>
                    <div className={styles.name}>{componentState.createtime}</div>
                </div>
                {/*<div className={styles.btndiv}>*/}
                    {/*<button onClick={() => actions.eatApple(componentState.id) }>吃掉</button>*/}
                {/*</div>*/}
            </div>
        );

    }


}

export default ProjectsListItem;