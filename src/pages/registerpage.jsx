import React from 'react'
import './../assets/Templates/Login_v14/css/main.css'
import './../assets/Templates/Login_v14/css/util.css'
import Axios from 'axios';
import { Redirect } from 'react-router'
import { loginUser } from './../redux/actions/index'
import { connect } from 'react-redux'



class registerPage extends React.Component{
    state = {
      redirect_status : false
    }

    log = (username, password) => {
      var data = {
        USERNAME : username,
        PASSWORD : password,
        ROLE : 'user',
        CART : []
      }

      this.props.loginUser(data)

    }

    validateRegister = () => {
      var username = this.refs.inputuser.value
      var password = this.refs.inputpassword.value
      var phonenum = this.refs.inputcontact.value
      var residence = this.refs.inputresidence.value
      var confirm = this.refs.inputpasswordconfirm.value
      
      // NEED VALIDATION
       
      if(username.replace(/\s/g, "") === "" || password.replace(/\s/g, "") === ""){
        return (
          window.alert("Password dan Username harus diisi")
        )
      }
      if(username.replace(/\s/g, "").length <= 8 || password.replace(/\s/g, "").length <= 8){
        return (
          window.alert("Password dan Username minimal 8 karakter")
        )
      }

      

      // SQL

      // var validated_data =
      // {
      //   username : username,
      //   saldo : 0,
      //   password : password,
      //   phonenumber : phonenum,
      //   residence : residence,
      //   role_id: 3 
      // }

  
      // console.log(validated_data)
      // console.log(typeof(validated_data))
      // validated_data = JSON.stringify(validated_data)

      //  {
      //   "username" : username,
      //   "saldo" : 0,
      //   "password" : password,
      //   "phonenumber" : phonenum,
      //   "residence" : residence,
      //   "role_id" : 3 
      // }

      

      // JSON PARSE (TO JS ) // JSON STRINGIFY ( TO JSON )
      // console.log(validated_data)
      Axios.post('http://localhost:1998/users',  {
        username : username,
        saldo : 0,
        password : password,
        phonenumber : phonenum,
        residence : residence,
        role_id: 3 
      })
      .then((res)=>{
        
        console.log(res.data)
        window.alert("Register Success")
        // this.log(username, password)
        this.setState({
          redirect_status : true
        })
      

   
  
      })
      .catch((err)=>{
        console.log("Masuk")
        console.log(err.res)
      })



    }


    render(){
      if(this.state.redirect_status === true){
        return (
          <Redirect to="/"></Redirect>
        )
      }
        return(
         
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55" style={{width : "1000px"}}>
              <div className="login100-form validate-form flex-sb flex-w"  >
                <span className="login100-form-title p-b-32">
                  Register Page
                </span>
                <span className="txt1 p-b-11">
                  Your Username
                </span>
                <div className="wrap-input100 validate-input m-b-36" >
                  <input className="input100" ref="inputuser" type="text" />
                  <span className="focus-input100" />
                </div>
                <span className="txt1 p-b-11">
                  Contact Number
                </span>
                <div className="wrap-input100 validate-input m-b-36" >
                  <input className="input100" ref="inputcontact" type="number" />
                  <span className="focus-input100" />
                </div>
                <span className="txt1 p-b-11">
                  Residence
                </span>
                <div className="wrap-input100 validate-input m-b-36" >
                  <input className="input100" ref="inputresidence" type="text" />
                  <span className="focus-input100" />
                </div>
                <span className="txt1 p-b-11">
                  Your Password
                </span>
                <div className="wrap-input100 validate-input m-b-12" >
 
                    <i className="fa fa-eye" />
              
                  <input className="input100" ref="inputpassword" type="password" />
                  <span className="focus-input100" />
                </div>
                <span className="txt1 p-b-11">
                  Confirm Password
                </span>
                <div className="wrap-input100 validate-input m-b-12" >
 
                    <i className="fa fa-eye" />
              
                  <input className="input100" ref="inputpasswordconfirm" type="password" />
                  <span className="focus-input100" />
                </div>
                {/* <div className="flex-sb-m w-full p-b-48">
                  <div className="contact100-form-checkbox">
                    <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                    <label className="label-checkbox100" htmlFor="ckb1">
                      Remember me
                    </label>
                  </div>
                  <div>
                    <a href="#" className="txt3">
                      Forgot Password?
                    </a>
                  </div>
                </div> */}
                <div className="container-login100-form-btn mt-5 mb-3">
                  <input type="button" className="login100-form-btn btn-block" value="Sign Up Now!" onClick={() => this.validateRegister()}/>
                  
                  
                </div>
              </div>
      
          </div>
        </div>
        <div id="dropDownSelect1" />
      </div>
        )
    }
}
export default connect(null, {loginUser}) (registerPage);