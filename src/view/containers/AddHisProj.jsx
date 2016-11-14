import React from 'react';
import { connect } from 'react-redux';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';
// import styles from '../styles/AppleItem.css';
// import appleimage from '../images/apple.png';
// import styles from '../styles/AddHisProj.css';
import { Form,FormGroup,ControlLabel,Col,Button,FormControl,Checkbox } from 'react-bootstrap';
import actions from '../../actions/addHisProjAction_creators';
import { bindActionCreators } from 'redux';

class AddHisProj extends React.Component {

    shouldComponentUpdate(nextProps){
        return nextProps.componentState != this.props.componentState;
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
                        <Col componentClass={ControlLabel} sm={2}>
                            项目名称
                        </Col>
                        <Col sm={6}>
                            <FormControl type="text" placeholder="请填入项目名称" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalProjDes">
                        <Col componentClass={ControlLabel} sm={2}>
                            项目描述
                        </Col>
                        <Col sm={6}>
                            <FormControl type="text" placeholder="请填入项目描述" />
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
                            <Button bsStyle="danger" onClick={actioncreator.createProj}>
                                提 交
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>

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

export default connect(selectState,buildActionDispatcher)(AddHisProj);