import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';
// import styles from '../styles/AppleItem.css';
// import appleimage from '../images/apple.png';
import { Modal,Button } from 'react-bootstrap';

class ConfirmModal extends React.Component {

    shouldComponentUpdate(nextProps){
        return nextProps.componentState != this.props.componentState;
    }

    render() {

        let { componentState, actions } = this.props;

        return (
            <Modal show={componentState.show} bsSize="small" aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton={ 1===1 } onClick={() => actions.shutConfirmModal() }>
                    <Modal.Title id="contained-modal-title-sm"> {componentState.title} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4> {componentState.content } </h4>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => actions.shutConfirmModal()}>取消</Button>
                    <Button bsStyle="success" onClick={() => actions.deleteSomething(componentState.delType,componentState.delId)}>确认</Button>
                </Modal.Footer>
            </Modal>
        );

    }


}

export default ConfirmModal;