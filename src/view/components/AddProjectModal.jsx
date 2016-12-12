import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';
// import styles from '../styles/AppleItem.css';
// import appleimage from '../images/apple.png';
import { Modal,Button,Form,FormGroup,Col,FormControl,ControlLabel } from 'react-bootstrap';
import MyModal from './MyModal';


let projectName = "";
let projectDes = "";
class AddProjectModal extends React.Component {

    shouldComponentUpdate(nextProps){
        return nextProps.componentState != this.props.componentState;
    }

    render() {

        let { componentState, actions } = this.props;

        return (
            <div>
                <Modal show={componentState.show} bsSize="large" aria-labelledby="contained-modal-title-sm">
                    <Modal.Header closeButton={ 1===1 } onClick={() => actions.shutAddProjectModal() }>
                        <Modal.Title id="contained-modal-title-sm">新建项目</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

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

                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    {   componentState.isSubmitting?
                                        <Button bsStyle="danger" disabled>
                                            提 交
                                        </Button>
                                        :
                                        <Button bsStyle="danger" onClick={ ()=>{
                                            if(projectDes == ""){
                                                actions.popAlert('项目描述部分不能为空')
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

                <MyModal componentState={componentState.resultModal} actions={{shutMyModal: actions.shutResultModal}}/>
                {/*<MyModal componentState={containerState.selfCheckModal} actions={{shutMyModal: actioncreator.shutSelfCheckModal}}/>*/}

            </div>
        );

    }

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



export default AddProjectModal;