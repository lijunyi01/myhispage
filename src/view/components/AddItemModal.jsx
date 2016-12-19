import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';
// import styles from '../styles/AppleItem.css';
// import appleimage from '../images/apple.png';
import { Modal,Button,Form,FormGroup,Col,FormControl,ControlLabel,Radio,InputGroup } from 'react-bootstrap';


let itemName = "";
let itemDes = "";
let tmRadio = 'A';
let tmLdRadio = 'Y';
class AddItemModal extends React.Component {

    shouldComponentUpdate(nextProps){
        return nextProps.componentState != this.props.componentState;
    }

    render() {

        let { componentState, actions } = this.props;

        return (
            <div>
                <Modal show={componentState.show} bsSize="large" aria-labelledby="contained-modal-title-sm">
                    <Modal.Header closeButton={ 1===1 } onClick={() => actions.shutAddItemModal() }>
                        <Modal.Title id="contained-modal-title-sm">为项目[{componentState.projectName}]添加事件</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form horizontal>
                            <FormGroup controlId="formHorizontalProjName">
                                <Col sm={2}>
                                    <ControlLabel>事件名称 <font color="red">(*)</font></ControlLabel>
                                </Col>
                                <Col sm={6}>
                                    <FormControl type="text" placeholder="请填入事件名称" onBlur={ handlePNBlur }  />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalProjDes">
                                <Col sm={2}>
                                    <ControlLabel>事件描述</ControlLabel>
                                </Col>
                                <Col sm={6}>
                                    <FormControl type="text" placeholder="请填入事件描述" onBlur={ handlePDBlur }/>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={2}>
                                    <ControlLabel>时间类型选择</ControlLabel>
                                </Col>
                                <Col sm={6}>
                                    <Radio name="tm" value="A" inline defaultChecked onChange={(e)=> actions.changeTmRadio(e.target.value)}>时间点事件</Radio>
                                    <Radio name="tm" value="B" inline onChange={ (e)=> actions.changeTmRadio(e.target.value)}>时间段事件</Radio>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={2}>
                                    <ControlLabel>时间粒度选择</ControlLabel>
                                </Col>
                                <Col sm={6}>
                                    <Radio name="tmld" value="Y" inline defaultChecked onChange={ handleTmLdRadio }>精确到年份</Radio>
                                    <Radio name="tmld" value="M" inline onChange={ handleTmLdRadio }>精确到月份</Radio>
                                    <Radio name="tmld" value="D" inline onChange={ handleTmLdRadio }>精确到天</Radio>
                                    <Radio name="tmld" value="T" inline onChange={ handleTmLdRadio }>精确到时间</Radio>
                                </Col>
                            </FormGroup>
                            
                            {
                                componentState.isDotTime ==true ?
                                    <FormGroup>
                                        <Col sm={2}>
                                            <ControlLabel>事件时间</ControlLabel>
                                        </Col>
                                        {
                                            componentState.tmld == 'Y'?
                                                <Col sm={2}>
                                                    <InputGroup>
                                                        <FormControl type="text"/>
                                                        <InputGroup.Addon>年</InputGroup.Addon>
                                                    </InputGroup>
                                                </Col>
                                                :
                                                <Col sm={2}>
                                                    <InputGroup>
                                                        <FormControl type="text"/>
                                                        <InputGroup.Addon>年/月</InputGroup.Addon>
                                                    </InputGroup>
                                                </Col>

                                        }
                                        <Col sm={4}>
                                            <ControlLabel>例如: 2016 或 -221 其中负数表示公元前</ControlLabel>
                                        </Col>
                                    </FormGroup>
                                    :
                                    <div>
                                        <FormGroup>
                                            <Col sm={2}>
                                                <ControlLabel>事件开始时间</ControlLabel>
                                            </Col>
                                            <Col sm={6}>
                                                <FormControl type="text" placeholder="请填入事件开始的时间" onBlur={ handleTmBlur }  />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Col sm={2}>
                                                <ControlLabel>事件结束时间</ControlLabel>
                                            </Col>
                                            <Col sm={6}>
                                                <FormControl type="text" placeholder="请填入事件开始的时间" onBlur={ handleTmBlur }  />
                                            </Col>
                                        </FormGroup>

                                    </div>


                            }


                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    {   componentState.isSubmitting?
                                        <Button bsStyle="danger" disabled>
                                            提 交
                                        </Button>
                                        :
                                        <Button bsStyle="danger" onClick={ ()=>{
                                            if(itemName == ""){
                                                actions.popAlert('事件名称不能为空')
                                            }else {
                                                actions.createProj(
                                                    {
                                                        projectName: projectName,
                                                        projectDes: projectDes
                                                    }
                                                )
                                            }
                                        } } >
                                            提 交
                                        </Button>
                                    }
                                </Col>
                            </FormGroup>
                        </Form>


                    </Modal.Body>
                    {/*<Modal.Footer>*/}
                        {/*<Button onClick={() => actions.shutMyModal() }>Close</Button>*/}
                    {/*</Modal.Footer>*/}
                </Modal>

                {/*<MyModal componentState={componentState.selfCheckModal} actions={{shutMyModal: actions.shutSelfCheckModal}}/>*/}

            </div>
        );

    }

}

function handleChange(e) {
    console.log(e.target.value)
}

function handlePNBlur(e) {
    itemName = e.target.value;
}

function handlePDBlur(e) {
    itemDes = e.target.value
}

function handleTmRadio(e) {
    tmRadio = e.target.value;
}

function handleTmLdRadio(e) {
    tmLdRadio = e.target.value

}

function handleTmBlur(e) {
    // tmLdRadio = e.target.value

}



export default AddItemModal;