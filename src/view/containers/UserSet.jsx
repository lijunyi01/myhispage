import React from 'react';
import { connect } from 'react-redux';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';
// import styles from '../styles/AppleItem.css';
// import appleimage from '../images/apple.png';
// import styles from '../styles/AddHisProj.css';
import { Form,FormGroup,ControlLabel,Col,Button,FormControl,Checkbox,Modal } from 'react-bootstrap';
import actions from '../../actions/userSetAction_creators';
import { bindActionCreators } from 'redux';
import MyModal from '../components/MyModal';

let projectName = "";
let projectDes = "";

class UserSet extends React.Component {

    shouldComponentUpdate(nextProps){
        return nextProps.containerState != this.props.containerState;
    }

    render() {

        let { containerState, actioncreator } = this.props;

        return (
            <div>
                <h1>用户设置</h1>

                <p>
                    说明文字
                </p>


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

// function handleChange(e) {
//     console.log(e.target.value)
// }
//
// function handlePNBlur(e) {
//     projectName = e.target.value;
//     // console.log(projectName);
// }
//
// function handlePDBlur(e) {
//     projectDes = e.target.value
// }


export default connect(selectState,buildActionDispatcher)(UserSet);