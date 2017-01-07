import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';
import styles from '../styles/ItemInMain.css';
// import appleimage from '../images/apple.png';
// import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';

class ItemInMain extends React.Component {

    shouldComponentUpdate(nextProps){
        return (nextProps.componentState != this.props.componentState);
    }

    render() {

        let { componentState,index,leftPos,topPos,actions } = this.props;

        // if(index%2 != 0) return null;

        // let topPos = (componentState.startYear - timeLineBeginYear) * pxPerYear -20;
        
        return (
            // {/*<div className={styles.ItemInMain} style={{zIndex:index,top:topPos,left:leftPos}}>*/}
            <div className={styles.ItemInMain} style={{top:topPos,left:leftPos}}>
                <div className={styles.itemName}>{componentState.itemName}</div>
                <div className={styles.itemDes}>{componentState.itemContent}</div>
                {/*<p>id:{componentState.itemId}</p>*/}
                {/*<p>index:{index}</p>*/}
            </div>
        );

    }
}


export default ItemInMain;