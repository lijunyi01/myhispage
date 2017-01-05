import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';
import styles from '../styles/ProjectsListItem.css';
// import appleimage from '../images/apple.png';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';

class ProjectsListItem extends React.Component {

    shouldComponentUpdate(nextProps){
        return (nextProps.componentState != this.props.componentState || nextProps.activeId != this.props.activeId);
    }

    render() {

        let { componentState, actions ,activeId } = this.props;

        let confirmModalContent = '您确认删除笔记:"'+ componentState.projectname + '" 吗?';
        let confirmModalTitle = '删除笔记确认';

        return (
            //{activeId == componentState.id ? styles.projectsListItemAction :styles.projectsListItem}
            <div className={activeId == componentState.id ? styles.projectsListItemActive :styles.projectsListItem }>
                <div className={styles.projectsListItem2} onClick={() => actions.getProjectContent(componentState.id)}>
                    <div className={styles.left}>
                        <div className={styles.name}>{componentState.projectname}</div>
                        <div className={styles.des}>{componentState.projectdes}</div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.up}>
                            <div className={styles.buttons}>

                                <OverlayTrigger placement="bottom" overlay={tooltip1}>
                                    <div className={styles.button1}></div>
                                </OverlayTrigger>

                                <OverlayTrigger placement="bottom" overlay={tooltip2}>
                                    {/*<div className={styles.button2} onClick={() => actions.deleteProj(componentState.id)}></div>*/}
                                    <div className={styles.button2} onClick={
                                        (event) => {
                                            event.stopPropagation();
                                            actions.showConfirm({title:confirmModalTitle,content:confirmModalContent,id:componentState.id})
                                        }
                                    }>
                                    </div>
                                </OverlayTrigger>

                            </div>
                        </div>
                        <div className={styles.down}> {componentState.createtime}</div>
                    </div>
                </div>
            </div>
        );

    }
}

const tooltip1 = (
    <Tooltip id="tooltip1"><strong>修改笔记</strong></Tooltip>
);

const tooltip2 = (
    <Tooltip id="tooltip2"><strong>删除笔记</strong></Tooltip>
);


export default ProjectsListItem;