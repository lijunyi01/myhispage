import React from 'react';
import { connect } from 'react-redux';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';
// import styles from '../styles/AppleItem.css';
// import appleimage from '../images/apple.png';
// import styles from '../styles/AddHisProj.css';
import { Form,FormGroup,ControlLabel,Col,Button,FormControl,Checkbox,Modal } from 'react-bootstrap';
import actions from '../../actions/addHisProjAction_creators';
import { bindActionCreators } from 'redux';
import MyModal from '../components/MyModal';

let projectName = "";
let projectDes = "";

class AddHisProj extends React.Component {

    shouldComponentUpdate(nextProps){
        return nextProps.containerState != this.props.containerState;
    }

    render() {

        let { containerState, actioncreator } = this.props;

        return (
            <div>
                <h1>请添加项目</h1>

                <p>
                    说明文字
                </p>

                {/*<span>项目名:</span><input type="text" id="projName" name="projName" placeholder="请输入项目名"/><br/>*/}


                <Form horizontal>
                    <FormGroup controlId="formHorizontalProjName">
                        <Col sm={2}>
                            <ControlLabel>项目名称</ControlLabel>
                        </Col>
                        <Col sm={6}>
                            <FormControl type="text" placeholder="请填入项目名称" onBlur={ handlePNBlur }  />
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalProjDes">
                        <Col sm={2}>
                            <ControlLabel>项目描述</ControlLabel>
                        </Col>
                        <Col sm={6}>
                            <FormControl type="text" placeholder="请填入项目描述" onBlur={ handlePDBlur }/>
                        </Col>
                    </FormGroup>

                    {/*<FormGroup controlId="formHorizontalPassword">*/}
                        {/*<Col componentClass={ControlLabel} sm={2}>*/}
                            {/*Password*/}
                        {/*</Col>*/}
                        {/*<Col sm={6}>*/}
                            {/*<FormControl type="password" placeholder="Password" />*/}
                        {/*</Col>*/}
                    {/*</FormGroup>*/}

                    {/*<FormGroup>*/}
                        {/*<Col smOffset={2} sm={10}>*/}
                            {/*<Checkbox>Remember me</Checkbox>*/}
                        {/*</Col>*/}
                    {/*</FormGroup>*/}

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            {   containerState.isSubmitting?
                                <Button bsStyle="danger" disabled>
                                    提 交
                                </Button>
                                :
                                <Button bsStyle="danger" onClick={ ()=>{
                                    if(projectDes == ""){
                                        actioncreator.popAlert('项目描述部分不能为空')
                                    }else {
                                        actioncreator.createProj(
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

                <MyModal componentState={containerState.resultModal} actions={{shutMyModal: actioncreator.shutResultModal}}/>
                <MyModal componentState={containerState.selfCheckModal} actions={{shutMyModal: actioncreator.shutSelfCheckModal}}/>

            </div>
        );

    }


}

function selectState(state) {
    return {
        containerState: state.addHisProjState
    };
}

function buildActionDispatcher(dispatch) {
    return {
        actioncreator: bindActionCreators(actions, dispatch)
    };
}

function handleChange(e) {
    console.log(e.target.value)
}

function handlePNBlur(e) {
    projectName = e.target.value;
    // console.log(projectName);
}

function handlePDBlur(e) {
    projectDes = e.target.value
}


export default connect(selectState,buildActionDispatcher)(AddHisProj);