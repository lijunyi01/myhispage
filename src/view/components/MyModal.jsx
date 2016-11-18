import React from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
// import { render } from 'react-dom';
// import styles from '../styles/AppleItem.css';
// import appleimage from '../images/apple.png';
import { Modal,Button } from 'react-bootstrap';

class MyModal extends React.Component {

    shouldComponentUpdate(nextProps){
        return nextProps.componentState != this.props.componentState;
    }

    render() {

        let { componentState, actions } = this.props;

        /**
         * 这个区域是 mock 数据区，也作为组件文档，请书写清楚
         * //在组件发布时，请注释掉，提高性能
         */
        // let mockState = {
        //     show: true,
        //     content: 'asdfadf'
        // };
        //
        // let mockActions = {
        //     shutModal : () => console.log('eatApple',id)
        // };

        /**
         * 开关这行代码，用于切换装入的数据来源。(为了开关的方便，请把两句代码合成一行)
         * 在开发阶段打开，使用内部 state 和 action, 开发完成后请注释关闭
         */
        // componentState = mockState;
        // actions = mockActions;

        return (
            <Modal show={componentState.show} bsSize="small" aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton={ 1===1 } onClick={() => actions.shutMyModal() }>
                    <Modal.Title id="contained-modal-title-sm">信息提示</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4> {componentState.content } </h4>
                    {/*<p> { componentState.content } </p>*/}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => actions.shutMyModal() }>Close</Button>
                </Modal.Footer>
            </Modal>
        );

    }


}

export default MyModal;