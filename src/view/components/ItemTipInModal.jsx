import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';
import styles from '../styles/ItemTipInModal.css';
// import appleimage from '../images/apple.png';
// import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';

class ItemTipInModal extends React.Component {

    shouldComponentUpdate(nextProps){
        return (nextProps.componentState != this.props.componentState);
    }

    render() {

        let { componentState,actions } = this.props;
        
        return (
            <div className={styles.itemTipInModal}>
                <div className={styles.left}>T :</div>
                <div className={styles.right}>{componentState.tipcontent}</div>
            </div>
        );

    }
}


export default ItemTipInModal;
