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

        let { componentState,index, actions } = this.props;

        if(index%2 != 0) return null;
        
        return (
            <div className={styles.ItemInMain} style={{zIndex:index,top:index*16}}>
                <div className={styles.itemName}>{componentState.itemName}</div>
                <div className={styles.itemDes}>{componentState.itemContent}</div>
                {/*<p>id:{componentState.itemId}</p>*/}
                {/*<p>index:{index}</p>*/}
            </div>
        );

    }
}

// const tooltip1 = (
//     <Tooltip id="tooltip1"><strong>修改笔记</strong></Tooltip>
// );
//
// const tooltip2 = (
//     <Tooltip id="tooltip2"><strong>删除笔记</strong></Tooltip>
// );


export default ItemInMain;