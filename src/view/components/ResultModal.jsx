import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';
// import styles from '../styles/AppleItem.css';
// import appleimage from '../images/apple.png' ;
import { Modal,Button } from 'react-bootstrap';

class ResultModal extends React.Component {

    shouldComponentUpdate(nextProps){
        return nextProps.componentState != this.props.componentState;
    }

    render() {

        let { componentState, actions } = this.props;

        return (
            <Modal show={componentState.show} bsSize="small" aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton={ 1===1 } onClick={() => actions.shutResultModal() }>
                    <Modal.Title id="contained-modal-title-sm">信息提示</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4> {componentState.content } </h4>
                    {/*<p> { componentState.content } </p>*/}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => actions.shutResultModal() }>Close</Button>
                </Modal.Footer>
            </Modal>
        );

    }


}

export default ResultModal;