import React from 'react'
import axios from 'axios'
import queryString from 'query-string'
import { URLAPI } from '../redux/actions/types';


class Verified extends React.Component{
    state = {
        status : 'Loading'
    }
    componentDidMount(){
        var params = queryString.parse(this.props.location.search)
        console.log(params)
        var username = params.username
        var password = params.password
        axios.put(URLAPI+'/user/emailverification', {
            username,
            password
        })
        .then((res)=>{
            console.log(res.data)
            this.setState({
                status : 'Berhasil'
            })
        })
        .catch((err)=>{
            console.log(err)
            this.setState({
                status : 'Gagal'
            })
        
        })
    }


    render(){
        if(this.state.status === 'Berhasil'){
            return(
                <div className="mycontainer p-t-100">
                    <h1>You are successfully verified! Welcome</h1>
                </div>
            )
        }
        if(this.state.status === 'Gagal'){
            return(
                <div className="mycontainer p-t-100">
                    <h1> Failed to verified the email, please kindly refresh</h1>
                </div>
            )
        }
 
        return(
            <div className="mycontainer p-t-100">
                <h1> Email verification is on progress, please wait</h1>
            </div>
        )
        
    }
}

export default Verified