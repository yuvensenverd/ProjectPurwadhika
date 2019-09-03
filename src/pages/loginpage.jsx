import React from 'react'
import './../assets/Templates/Login_v14/css/main.css'
import './../assets/Templates/Login_v14/css/util.css'
import { loginUser,  loading, loadingFalse } from './../redux/actions/index'
import ReactLoading from 'react-loading';
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import Axios from 'axios';
import { URLAPI } from '../redux/actions/types';





class LoginPage extends React.Component{
    state ={
      userdata : []
    }

    componentDidMount(){
      
      var passwordinput = document.getElementById('inputpass')
      passwordinput.addEventListener("keyup", function(event) {
   
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          document.getElementById("buttonlog").click()
        }
      });

      var usernameinput = document.getElementById('inputuser')
      usernameinput.addEventListener("keyup",function(event) {
   
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          document.getElementById("buttonlog").click()
        }
      });
    }


    // onEnterClick= (event) => {
    //     if (event.keyCode === 13) {
    //     // Cancel the default action, if needed
    //     event.preventDefault();
    //     // Trigger the button element with a click
    //     document.getElementById("buttonlog").click()
    //     }
    //   }
    
    //  checkDatabaseUser = (username, password) => {
      
    //   var data = {
    //     name : username,
    //     pass : password
    //   }

    //   Axios.post(URLAPI+'/user/getuser', data)
    //   .then((res)=>{
    //       return this.log(username, password)
        
    //   })
    //   .catch((err)=>{
    //     window.alert(err.response.data.err)
    //   })
    // }
    

    log = (username, password) => {
      var data = {
        USERNAME : username,
        PASSWORD : password
      }

      this.props.loginUser(data)
    }


    ValidateLogin = () => {
      this.props.loading()
      var username = this.refs.inputuser.value
      var password = this.refs.inputpassword.value
      
       
      if(username.replace(/\s/g, "") === "" || password.replace(/\s/g, "") === ""){
        this.props.loadingFalse()
        return (
          window.alert("Password dan Username harus diisi")
        )
      }
      if(username.replace(/\s/g, "").length <= 7 || password.replace(/\s/g, "").length <= 7){
        this.props.loadingFalse()
        return (
          window.alert("Password dan Username minimal 8 karakter")
        )
      }
      this.log(username, password)


      }


      

    


    render(){
      if(this.props.userdata.USERNAME !== ''){
        return(
          <Redirect to="/"></Redirect>
        )
      }
        return(
            <div>
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55" style={{width : "1000px"}}>
              <div className="login100-form validate-form flex-sb flex-w"  >
                <span className="login100-form-title p-b-32">
                  Account Login
                </span>
                <span className="txt1 p-b-11">
                  Username
                </span>
                <div className="wrap-input100 validate-input m-b-36" >
                  <input className="input100" ref="inputuser" type="text" id="inputuser" />
                  <span className="focus-input100" />
                </div>
                <span className="txt1 p-b-11">
                  Password
                </span>
                <div className="wrap-input100 validate-input m-b-12" >
 
                    <i className="fa fa-eye" />
              
                  <input className="input100" ref="inputpassword" type="password" id="inputpass" />
                  <span className="focus-input100" />
                </div>
                <div className="container-login100-form-btn mt-4" >
                {this.props.userdata.LOADING === true ?
                <span className="text-center" style={{fontSize : '25px', marginBottom : '10px'}}>Loading, Please Wait..<ReactLoading type="spin" color="#afb9c9"  /></span> 
                  : 
                <button className="login100-form-btn btn-block" id="buttonlog" onClick={() => this.ValidateLogin()}>
                  Login
                </button>}
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="dropDownSelect1" />
      </div>
        )
    }
}
const mapStateToProps= (state)=>{
  return{ 
    userdata : state.userdata
  }
}

export default connect(mapStateToProps, {loginUser, loading, loadingFalse})(LoginPage);