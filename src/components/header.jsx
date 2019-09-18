import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser, updateUser } from '../redux/actions/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faBell, faStore} from '@fortawesome/free-solid-svg-icons'
import { URLAPI, PATHDEFAULTPICT } from '../redux/actions/types';
import numeral from 'numeral'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Axios from 'axios';




 class Header extends React.Component {
  state = {
    isOpen: false,
    modalOpen : false,
    dropdownOpen : false
  }
  
 

  onMouseEnter() {
    this.setState({dropdownOpen: true});
  }

  onMouseLeave() {
    this.setState({dropdownOpen: false});
  }

  onClickTopUp = () =>{
    if(this.props.userdata.STATUS === 'Unverified'){
      return window.alert("Your account has not been verified yet, please verify your account with the link sent to email")
    }
    
    var topup = parseInt(this.refs.topup.value)
    if(topup < 10000){
      return window.alert('Minimal Rp 10,000,00 untuk Top Up')
    }
    const token = localStorage.getItem('token')
    const headers = {
        headers: {
            'Authorization' : `${token}`
        }
    }
    var data = {
      userid : this.props.userdata.userid,
      balance : this.refs.topup.value

    }
    Axios.put(URLAPI + `/user/onusertransaction`, data, headers)
    .then((res)=>{
      window.alert("topup berhasil")
      this.props.updateUser(res.data[0])
      this.setState({
        modalOpen : false
      })
    })
    .catch((err)=>{
      console.log(err)
    })

  }

  closeNav = () =>{
    this.setState({
      isOpen : false
    })
  }

  // SUPAYA WAKTU LOGIN, DROPDOWNNYA TUTUP
  componentWillReceiveProps(newprops){

    if(this.props.username !== newprops.username){

      this.setState({
        dropdownOpen : false
      })
    }
  }


  render() {
    if(this.props.userdata.LOADING === true){
      return(
        <Navbar  style={{backgroundColor : "#1f2533", height : '60px'}}  fixed dark expand="md" ></Navbar>
      )
    }
    return (
      <div className="navbarheader">

         <Modal isOpen={this.state.modalOpen} toggle={()=>this.setState({modalOpen : false})} size="lg" style={{width: '1000px', position : 'absolute', top : '20%', left : '30%'}}>
                        <ModalHeader>
                            <div className="subtitletext" style={{fontSize : "26px"}}>ADD BALANCES</div>
                        </ModalHeader>
                        <ModalBody >
                           
                                  <h5>Your Current Balance</h5>
                                  <input type="text" value={"Rp  " + numeral(this.props.userdata.SALDO).format(0,0)} className="form-control mb-3" readOnly />
                                  <h5>TOP UP Amount</h5>
                                  <input type="number" ref="topup" className="form-control mb-3"  />
                                
                            
                        </ModalBody>
                        <ModalFooter>
                        
                                <input type="button" value="PROCEED" className="btn btn-danger btn-lg navbartext" onClick={()=>this.onClickTopUp()} />
                          
                              
                        </ModalFooter>
                </Modal>
        <div>
        <Navbar  style={{backgroundColor : "#1f2533"}}  fixed dark expand="md">
          <Link to="/" className="navbartext">
          <NavbarBrand  className="navbartext mr-5">
            home
          </NavbarBrand>
          </Link>
          <NavbarToggler onClick={this.toggle} />
       
        
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            </Nav>
            {this.props.username === '' 
              ?
              null
            :
              <div className="p-0">
              <UncontrolledDropdown  onMouseOver={()=>this.onMouseEnter()} onMouseLeave={()=>this.onMouseLeave()} isOpen={this.state.dropdownOpen}  nav inNavbar >
             
                <DropdownToggle className="navbartext pt-1 mr-3" style={{fontWeight : "bolder", fontSize : '15px'}} nav caret>

                <Link to="/editprofile" className="navbartext">{"Welcome, "+ this.props.username }     </Link>
                </DropdownToggle>
           

                <div className="fixednav p-0">
                <DropdownMenu className="navbartext pt-1 "  style={{backgroundColor : "transparent", color : "black", width : "600px", border:"none"}} right> 
             
                  <div className="row p-3 boxshadow" style={{backgroundColor : "#3A3D42", height : "100%", width : "100%"}}> 
                    
                  
                        {/* <DropdownItem> */}
                        <DropdownItem  style={{padding : "0px", border : "none", background : "transparent"}}>
                              {this.props.userdata.HAVESHOP === true
                               ? 
                             <Link  to="/userstore" style={{color : "white", border : "none"}}   onClick={()=>this.closeNav()} className="navbartext form-control bg-info text-center mb-2">
                               Your Store
                              </Link>
                              :
                              <Link  to="/createstore" style={{color : "white", border : "none"}}   onClick={()=>this.closeNav()} className="navbartext form-control bg-danger text-center mb-2">
                               Create your Store
                              </Link>
                              }
                              </DropdownItem>
                         
                         
                   
                        {/* </DropdownItem> */}
                        {/* <DropdownItem> */}
                            
                        <div className="col-md-4">
                          <div className="navbartext text-center">
                            Avatar
                          </div>
                          <div>
                            <img className="storeimage" 
                            src={this.props.userdata.PROFILEIMG
                              ?
                              URLAPI+this.props.userdata.PROFILEIMG
                              :
                              URLAPI+PATHDEFAULTPICT} 
                            height="100px">
                            </img>
                            </div>
                        </div>
                        <div className="col-md-8 subtitletext p-0" style={{fontSize : "15px"}}>
                            <div className="mb-2 text-light">{this.props.username}</div>
                            <div className="d-flex flex-row mb-3">
                        
                            <div  className="mb-2 text-light mr-3" style={{fontSize : '20px'}}> {"Rp  " + numeral(this.props.userdata.SALDO).format(0,0)}</div>
                            <input type="button" className="btn btn-danger " value="ADD BALANCE" style={{height : '40px'}} onClick={()=>this.setState({modalOpen :true})}/>
                            </div>
                            <Link to="/editprofile" className="subtitletext">
                            <DropdownItem  style={{padding : "0px", border : "none"}}>
                            <div className="text-light"><input type="button" className="btn btn-success form-control" value="Edit Profile"/></div>
                            </DropdownItem>
                            </Link>
                            <DropdownItem  style={{padding : "0px", margin : "0px"}}>
                            <div className="btn bg-primary form-control"><Link to="/userhistory" className="navbartext " style={{color : "white", border : "none"}}>Transaction History   </Link></div>
                            </DropdownItem>
                            <DropdownItem  style={{padding : "0px", margin : "0px"}}>
                            <div  onClick={()=>this.props.logoutUser()} className="btn bg-secondary form-control " ><a href="/" className="navbartext" style={{color : "white", border : "none"}}>Logout </a></div>
                            </DropdownItem>
                            
                        </div>
                            

                        {/* </DropdownItem> */}
                    
                  
                  </div>
                </DropdownMenu>
                </div>
                </UncontrolledDropdown>
              </div>
             
       
            }
            
            {this.props.username === '' 
            ?
            <div className="row mr-3">
            <NavItem >
              <Link to="/login" className="navbartext pt-1 mr-3" style={{fontWeight : "bolder", fontSize : '15px'}}>
                Login
                </Link>
            </NavItem>
            <NavItem >
              <Link to="/register" className="navbartext pt-1" style={{fontWeight : "bolder", fontSize : '15px'}}>
                Sign Up
              </Link>
            </NavItem>
            </div>
            :
            null
          }
          { this.props.username !== "" && this.props.userdata.HAVESHOP
           ?
          
           
           <div className="navbartext mr-3">
          
             <Link to='/confirmorder'>
        
             <FontAwesomeIcon size="2x"  icon={faStore} style={{color : "lightblue"}}>
            
             </FontAwesomeIcon>
             </Link>
             
           </div>
           :
           null
          }
          { this.props.username !== ""
           ?
          
           
           <div className="navbartext mr-3">
          
             <Link to='/notification'>
             <div className="bellnum">{this.props.userdata.NOTIFLEN}</div>
             <FontAwesomeIcon size="2x"  icon={faBell} style={{color : "orange"}}>
            
             </FontAwesomeIcon>
             </Link>
             
           </div>
           :
           null
          }


           { this.props.username !== ""
           ?
          
           
           <div className="navbartext">
             <Link to='/usercart'>
             <div className="cartnum">{this.props.usercartlen}</div>
             <FontAwesomeIcon size="2x"  icon={faShoppingCart} style={{color : "#c02c3a"}}>
            
             </FontAwesomeIcon>
             </Link>
             
           </div>
           :
           null
          }

          </Collapse>
          
        </Navbar>
        </div>
        
        {/* <div>

        
          <center>
          <div className="d-flex flex-row justify-content-center p-2" >
                    <input type="text" className="form-control form-control text-center" placeholder="Search Items.." style={{ alignSelf: "center", borderRadius : "3px", width : "750px"}}></input>
                    <div  className="btn"  style={{height : "40px", width : "100px", backgroundColor : "black", fontWeight : "bolder", color : "white"}}>
                      <FontAwesomeIcon size="1x"  icon={faSearch} style={{color : "white"}}>
             
                      </FontAwesomeIcon>
                    </div>
          </div>
          </center>
      

        </div> */}
        
      </div>
    );
  }
}

const mapStateToProps= (state)=>{
  return{ 
      username : state.userdata.USERNAME,
      userdata : state.userdata,
      usercartlen : state.userdata.CARTLEN
  }
}


export default connect(mapStateToProps, {logoutUser, updateUser})(Header);