import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';
// import styles from '../styles/AppleItem.css';
// import appleimage from '../images/apple.png';
import { Modal,Button,Form,FormGroup,Col,FormControl,ControlLabel,Radio,InputGroup } from 'react-bootstrap';


let itemName = "";
let itemDes = "";
//时间点还是时间段
let tmRadio = 'A';
//纪年方式
let yearRadio = 'A';
//公元前还是公元后
let beforeOrAfterFlag = "After";
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
                                    <ControlLabel>事件名称:</ControlLabel>
                                </Col>
                                <Col sm={6}>
                                    <FormControl type="text" placeholder="请填入事件名称" onBlur={ handlePNBlur }  />
                                </Col>
                                <Col sm={2}>
                                    <ControlLabel><font color="red" size="5">*</font></ControlLabel>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalProjDes">
                                <Col sm={2}>
                                    <ControlLabel>事件描述:</ControlLabel>
                                </Col>
                                <Col sm={6}>
                                    <FormControl type="text" componentClass="textarea" placeholder="请填入事件描述" onBlur={ handlePDBlur }/>
                                </Col>
                            </FormGroup>

                            {/*<hr/>*/}

                            <FormGroup>
                                <Col sm={2}>
                                    <ControlLabel>时间类型选择:</ControlLabel>
                                </Col>
                                <Col sm={6}>
                                    {componentState.isDotTime ?
                                        <div>
                                            <Radio name="tm" value="A" inline defaultChecked onChange={(e)=> actions.changeTmRadio(e.target.value)}>时间点事件</Radio>
                                            <Radio name="tm" value="B" inline onChange={ (e)=> actions.changeTmRadio(e.target.value)}>时间段事件</Radio>
                                        </div>
                                        :
                                        <div>
                                            <Radio name="tm" value="A" inline onChange={(e)=> actions.changeTmRadio(e.target.value)}>时间点事件</Radio>
                                            <Radio name="tm" value="B" inline defaultChecked onChange={ (e)=> actions.changeTmRadio(e.target.value)}>时间段事件</Radio>
                                        </div>
                                    }
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={2}>
                                    <ControlLabel>纪年方式选择:</ControlLabel>
                                </Col>
                                <Col sm={6}>
                                    {componentState.isGongYuan ?
                                        <div>
                                            <Radio name="yeartype" value="A" inline defaultChecked onChange={ (e)=> actions.changeYearRadio(e.target.value) }>公元纪年</Radio>
                                            <Radio name="yeartype" value="B" inline onChange={ (e)=> actions.changeYearRadio(e.target.value) }>年号纪年</Radio>
                                        </div>
                                        :
                                        <div>
                                            <Radio name="yeartype" value="A" inline onChange={ (e)=> actions.changeYearRadio(e.target.value) }>公元纪年</Radio>
                                            <Radio name="yeartype" value="B" inline defaultChecked onChange={ (e)=> actions.changeYearRadio(e.target.value) }>年号纪年</Radio>
                                        </div>
                                    }
                                </Col>
                            </FormGroup>
                            
                            {componentState.isDotTime ==true ?
                                <div>
                                    {componentState.isGongYuan == true ?
                                        <div>
                                            <FormGroup>
                                                <Col sm={2}>
                                                    <ControlLabel>事件时间:</ControlLabel>
                                                </Col>
                                                <Col sm={2}>
                                                    <FormControl componentClass="select" onChange={ handleSelect }>
                                                        <option value="After">公元</option>
                                                        <option value="Before">公元前</option>
                                                    </FormControl>
                                                </Col>

                                                <Col sm={2}>
                                                    <InputGroup>
                                                        <FormControl type="text" placeholder="2016"/>
                                                        <InputGroup.Addon>年</InputGroup.Addon>
                                                    </InputGroup>
                                                </Col>

                                                <Col sm={5}>
                                                    <FormControl type="text" placeholder="请输入月日、时间。 例如: 02-01 12:53:36。可留空"/>
                                                </Col>
                                            </FormGroup>

                                            <FormGroup>
                                                <Col sm={2}>
                                                    <ControlLabel>关于时间的说明:</ControlLabel>
                                                </Col>
                                                <Col sm={9}>
                                                    <p>年份处请填阿拉伯数字。 如时间精确到年,则年份后的时间可不填; 否则填入月日及时间,此处可只填写月份(如:02),也可
                                                        只填写月日(如:02-01),还可填入月日及时间(如:02-01 12:53:36)。
                                                    </p>
                                                </Col>
                                            </FormGroup>
                                        </div>
                                        :
                                        <div>
                                            <FormGroup>
                                                <Col sm={2}>
                                                    <ControlLabel>事件时间</ControlLabel>
                                                </Col>

                                                <Col sm={2}>
                                                    <InputGroup>
                                                        <FormControl type="text" placeholder="鲁隐公"/>
                                                        <InputGroup.Addon>年号</InputGroup.Addon>
                                                    </InputGroup>
                                                </Col>
                                                <Col sm={2}>
                                                    <InputGroup>
                                                        <FormControl type="text" placeholder="1"/>
                                                        <InputGroup.Addon>年</InputGroup.Addon>
                                                    </InputGroup>
                                                </Col>
                                                <Col sm={5}>
                                                    <FormControl type="text" placeholder="请输入月日、时间。 例如: 02-01 12:53:36。可留空"/>
                                                </Col>

                                            </FormGroup>
                                            <FormGroup>
                                                <Col sm={2}>
                                                    <ControlLabel>关于时间的说明:</ControlLabel>
                                                </Col>
                                                <Col sm={9}>
                                                    <p>年份处请填阿拉伯数字。 如时间精确到年,则年份后的时间可不填; 否则填入月日及时间,此处可只填写月份(如:02),也可
                                                        只填写月日(如:02-01),还可填入月日及时间(如:02-01 12:53:36)。最后还可加备注(如:农历)
                                                    </p>
                                                </Col>
                                            </FormGroup>
                                        </div>
                                    }
                                </div>
                                :
                                <div>
                                    {componentState.isGongYuan == true ?
                                        <div>
                                            <FormGroup>
                                                <Col sm={2}>
                                                    <ControlLabel>事件开始时间:</ControlLabel>
                                                </Col>

                                                <Col sm={2}>
                                                    <FormControl componentClass="select" onChange={ handleSelect }>
                                                        <option value="After">公元</option>
                                                        <option value="Before">公元前</option>
                                                    </FormControl>
                                                </Col>

                                                <Col sm={2}>
                                                    <InputGroup>
                                                        <FormControl type="text" placeholder="2016"/>
                                                        <InputGroup.Addon>年</InputGroup.Addon>
                                                    </InputGroup>
                                                </Col>

                                                <Col sm={5}>
                                                    <FormControl type="text" placeholder="请输入月日、时间。 例如: 02-01 12:53:36。可留空"/>
                                                </Col>
                                            </FormGroup>

                                            <FormGroup>
                                                <Col sm = {2}>
                                                    <ControlLabel> 事件结束时间: </ControlLabel>
                                                </Col>

                                                <Col sm={2}>
                                                    <FormControl componentClass="select" onChange={ handleSelect }>
                                                        <option value="After">公元</option>
                                                        <option value="Before">公元前</option>
                                                    </FormControl>
                                                </Col>

                                                <Col sm={2}>
                                                    <InputGroup>
                                                        <FormControl type="text" placeholder="2017"/>
                                                        <InputGroup.Addon>年</InputGroup.Addon>
                                                    </InputGroup>
                                                </Col>

                                                <Col sm={5}>
                                                    <FormControl type="text" placeholder="请输入月日、时间。 例如: 02-01 12:53:36。可留空"/>
                                                </Col>
                                            </FormGroup>

                                            <FormGroup>
                                                <Col sm={2}>
                                                    <ControlLabel>关于时间的说明:</ControlLabel>
                                                </Col>
                                                <Col sm={9}>
                                                    <p>年份处请填阿拉伯数字。 如时间精确到年,则年份后的时间可不填; 否则填入月日及时间,此处可只填写月份(如:02),也可
                                                        只填写月日(如:02-01),还可填入月日及时间(如:02-01 12:53:36)。
                                                    </p>
                                                </Col>
                                            </FormGroup>

                                        </div>
                                        :
                                        <div>
                                            <FormGroup>
                                                <Col sm={2}>
                                                    <ControlLabel>事件开始时间:</ControlLabel>
                                                </Col>

                                                <Col sm={2}>
                                                    <InputGroup>
                                                        <FormControl type="text" placeholder="鲁隐公"/>
                                                        <InputGroup.Addon>年号</InputGroup.Addon>
                                                    </InputGroup>
                                                </Col>
                                                <Col sm={2}>
                                                    <InputGroup>
                                                        <FormControl type="text" placeholder="1"/>
                                                        <InputGroup.Addon>年</InputGroup.Addon>
                                                    </InputGroup>
                                                </Col>
                                                <Col sm={5}>
                                                    <FormControl type="text" placeholder="请输入月日、时间。 例如: 02-01 12:53:36。可留空"/>
                                                </Col>

                                            </FormGroup>

                                            <FormGroup>
                                                <Col sm = {2}>
                                                    <ControlLabel> 事件结束时间: </ControlLabel>
                                                </Col>

                                                <Col sm={2}>
                                                    <InputGroup>
                                                        <FormControl type="text" placeholder="鲁隐公"/>
                                                        <InputGroup.Addon>年号</InputGroup.Addon>
                                                    </InputGroup>
                                                </Col>
                                                <Col sm={2}>
                                                    <InputGroup>
                                                        <FormControl type="text" placeholder="3"/>
                                                        <InputGroup.Addon>年</InputGroup.Addon>
                                                    </InputGroup>
                                                </Col>
                                                <Col sm={5}>
                                                    <FormControl type="text" placeholder="请输入月日、时间。 例如: 02-01 12:53:36。可留空"/>
                                                </Col>

                                            </FormGroup>
                                            <FormGroup>
                                                <Col sm={2}>
                                                    <ControlLabel>关于时间的说明:</ControlLabel>
                                                </Col>
                                                <Col sm={9}>
                                                    <p>年份处请填阿拉伯数字。 如时间精确到年,则年份后的时间可不填; 否则填入月日及时间,此处可只填写月份(如:02),也可
                                                        只填写月日(如:02-01),还可填入月日及时间(如:02-01 12:53:36)。最后还可加备注(如:农历)
                                                    </p>
                                                </Col>
                                            </FormGroup>

                                        </div>
                                    }
                                </div>
                            }


                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    {   componentState.isSubmitting?
                                        <Button bsStyle="danger" disabled>
                                            提 交
                                        </Button>
                                        :
                                        <Button bsStyle="danger" onClick={ actions.createProjItem } >
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

function handlePNBlur(e) {
    itemName = e.target.value;
}

function handlePDBlur(e) {
    itemDes = e.target.value;
}

function handleSelect(e) {
    beforeOrAfterFlag = e.target.value;
    // console.log(gongyuanflag);

}

export default AddItemModal;