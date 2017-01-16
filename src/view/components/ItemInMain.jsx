import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';
import styles from '../styles/ItemInMain.css';
// import appleimage from '../images/apple.png';
import ItemTip from '../components/ItemTip';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';

class ItemInMain extends React.Component {

    shouldComponentUpdate(nextProps){
        return (nextProps.componentState != this.props.componentState);
    }

    render() {

        let { componentState,leftPos,topPos,index,actions } = this.props;

        return (
            <div>
            {   componentState.itemType < 3?
                <div className={styles.ItemInMain} style={{top: topPos, left: leftPos}}>
                    <div className={styles.itemName}>{componentState.itemName}</div>
                    <div className={styles.itemDes}>{componentState.itemContent}</div>
                </div>
                :
                <div className={styles.ItemInMainD} style={{top: topPos, left: leftPos }}>
                    <div className={styles.itemNameO}>
                        <div className={styles.tFlag}>
                            {   componentState.itemTipMapList.length >0 ? <b>T</b> : <b></b> }
                        </div>
                        <div className={styles.itemName}>{componentState.itemName}</div>
                        <div className={styles.fFlag}>
                            {   componentState.itemFileMapList.length >0 ? <b>F</b> : <b></b> }
                        </div>
                    </div>
                    <div className={styles.itemDes}>{componentState.itemContent}</div>
                    <div className={styles.itemTips}>
                    {
                        componentState.itemTipMapList.map(
                            (item, index)=> {
                                return <ItemTip key={item.id} componentState={item}/>
                                {/*<div style={{boder:solid}} key={item.id}><p>{item.tipcontent}</p></div>*/}
                            }
                        )
                    }
                    </div>
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
                        <OverlayTrigger placement="bottom" overlay={tooltip2}>
                            <div className={styles.button2} onClick={
                                (event) => {
                                    event.stopPropagation();
                                    {/*actions.showConfirm({title:confirmModalTitle,content:confirmModalContent,id:componentState.id})*/}
                                }
                            }>
                            </div>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={tooltip3}>
                            <div className={styles.button3} onClick={
                                (event) => {
                                    event.stopPropagation();
                                    actions.modifyTipsButtonClick({itemId:componentState.itemId,itemName:componentState.itemName,itemIndex:index})
                                }
                            }>
                            </div>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={tooltip4}>
                            <div className={styles.button4} onClick={
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
const tooltip2 = (
    <Tooltip id="tooltip2"><strong>修改</strong></Tooltip>
);
const tooltip3 = (
    <Tooltip id="tooltip2"><strong>增/删Tips</strong></Tooltip>
);
const tooltip4 = (
    <Tooltip id="tooltip2"><strong>增加Files</strong></Tooltip>
);


export default ItemInMain;