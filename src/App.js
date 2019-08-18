import React from 'react';

import './App.css';
import Header from './components/header';

import { Route , Link, Switch } from 'react-router-dom'
import Homepage from './pages/homepage'
import LoginPage from './pages/loginpage'
import RegisterPage from './pages/registerpage'
import productPage from './pages/productpage'
import promoDetails from './pages/promoDetails'
import createStore from './pages/createstore'
import userStore from './pages/userstore'
import userHistory from './pages/userhistory'
import editProfile from './pages/editprofile'
import productDetails from './pages/productDetails'
import PageNotFound from './pages/pagenotfound'
import WaitingVerification from './pages/waitingverification'
import NotificationPage from './pages/notificationpage'
import Verified from './pages/verified'
import cartPage from './pages/usercart'
import AdminPage from './pages/adminpage'
import { connect } from 'react-redux'
import { loginUser } from './redux/actions/index'
import Axios from 'axios';
import { URLAPI } from './redux/actions/types';




class App extends React.Component{

  // LOCAL STORAGE FOR LOGIN
  componentDidMount(){
    var username = localStorage.getItem('username')
    var password = localStorage.getItem('password')
    console.log(username)
    console.log(password)
    if(username && password){

      this.checkDatabaseUser(username, password)
    }
  }

  checkDatabaseUser = (username, password) => {

    var data = {
      name : username,
      pass : password
    }
    
    Axios.post(URLAPI+'/user/getuser', data)
    .then((res)=>{
      if(res.data[0]){

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
      PASSWORD : password
    }

    this.props.loginUser(data)
   
  }
  

  render(){
    return (
      <div>
        <Header></Header>
     
        {/* <Switch> */}
        <Switch>
        <Route path='/' exact component={Homepage}></Route>
        <Route path='/login'component={LoginPage}></Route>
        <Route path='/register'component={RegisterPage}></Route>
        <Route path='/promo' component={promoDetails}></Route>
        <Route path='/product' component={productPage}></Route>
        <Route path='/createstore' component={createStore}></Route>
        <Route path='/userstore' component={userStore}></Route>
        <Route path='/userhistory' component={userHistory}></Route>
        <Route path='/editprofile' component={editProfile}></Route>
        <Route path='/productdetails' component={productDetails}></Route>
        <Route path='/usercart' component={cartPage}></Route>
        <Route path='/notification' component={NotificationPage}></Route>
        <Route path='/waitingverification' component={WaitingVerification}></Route>
        <Route path='/verified' component={Verified}></Route>
        <Route path='/admin' component={AdminPage}></Route>
        <Route path='*' component={PageNotFound}></Route>
        </Switch>

       

        {/* </Switch> */}
      </div>
      
    )
  }
}

export default connect(null, {loginUser})(App) ;
