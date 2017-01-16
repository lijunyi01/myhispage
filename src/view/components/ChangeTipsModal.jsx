import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
import { render,findDOMNode } from 'react-dom';
import styles from '../styles/ChangeTipsModal.css';
// import appleimage from '../images/apple.png';
import { Modal,Button,Form,FormGroup,Col,FormControl,ControlLabel,Radio,InputGroup,Checkbox } from 'react-bootstrap';
import ItemTipInModal from './ItemTipInModal';


class ChangeTipsModal extends React.Component {

    shouldComponentUpdate(nextProps){
        return (nextProps.componentState != this.props.componentState || nextProps.itemTipMapList != this.props.itemTipMapList);
    }

    render() {

        let { componentState, itemTipMapList,actions } = this.props;
        console.log(itemTipMapList);

        return (
            <div>
                <Modal show={componentState.show} bsSize="large" aria-labelledby="contained-modal-title-sm">
                    <Modal.Header closeButton={ 1===1 } onClick={() => actions.shutChangeTipsModal() }>
                        <Modal.Title id="contained-modal-title-sm">为事件[{componentState.itemName}]添加/修改Tips</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className={styles.changeTipsModal}>
                            { itemTipMapList.map((item, index)=> {
                                {/*return <div key={item.id}>{item.tipcontent}</div>*/}
                                return <ItemTipInModal key={item.id} componentState={item}></ItemTipInModal>

                                })
                            }

                        </div>

                        <Form horizontal>

                        </Form>


                    </Modal.Body>

                </Modal>

            </div>
        );

    }

}

export default ChangeTipsModal;