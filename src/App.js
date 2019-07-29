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
import Axios from 'axios';



class App extends React.Component{
  
  render(){
    return (
      <div>
        <Header></Header>
     
        {/* <Switch> */}
        <Route path='/' exact component={Homepage}></Route>
        <Route path='/login'component={LoginPage}></Route>
        <Route path='/register'component={RegisterPage}></Route>
        <Route path ='/promo' component={promoDetails}></Route>
        <Route path='/product' component={productPage}></Route>
        <Route path='/createstore' component={createStore}></Route>
        <Route path='/userstore' component={userStore}></Route>
        <Route path='/userhistory' component={userHistory}></Route>
        <Route path='/editprofile' component={editProfile}></Route>
        <Route path= '/productdetails' component={productDetails}></Route>
        

        {/* </Switch> */}
      </div>
      
    )
  }
}

export default App;
