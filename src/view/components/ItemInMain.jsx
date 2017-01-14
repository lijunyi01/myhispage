import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';
import styles from '../styles/ItemInMain.css';
// import appleimage from '../images/apple.png';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';

class ItemInMain extends React.Component {

    shouldComponentUpdate(nextProps){
        return (nextProps.componentState != this.props.componentState);
    }

    render() {

        let { componentState,leftPos,topPos,actions } = this.props;
        
        return (
            <div>
            {   componentState.itemType < 3?
                <div className={styles.ItemInMain} style={{top: topPos, left: leftPos}}>
                    <div className={styles.itemName}>{componentState.itemName}</div>
                    <div className={styles.itemDes}>{componentState.itemContent}</div>
                </div>
                :
                <div className={styles.ItemInMainD} style={{top: topPos, left: leftPos}}>
                    <div className={styles.itemName}>{componentState.itemName}</div>
                    <div className={styles.itemDes}>{componentState.itemContent}</div>
                    <div className={styles.itemTime}>
                        <div className={styles.startYear}>{componentState.startYear}</div>
                        <div className={styles.endYear}>{componentState.endYear}</div>
                    </div>
                    <div className={styles.itemButtons}>
                        <OverlayTrigger placement="bottom" overlay={tooltip1}>
                            <div className={styles.button1} onClick={
                                (event) => {
                                    event.stopPropagation();
                                    {/*actions.showConfirm({title:confirmModalTitle,content:confirmModalContent,id:componentState.id})*/}
                                }
                            }>
                            </div>
                        </OverlayTrigger>
                    </div>
                </div>
            }
            </div>
        );

    }
}

const tooltip1 = (
    <Tooltip id="tooltip1"><strong>删除</strong></Tooltip>
);


export default ItemInMain;