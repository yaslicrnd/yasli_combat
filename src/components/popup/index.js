import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { statePopup } from './popupActions';
import './index.css'

class Popup extends Component {

    render() {

        let { isShow, data } = this.props;

        console.log(data);

        if(isShow) {
            return (
                <Fragment>
                    <div className="popup">
                        <div className="popup__title">{data.title}</div>
                        {data.image}
                        <div className="popup__message">{data.message}</div>
                        <button className="popup__action" onClick={data.clickFunc || this.exit}>Ок</button>
                    </div>
                    <div onClick={this.exit} className="popup_bg"></div>
                </Fragment>
            )
        } else {
            return null;
        }
    }

    exit = () => {
        this.props.statePopup(null);
    }
}

const mapDispatchToProps = { statePopup };
const mapStateToProps = state => ({
    isShow: state.popup.isShow,
    data: state.popup.data
});

export default connect(mapStateToProps, mapDispatchToProps)(Popup);