import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';
import styles from '../styles/ProjectsList.css';
// import appleimage from '../images/apple.png';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';

class ProjectsListItem extends React.Component {

    shouldComponentUpdate(nextProps){
        return (nextProps.componentState != this.props.componentState || nextProps.activeId != this.props.activeId);
    }

    render() {

        let { componentState, actions ,activeId } = this.props;

        return (
            <div className={styles.projectsListItem}>
                <div className={styles.projectsListItem2} onClick={() => actions.getProjectContent(componentState.id)} >
                    <div className={styles.left}>
                        <div className={styles.name}>{componentState.projectname}</div>
                        <div className={styles.des}>{componentState.projectdes}</div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.up}>
                            <div className={styles.buttons}>
                                <div className={styles.button1} title="修改笔记"></div>
                                <div className={styles.button2} title="删除笔记"></div>
                                {/*<div className={styles.button2group}>*/}
                                    {/*<div className={styles.button2}></div>*/}
                                    {/*<div className={styles.button2des}>删除笔记</div>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <div className={styles.down}> {componentState.createtime}</div>
                    </div>
                </div>
            </div>
        );

    }
}

export default ProjectsListItem;