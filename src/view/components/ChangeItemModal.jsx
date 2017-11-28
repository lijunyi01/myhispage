//修改item

import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
import { render,findDOMNode } from 'react-dom';
// import styles from '../styles/AppleItem.css';
// import appleimage from '../images/apple.png';
import { Modal,Button,Form,FormGroup,Col,FormControl,ControlLabel,Radio,InputGroup,Checkbox } from 'react-bootstrap';


let itemName = '';
let itemDes = '';
//时间点还是时间段
let tmRadio = 'A';
//纪年方式
let yearRadio = 'A';
//公元前还是公元后(分开始时间和结束时间)
let startBOAFlag = "After";
let endBOAFlag = "After";

let startYear = '';
let startNH = '';
let startYear_des = '';
let startTime = '';
let endYear = '';
let endNH = '';
let endYear_des = '';
let endTime = '';

class ChangeItemModal extends React.Component {

    shouldComponentUpdate(nextProps){
        return nextProps.componentState != this.props.componentState;
    }

    render() {

        let { componentState,componentState2,actions } = this.props;

        if(componentState.isDotTime == true){
            tmRadio = 'A';
        }else{
            tmRadio = 'B';
        }

        if(componentState.isGongYuan == true){
            yearRadio = 'A';
        }else{
            yearRadio = 'B';
        }

        return (
            <div>
                <Modal show={componentState.show} bsSize="large" aria-labelledby="contained-modal-title-sm">
                    <Modal.Header closeButton={ 1===1 } onClick={() => actions.shutChangeItemModal() }>
                        <Modal.Title id="contained-modal-title-sm">为项目[{componentState.projectName}]修改事件</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form horizontal>
                            <FormGroup controlId="formHorizontalProjName">
                                <Col sm={2}>
                                    <ControlLabel>事件名称:</ControlLabel>
                                </Col>
                                <Col sm={6}>
                                    <FormControl type="text" placeholder="请填入事件名称" defaultValue={componentState2.itemName} ref="itemName"/>
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
                                    <FormControl type="text" componentClass="textarea" placeholder="请填入事件描述" defaultValue={componentState2.itemContent} ref="itemDes"/>
                                </Col>
                            </FormGroup>


                            <FormGroup>
                                <Col sm={2}>
                                    <ControlLabel>时间类型选择:</ControlLabel>
                                </Col>
                                <Col sm={6}>
                                    <div>
                                        <Radio name="tm" value="A" inline checked={componentState.isDotTime} onChange={(e)=> actions.changeTmRadio2(e.target.value)}>时间点事件</Radio>
                                        <Radio name="tm" value="B" inline checked={!componentState.isDotTime} onChange={ (e)=> actions.changeTmRadio2(e.target.value)}>时间段事件</Radio>
                                    </div>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={2}>
                                    <ControlLabel>纪年方式选择:</ControlLabel>
                                </Col>
                                <Col sm={6}>
                                    <div>
                                        <Radio name="yeartype" value="A" inline checked={componentState.isGongYuan} onChange={ (e)=> actions.changeYearRadio2(e.target.value) }>公元纪年</Radio>
                                        <Radio name="yeartype" value="B" inline checked={!componentState.isGongYuan} onChange={ (e)=> actions.changeYearRadio2(e.target.value) }>年号纪年</Radio>
                                    </div>
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
                                                    <FormControl componentClass="select" ref="startBOAFlag" defaultValue={componentState2.startYear>0? "After":"Before"}>
                                                        <option value="After">公元</option>
                                                        <option value="Before">公元前</option>
                                                    </FormControl>
                                                </Col>

                                                <Col sm={2}>
                                                    <InputGroup>
                                                        <FormControl type="text" placeholder="2016" ref="startYear" defaultValue={Math.abs(componentState2.startYear)}/>
                                                        <InputGroup.Addon>年</InputGroup.Addon>
                                                    </InputGroup>
                                                </Col>

                                                <Col sm={5}>
                                                    <Checkbox inputRef={ ref => {this.startYearCheckbox = ref;}} defaultChecked={componentState2.startYearNDFlag==1?true:false}>
                                                        这不是确切的年份 (确切年份不详或无法确定年份)
                                                    </Checkbox>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup>
                                                <Col sm={6} smOffset={2}>
                                                    <FormControl type="text" placeholder="请输入月日、时间。 例如: 02-01 12:53:36。可留空" ref="startTime" defaultValue={componentState2.startTime}/>
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
                                                        <FormControl type="text" placeholder="鲁隐公" ref="startNH"/>
                                                        <InputGroup.Addon>年号</InputGroup.Addon>
                                                    </InputGroup>
                                                </Col>
                                                <Col sm={2}>
                                                    <InputGroup>
                                                        <FormControl type="text" placeholder="1" ref="startYearDes"/>
                                                        <InputGroup.Addon>年</InputGroup.Addon>
                                                    </InputGroup>
                                                </Col>
                                                <Col sm={5}>
                                                    <Checkbox inputRef={ ref => {this.startYearCheckbox = ref;}} defaultChecked={componentState2.startYearNDFlag==1?true:false}>
                                                        这不是确切的年份 (确切年份不详或无法确定年份)
                                                    </Checkbox>
                                                </Col>

                                            </FormGroup>
                                            <FormGroup>
                                                <Col sm={6} smOffset={2}>
                                                    <FormControl type="text" placeholder="请输入月日、时间。 例如: 02-01 12:53:36。可留空" ref="startTime" defaultValue={componentState2.startTime}/>
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
                                                    <FormControl componentClass="select" ref="startBOAFlag" defaultValue={componentState2.startYear>0? "After":"Before"}>
                                                        <option value="After">公元</option>
                                                        <option value="Before">公元前</option>
                                                    </FormControl>
                                                </Col>

                                                <Col sm={2}>
                                                    <InputGroup>
                                                        <FormControl type="text" placeholder="2016" ref="startYear" defaultValue={Math.abs(componentState2.startYear)}/>
                                                        <InputGroup.Addon>年</InputGroup.Addon>
                                                    </InputGroup>
                                                </Col>

                                                <Col sm={5}>
                                                    <Checkbox inputRef={ ref => {this.startYearCheckbox = ref;}} defaultChecked={componentState2.startYearNDFlag==1?true:false}>
                                                        这不是确切的年份 (确切年份不详或无法确定年份)
                                                    </Checkbox>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup>
                                                <Col sm={6} smOffset={2}>
                                                    <FormControl type="text" placeholder="请输入月日、时间。 例如: 02-01 12:53:36。可留空" ref="startTime" defaultValue={componentState2.startTime}/>
                                                </Col>
                                            </FormGroup>

                                            <FormGroup>
                                                <Col sm = {2}>
                                                    <ControlLabel> 事件结束时间: </ControlLabel>
                                                </Col>

                                                <Col sm={2}>
                                                    <FormControl componentClass="select" ref="endBOAFlag" defaultValue={componentState2.endYear>0? "After":"Before"}>
                                                        <option value="After">公元</option>
                                                        <option value="Before">公元前</option>
                                                    </FormControl>
                                                </Col>

                                                <Col sm={2}>
                                                    <InputGroup>
                                                        <FormControl type="text" placeholder="2017" ref="endYear" defaultValue={Math.abs(componentState2.endYear)}/>
                                                        <InputGroup.Addon>年</InputGroup.Addon>
                                                    </InputGroup>
                                                </Col>

                                                <Col sm={5}>
                                                    <Checkbox inputRef={ ref => {this.endYearCheckbox = ref;}} defaultChecked={componentState2.endYearNDFlag==1?true:false}>
                                                        这不是确切的年份 (确切年份不详或无法确定年份)
                                                    </Checkbox>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup>
                                                <Col sm={6} smOffset={2}>
                                                    <FormControl type="text" placeholder="请输入月日、时间。 例如: 02-01 12:53:36。可留空" ref="endTime" defaultValue={componentState2.endTime}/>
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
                                                        <FormControl type="text" placeholder="鲁隐公" ref="startNH"/>
                                                        <InputGroup.Addon>年号</InputGroup.Addon>
                                                    </InputGroup>
                                                </Col>
                                                <Col sm={2}>
                                                    <InputGroup>
                                                        <FormControl type="text" placeholder="1" ref="startYearDes"/>
                                                        <InputGroup.Addon>年</InputGroup.Addon>
                                                    </InputGroup>
                                                </Col>
                                                <Col sm={5}>
                                                    <Checkbox inputRef={ ref => {this.startYearCheckbox = ref;}} defaultChecked={componentState2.startYearNDFlag==1?true:false}>
                                                        这不是确切的年份 (确切年份不详或无法确定年份)
                                                    </Checkbox>
                                                </Col>

                                            </FormGroup>
                                            <FormGroup>
                                                <Col sm={6} smOffset={2}>
                                                    <FormControl type="text" placeholder="请输入月日、时间。 例如: 02-01 12:53:36。可留空" ref="startTime" defaultValue={componentState2.startTime}/>
                                                </Col>
                                            </FormGroup>

                                            <FormGroup>
                                                <Col sm = {2}>
                                                    <ControlLabel> 事件结束时间: </ControlLabel>
                                                </Col>

                                                <Col sm={2}>
                                                    <InputGroup>
                                                        <FormControl type="text" placeholder="鲁隐公" ref="endNH"/>
                                                        <InputGroup.Addon>年号</InputGroup.Addon>
                                                    </InputGroup>
                                                </Col>
                                                <Col sm={2}>
                                                    <InputGroup>
                                                        <FormControl type="text" placeholder="3" ref="endYearDes"/>
                                                        <InputGroup.Addon>年</InputGroup.Addon>
                                                    </InputGroup>
                                                </Col>
                                                <Col sm={5}>
                                                    <Checkbox inputRef={ ref => {this.endYearCheckbox = ref;}} defaultChecked={componentState2.endYearNDFlag==1?true:false}>
                                                        这不是确切的年份 (确切年份不详或无法确定年份)
                                                    </Checkbox>
                                                </Col>

                                            </FormGroup>
                                            <FormGroup>
                                                <Col sm={6} smOffset={2}>
                                                    <FormControl type="text" placeholder="请输入月日、时间。 例如: 02-01 12:53:36。可留空" ref="endTime" defaultValue={componentState2.endTime}/>
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
                                            确 认 修 改
                                        </Button>
                                        :
                                        <Button bsStyle="danger" onClick={ ()=> {
                                            let itemType = 0;
                                            //起止年份不精确的标志
                                            let startYearNDFlag = false;
                                            let endYearNDFlag = false;
                                            itemName = findDOMNode(this.refs.itemName).value;
                                            itemDes = findDOMNode(this.refs.itemDes).value;
                                            if(tmRadio == 'A') {
                                                if(yearRadio == 'A') {
                                                    startBOAFlag = findDOMNode(this.refs.startBOAFlag).value;
                                                    if(startBOAFlag == 'After') {
                                                        startYear = findDOMNode(this.refs.startYear).value;
                                                    }else{
                                                        startYear = '-'+findDOMNode(this.refs.startYear).value;
                                                    }
                                                    startTime = findDOMNode(this.refs.startTime).value;

                                                    itemType = 1;
                                                }else{
                                                    startNH = findDOMNode(this.refs.startNH).value;
                                                    startYear_des = startNH + ' ' + findDOMNode(this.refs.startYearDes).value;
                                                    startTime = findDOMNode(this.refs.startTime).value;

                                                    itemType = 2;
                                                }
                                                startYearNDFlag = this.startYearCheckbox.checked;
                                            }else{
                                                if(yearRadio == 'A') {
                                                    startBOAFlag = findDOMNode(this.refs.startBOAFlag).value;
                                                    if(startBOAFlag == 'After') {
                                                        startYear = findDOMNode(this.refs.startYear).value;
                                                    }else{
                                                        startYear = '-'+findDOMNode(this.refs.startYear).value;
                                                    }
                                                    startTime = findDOMNode(this.refs.startTime).value;
                                                    endBOAFlag = findDOMNode(this.refs.endBOAFlag).value;
                                                    if(endBOAFlag == 'After') {
                                                        endYear = findDOMNode(this.refs.endYear).value;
                                                    }else{
                                                        endYear = '-' + findDOMNode(this.refs.endYear).value;
                                                    }
                                                    endTime = findDOMNode(this.refs.endTime).value;

                                                    itemType = 3;

                                                }else{
                                                    startNH = findDOMNode(this.refs.startNH).value;
                                                    startYear_des = startNH + ' ' + findDOMNode(this.refs.startYearDes).value;
                                                    startTime = findDOMNode(this.refs.startTime).value;
                                                    endNH = findDOMNode(this.refs.endNH).value;
                                                    endYear_des = endNH + ' ' + findDOMNode(this.refs.endYearDes).value;
                                                    endTime = findDOMNode(this.refs.endTime).value;

                                                    itemType = 4;
                                                }
                                                startYearNDFlag = this.startYearCheckbox.checked;
                                                endYearNDFlag = this.endYearCheckbox.checked;
                                            }

                                            let checkResult = checkParam();
                                            if( ! checkResult == '' ){
                                                actions.popAlert(checkResult)
                                            }else {
                                                {/*console.log("start flag:"+ startYearNDFlag);*/}
                                                {/*console.log("end flag:"+ endYearNDFlag);*/}
                                                let istartNDFlag = 0;
                                                let iendNDFlag =0;
                                                if(startYearNDFlag){
                                                    istartNDFlag = 1;
                                                }
                                                if(endYearNDFlag){
                                                    iendNDFlag = 1;
                                                }

                                                actions.modifyProjItem({
                                                    projectId: componentState.projectId,
                                                    itemId:componentState.itemId,
                                                    type: itemType,
                                                    itemName: itemName,
                                                    itemDes: itemDes,
                                                    startYear: startYear,
                                                    startYearNDFlag:istartNDFlag,
                                                    startYearDes: startYear_des,
                                                    startTime: startTime,
                                                    endYear: endYear,
                                                    endYearNDFlag:iendNDFlag,
                                                    endYearDes: endYear_des,
                                                    endTime: endTime,
                                                });
                                            }
                                        }}>
                                            确 认 修 改
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

function handleStartYearNDFlag(e) {
    if(e.target.checked){
        startYearNDFlag = true;
        console.log(startYearNDFlag);
    }else{
        console.log('222');
        startYearNDFlag = false;
    }
}


function checkParam() {

    let ret = '';
    if(itemName == ''){
        ret = '事件名不能为空';
    }else if(itemDes == ''){
        ret = '事件描述不能为空';
    }else{
        if(tmRadio == 'A'){   //点时间
            if(yearRadio == 'A'){   //公元纪年
                if(startYear == ''){
                    ret = '请输入事件年代';
                }
            }else {   //年号纪年
                if(startNH == ''){
                    ret = '请输入年号';
                }else if(startNH == startYear_des){
                    ret = '请填写年份';
                }
            }
        }else{     //段时间
            if(yearRadio == 'A'){   //公元纪年
                if(startYear == '' || endYear == ''){
                    ret = '请输入事件起止年代';
                }
            }else {   //年号纪年
                if(startNH == '' || endNH ==''){
                    ret = '请输入起止年号';
                }else if(startNH + ' ' == startYear_des || endNH + ' ' == endYear_des){
                    ret = '请填写起止年份';
                }
            }
        }
    }
    return ret;
}

export default ChangeItemModal;