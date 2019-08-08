import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../redux/actions/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons'



 class Header extends React.Component {
  constructor(props) {
    super(props);
    this.closeNav = this.closeNav.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    console.log("Masuk")
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  closeNav = () =>{
  
    this.setState({
      isOpen : false
    })
  }
  render() {
    return (
      <div className="navbarheader">
        <Navbar  style={{backgroundColor : "#1f2533"}}  fixed dark expand="md">
          <Link to="/" className="navbartext">
          <NavbarBrand  className="navbartext mr-5">
            home
          </NavbarBrand>
          </Link>
          <NavbarToggler onClick={this.toggle} />
         
         {/* <NavItem>
          <center>
          <div className="d-flex flex-row justify-content-center" >
                    <input type="text" className="form-control form-control text-center" placeholder="Search Items.." style={{ alignSelf: "center", borderRadius : "3px", width : "750px"}}></input>
                    <div  className="btn"  style={{height : "40px", width : "100px", backgroundColor : "black", fontWeight : "bolder", color : "white"}}>
                      <FontAwesomeIcon size="1x"  icon={faSearch} style={{color : "white"}}>
             
                      </FontAwesomeIcon>
                    </div>
          </div>
          </center>
          </NavItem>  */}
        
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {/* <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem className="navbartext pt-2">
                GitHub
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
    
           
            </Nav>
            {this.props.username === '' 
              ?
              null
            :
              <div className="p-0">
              <UncontrolledDropdown   nav inNavbar >
                <DropdownToggle className="navbartext pt-1 mr-3" style={{fontWeight : "bolder", fontSize : '15px'}} nav caret>
                {"Welcome, "+ this.props.username }
                </DropdownToggle>

                <div className="fixednav p-0">
                <DropdownMenu className="navbartext pt-1 "  style={{backgroundColor : "transparent", color : "black", width : "600px", border:"none"}} right> 
                {/* CODE DIATAS MASIH KACAU  */}
                  <div className="row p-3 boxshadow" style={{backgroundColor : "#3A3D42", height : "100%", width : "100%"}}> 
                    
                  
                        {/* <DropdownItem> */}
                        <DropdownItem  style={{padding : "0px", border : "none", background : "transparent"}}>
                             <Link  to="/createstore" style={{color : "white", border : "none"}}   onClick={()=>this.closeNav()} className="navbartext form-control bg-danger text-center mb-2">
                               
                               Create your Store
                              
                              </Link>
                              </DropdownItem>
                         
                         
                   
                        {/* </DropdownItem> */}
                        {/* <DropdownItem> */}
                            
                        <div className="col-md-4">
                          <div className="navbartext text-center">
                            Avatar
                          </div>
                          <div>
                            <img className="storeimage" src="https://app.unbouncepreview.com/publish/assets/567d1d2a-99a8-4b43-ae7f-2e3eaa9fc929/116cead7-sqd-step1.png" height="100px"></img>
                            </div>
                        </div>
                        <div className="col-md-8 subtitletext p-0" style={{fontSize : "15px"}}>
                            <div className="mb-2 text-light">{this.props.username}</div>
                            <div  className="mb-2 text-light"> Balance : Rp 0,00</div>
                            <Link to="/editprofile" className="subtitletext">
                            <DropdownItem  style={{padding : "0px", border : "none"}}>
                            <div className="text-light"><input type="button" className="btn btn-success form-control" value="Edit Profile"/></div>
                            </DropdownItem>
                            </Link>
                            <DropdownItem  style={{padding : "0px", margin : "0px"}}>
                            <div className="btn bg-primary form-control"><Link to="/promo" className="navbartext " style={{color : "white", border : "none"}}>Check Coupon / Promo   </Link></div>
                            </DropdownItem>
                            <DropdownItem  style={{padding : "0px", margin : "0px"}}>
                            <div  onClick={()=>this.props.logoutUser()} className="btn bg-secondary form-control " ><Link to="/" className="navbartext" style={{color : "white", border : "none"}}>Logout </Link></div>
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
    );
  }
}

const mapStateToProps= (state)=>{
  return{ 
      username : state.userdata.USERNAME,
 
      usercartlen : state.userdata.CARTLEN
  }
}


export default connect(mapStateToProps, {logoutUser})(Header);