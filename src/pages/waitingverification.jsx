import React, { Component } from 'react';
import Axios from 'axios';
import {connect} from 'react-redux'
import { URLAPI } from '../redux/actions/types';

class WaitingVerification extends Component {
    onResendEmailClick = () => {
        Axios.post(URLAPI+'/user/resendemail', {
            username : this.props.userdata.USERNAME,
            email : this.props.userdata.EMAIL
        })
        .then((res)=>{
            console.log(res.data)
            console.log("SUKSESSZ")
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render() {
        return (
            <div className="mycontainer p-t-100">
                <h2>Thank you for Signing Up!</h2>
                <p>Please Check your email for verification</p>
                <p>
                   If you still haven't recieve the email yet, please kindly press the Resend Button :)
                </p>
                <input type="button" className="btn btn-secondary" value="Resend Email" onClick={()=>this.onResendEmailClick()} />
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        userdata : state.userdata
    }
}

export default connect(mapStateToProps)(WaitingVerification);