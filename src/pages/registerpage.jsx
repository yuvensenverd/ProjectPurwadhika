import React from 'react'
import './../assets/Templates/Login_v14/css/main.css'
import './../assets/Templates/Login_v14/css/util.css'
import Axios from 'axios';
import { Redirect } from 'react-router'
import { loginUser, loading, loadingFalse } from './../redux/actions/index'
import { connect } from 'react-redux'
import { GETTOKENURL, APIWILAYAHURL, URLAPI } from '../redux/actions/types';
import ReactLoading from 'react-loading';




class registerPage extends React.Component{
    state = {
      redirect_status : false,
      province : [],
      username : '',
      email : '',
      contact : '',
      conpassword : '',
      password : '',
      loading : false
 
    }

    componentDidMount(){
      this.getDataProvince()
      
    }

    // get data province dari RAJA-API
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
        })
        .catch((err)=>{
          console.log(err)
        })
      })
      .catch((err)=>{
        console.log(err)
      })
    }

   

    checkDatabaseUser = () => {
      this.props.loading()
     
    

      var username = this.state.username
      var password = this.state.password
      var phonenum = this.state.contact
      var residence = this.refs.inputresidence.value
      var confirm = this.state.conpassword
      var email = this.state.email
    

     
      
      // NEED VALIDATION

      if (username.includes(" ")) { // kalau ada BLANKSPACE
        this.props.loadingFalse()
        return (
          window.alert('username should have no spaces!')
          
        )
      }
      if (password.includes(" "))
       {
        this.props.loadingFalse()
        return window.alert("password should have no spaces!")
      }
      if (email.includes(" ")) {
        this.props.loadingFalse()
        return window.alert("email should have no spaces!")
      }
      if (phonenum.includes(" ")) {
        this.props.loadingFalse()
        return window.alert("contact number should have no spaces!")
      }
       
      if(username.replace(/\s/g, "").length < 8  || username.replace(/\s/g, "").length > 12){
        this.props.loadingFalse()
        return (
          
          window.alert("username must be between 8 and 12 characters")
        )
      }
      if(password.replace(/\s/g, "").length < 8 || password.replace(/\s/g, "").length >12){
        this.props.loadingFalse()
        return (
          window.alert("Password And Username Should be at least 8 Character")
        )
      }
      if(!this.validateEmail()){
        this.props.loadingFalse()
        return (
          window.alert("Email is not Valid!")
        )
      }
      if(phonenum.replace(/\s/g, "").length < 8 || phonenum.replace(/\s/g, "").length > 12){
        this.props.loadingFalse()
        return (
          window.alert("Please enter a valid Phone number! (8-12 numbers long)")
        )
      }

      if(residence === ""){
        this.props.loadingFalse()
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
        role_id: 3,
        email : email,
        status : 'Unverified'
      }

      var checkuser = {
        name : username
      }

      Axios.post(URLAPI+'/user/checkuser', checkuser)
      .then((res)=>{
        console.log(res.data)
        if(res.data[0]){
          this.props.loadingFalse()
          return window.alert("Username already exist !")
        }else{
          // SUKSES, GA ADA USERNAME YANG SAMA 
          return this.validateRegister(data)
        }

      })
      .catch((err)=>{
        this.props.loadingFalse()
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
      
      
      console.log(this.props.isloading)
      // JSON PARSE (TO JS ) // JSON STRINGIFY ( TO JSON )
      // console.log(validated_data)
      Axios.post(URLAPI+'/user/addUser',  data)
      .then((res)=>{
        // TEMPORARY
        console.log(res.data)
        window.alert("Register Success")
        // this.log(username, password)
        console.log(data)
        this.log(data.username, data.password)
        this.setState({
          redirect_status : true
        })
      })
      .catch((err)=>{
        console.log("Masuk")
        window.alert(err.response.data)
      })



    }

    log = (username, password) => {
      var data = {
        USERNAME : username,
        PASSWORD : password,
      }
      console.log(data)
      this.props.loginUser(data)

    }

    validateEmail = () => {
      // DARI STACKOVERFLOW :) EMAIL VALIDATION INDICATOR
      var email = this.state.email.replace(/\s/g, "")
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    


    render(){
      if(this.state.redirect_status === true){
        return (
          <Redirect to="/waitingverification"></Redirect>
        )
      }
      if(this.props.userdata.USERNAME !== ''){
        return(
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
                
                {this.state.username.length > 12 || this.state.username.length < 8 ? <span className="text-danger">* Username Must be Between 8-12 characters</span> : null}
                <div className="wrap-input100 validate-input m-b-10" >
                  <input className="input100" ref="inputuser" type="text" onChange={()=>this.setState({username : this.refs.inputuser.value})}/>
                  <span className="focus-input100" />
                </div>
               
                
              
              
                <span className="txt1 p-b-11">
                  Contact Number
                </span>
                {this.state.contact.length < 8 || this.state.contact.length > 12 ? <span className="text-danger"> * Must be a valid phone number</span> : null}
                <div className="wrap-input100 validate-input m-b-36" >
                  <input className="input100" ref="inputcontact" type="tel" onChange={()=>this.setState({contact : this.refs.inputcontact.value})} />
                  <span className="focus-input100" />
                </div>
                <span className="txt1 p-b-11">
                  Email
                </span>
                {!this.validateEmail() ? <span className="text-danger"> * Must be a valid email</span> : null}
                <div className="wrap-input100 validate-input m-b-36" >
                  <input className="input100" ref="inputemail" type="text"  onChange={()=>this.setState({email : this.refs.inputemail.value})}/>
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
                {this.state.password.length > 12 || this.state.password.length < 8 ? <span className="text-danger"> * Must be between 8-12 characters</span> : null}
                <div className="wrap-input100 validate-input m-b-12" >
 
                    <i className="fa fa-eye" />
              
                  <input className="input100" ref="inputpassword" type="password"  onChange={()=>this.setState({password : this.refs.inputpassword.value})}/>
                  <span className="focus-input100" />
                </div>
                <span className="txt1 p-b-11">
                  Confirm Password
                </span>
                {this.state.password !== this.state.conpassword || this.state.conpassword.length < 8 ? <span className="text-danger"> * Must match your password</span> : null }
          
                <div className="wrap-input100 validate-input m-b-12" >
 
                    <i className="fa fa-eye" />
              
                  <input className="input100" ref="inputpasswordconfirm" type="password"  onChange={()=>this.setState({conpassword : this.refs.inputpasswordconfirm.value})}/>
                  <span className="focus-input100" />
                </div>
                <div className="container-login100-form-btn mt-5 mb-3">
                  {this.props.isloading === true ?<span className="text-center" style={{fontSize : '25px', marginBottom : '10px'}}>Loading, Please Wait..<ReactLoading type="spin" color="#afb9c9"  /></span> : <input type="button" className="login100-form-btn btn-block" value="Sign Up Now!" onClick={() => this.checkDatabaseUser()}/>}
                </div>
              </div>
          </div>
        </div>
        <div id="dropDownSelect1" />
      </div>
        )
    }
}


const mapStateToProps = (state) =>{
  return {
      userdata : state.userdata,
      isloading : state.userdata.LOADING
  }
}



export default connect(mapStateToProps, {loginUser, loading, loadingFalse})(registerPage);