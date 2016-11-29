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

        // if (componentState.isEaten) return null;


        return (
            // <div className={styles.projectsListItem}>
            //     {/*<div className={styles.apple}><img src="../images/apple.png" alt=""/></div>*/}
            //     {/*<div className={styles.apple}><img src={appleimage} alt=""/></div>*/}
            //     <div className={styles.info}>
            //         {/*<div className={styles.name}> 项目 - {componentState.id}号</div>*/}
            //         <div className={styles.name}>{componentState.projectname}</div>
            //     </div>
            //     <div className={styles.createdate}>
            //         <div className={styles.name}>{componentState.createtime}</div>
            //     </div>
            //
            // </div>
            <div>
            { activeId == componentState.id ?
                <ListGroupItem href="#1" header={componentState.projectname} active>
                    {componentState.projectdes}

                </ListGroupItem>
                :
                <ListGroupItem href="#1" header={componentState.projectname} onClick={()=>actions.clickItem(componentState.id)} >

                    {componentState.projectdes}

                </ListGroupItem>
            }
            </div>
        );

    }


}

export default ProjectsList;