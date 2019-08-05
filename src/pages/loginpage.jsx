import React from 'react'
import './../assets/Templates/Login_v14/css/main.css'
import './../assets/Templates/Login_v14/css/util.css'
import { loginUser } from './../redux/actions/index'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import Axios from 'axios';





class LoginPage extends React.Component{
    state ={
      redirect : false,
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
    
     checkDatabaseUser = (username, password) => {

      Axios.get('http://localhost:1998/users?name='+username+'&pass='+password)
      .then((res)=>{
        if(res.data.length > 0){

          console.log(res.data)
          return this.log(username, password)
        }else{
          console.log("Gak dapaet")
          return window.alert("Username / Password Tidak Valid!")
        }
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    

    log = (username, password) => {
      var data = {
        USERNAME : username,
        PASSWORD : password,
        ROLE : 'user',
        CART : []
      }

      this.props.loginUser(data)
      return this.setState({
        redirect : true
      })
    }


    ValidateLogin = () => {
      var username = this.refs.inputuser.value
      var password = this.refs.inputpassword.value
      
       
      if(username.replace(/\s/g, "") === "" || password.replace(/\s/g, "") === ""){
        return (
          window.alert("Password dan Username harus diisi")
        )
      }
      if(username.replace(/\s/g, "").length <= 7 || password.replace(/\s/g, "").length <= 7){
        return (
          window.alert("Password dan Username minimal 8 karakter")
        )
      }
      this.checkDatabaseUser(username, password)

      // var test =  this.checkDatabaseUser(username, password)
      // console.log(test)
      // if(test){
          // LOGIN
        

      // }else{

      //   return (
      //     window.alert("Username / Password Tidak Valid!")
      //   )

      }


      

    


    render(){
      if(this.state.redirect === true){
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
                <div className="container-login100-form-btn mt-4" >
                  <button className="login100-form-btn btn-block" id="buttonlog" onClick={() => this.ValidateLogin()}>
                    Login
                  </button>
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
export default connect(null,{ loginUser })(LoginPage);