import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';
import styles from '../styles/ItemTipInModal.css';
// import appleimage from '../images/apple.png';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';

class ItemTipInModal extends React.Component {

    shouldComponentUpdate(nextProps){
        return (nextProps.componentState != this.props.componentState);
    }

    render() {

        let { componentState,itemId,actions } = this.props;
        
        return (
            <div className={styles.itemTipInModal}>
                <div className={styles.info}>{componentState.tipcontent}</div>
                <div className={styles.buttons}>
                    <OverlayTrigger placement="right" overlay={tooltip1}>
                        <div className={styles.delbutton} onClick={ ()=>{actions.deleteTip(componentState.id,itemId)}}>

                        </div>
                    </OverlayTrigger>
                </div>
            </div>
        );

    }
}

const tooltip1 = (
    <Tooltip id="tooltip1"><strong>删除本条TIP</strong></Tooltip>
);


export default ItemTipInModal;
