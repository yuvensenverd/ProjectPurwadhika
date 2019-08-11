import React from 'react'
import './../assets/Templates/Login_v14/css/main.css'
import './../assets/Templates/Login_v14/css/util.css'
import Axios from 'axios';
import { Redirect } from 'react-router'
import { loginUser } from './../redux/actions/index'
import { connect } from 'react-redux'
import { GETTOKENURL, APIWILAYAHURL, URLAPI } from '../redux/actions/types';
import { isNull } from 'util';




class registerPage extends React.Component{
    state = {
      redirect_status : false,
      province : []
    }

    componentDidMount(){
      this.getDataProvince()
      
    }

    // MAP, RETURN ITEM = {nama : val.nama}
    getDataProvince = () =>{
      Axios.get(GETTOKENURL)
      .then((res)=>{
        var token = res.data.token
        token = token + '/m/wilayah/provinsi'
        Axios.get(APIWILAYAHURL+token)
        .then((res)=>{
          this.setState({
            province : res.data.data
          })
          console.log(this.state.province)
        })
        .catch((err)=>{

        })
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

    }

    checkDatabaseUser = () => {

      var username = this.refs.inputuser.value
      var password = this.refs.inputpassword.value
      var phonenum = this.refs.inputcontact.value
      var residence = this.refs.inputresidence.value
      var confirm = this.refs.inputpasswordconfirm.value
      console.log(residence)
      
      // NEED VALIDATION
       
      if(username.replace(/\s/g, "") === "" || password.replace(/\s/g, "") === ""){
        return (
          window.alert("Please fill in the username and password")
        )
      }
      if(username.replace(/\s/g, "").length <= 8 || password.replace(/\s/g, "").length <= 8){
        return (
          window.alert("Password And Username Should be at least 8 Character")
        )
      }

      if(residence === ""){
        return (
          window.alert("Please Choose Your Province")
        )
      }

      // BERHASIL CHECK VALID 

      var data = {
        username : username,
        saldo : 0,
        password : password,
        phonenumber : phonenum,
        residence : residence,
        role_id: 3 
      }

      var checkuser = {
        name : username,
        pass : password
      }

      Axios.post(URLAPI+'/user/getuser', checkuser)
      .then((res)=>{
        console.log(res.data)
        if(res.data[0].username){

          // console.log(res.data)
          // console.log(!res.data[0].username)
          // console.log(res.data[0].username)
          // console.log(res.data[0].cartlength)
          // console.log(isNull(res.data[0].username))
          return window.alert("Username already exist !")
        }else{
        
          return this.validateRegister(data)
        }

      })
      .catch((err)=>{
        console.log(err)
      })
    }

    printDataProvinsi = () => {
      if(this.state.province.length === 0 ){
        return (
          <option value="" disabled selected hidden>Loading...</option>
        )
      }else{
        var list = this.state.province.map((val)=>{
          return (
              <option value={val.name}> {val.name} </option>
          )
      })
      
      return list 
      }
      
    }






    validateRegister = (data) => {
      
      

      // JSON PARSE (TO JS ) // JSON STRINGIFY ( TO JSON )
      // console.log(validated_data)
      Axios.post(URLAPI+'/user/addUser',  data)
      .then((res)=>{
        
        console.log(res.data)
        window.alert("Register Success")
        // this.log(username, password)
        this.setState({
          redirect_status : true
        })

        this.log(data.username, data.password)
      

   
  
      })
      .catch((err)=>{
        console.log("Masuk")
        console.log(err.response.data)
      })



    }


    render(){
      if(this.state.redirect_status === true){
        return (
          <Redirect to="/"></Redirect>
        )
      }
        return(
         
        <div className="limiter p-t-20">
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
                 <select required id = "myList" ref="inputresidence" className="form-control mb-5" placeholder="Residence">
                        <option value="">CHOOSE PROVINCE</option>
                        {this.printDataProvinsi()}
                </select>
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
                  <input type="button" className="login100-form-btn btn-block" value="Sign Up Now!" onClick={() => this.checkDatabaseUser()}/>
                  
                  
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