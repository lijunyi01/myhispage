//修改tip
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

                        <Form horizontal>
                            <FormGroup controlId="formHorizontalExist">
                                <Col sm={2}>
                                    <ControlLabel>当前 Tips:</ControlLabel>
                                </Col>
                                <Col sm={9}>
                                    <div className={styles.tipsExist}>
                                        { itemTipMapList.map((itemTip, index)=> {
                                            return <ItemTipInModal key={itemTip.id} componentState={itemTip} itemId={componentState.itemId}
                                                actions={{
                                                deleteTip: actions.deleteTip,
                                            }}>
                                            </ItemTipInModal>

                                            })
                                        }
                                    </div>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalAdd">
                                <Col sm={2}>
                                    <ControlLabel>新增 TIP:</ControlLabel>
                                </Col>
                                <Col sm={6}>
                                    <FormControl type="text" componentClass="textarea" placeholder="请填入TIP内容" ref="tipContent"/>
                                </Col>
                                <Col sm={2}>
                                    {   componentState.isSubmitting ?
                                        <Button bsStyle="danger" disabled>
                                            确 认 新 增
                                        </Button>
                                        :
                                        <Button bsStyle="danger" onClick={ () => {
                                            let tipContent = findDOMNode(this.refs.tipContent).value;
                                            if(tipContent == ""){

                                            }else {
                                                actions.addTip(componentState.itemId,tipContent);
                                            }
                                        }}>
                                            确 认 新 增
                                        </Button>
                                    }
                                </Col>
                            </FormGroup>
                        </Form>


                    </Modal.Body>

                </Modal>

            </div>
        );

    }

}

export default ChangeTipsModal;