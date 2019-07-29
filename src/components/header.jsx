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
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons'


 class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar  style={{backgroundColor : "#1f2533"}}fixed dark expand="md">
          <Link to="/" className="navbartext">
          <NavbarBrand  className="navbartext">
            home
          </NavbarBrand>
          </Link>
          <NavbarToggler onClick={this.toggle} />
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
              <div>
              <UncontrolledDropdown   nav inNavbar>
                <DropdownToggle className="navbartext pt-1 mr-3" style={{fontWeight : "bolder", fontSize : '15px'}} nav caret>
                {"Welcome, "+ this.props.username }
                </DropdownToggle>
                
                <DropdownMenu className="navbartext pt-1 mr-3" style={{backgroundColor : "white", color : "black", width : "750px"}} right>
                  <div className="row"> 
                    
                    <div className="col-md-8">
                        {/* <DropdownItem> */}
                        <DropdownItem  style={{padding : "0px"}}>
                              <div className="navbartext form-control bg-danger text-center mb-2"  >   <Link to="/createstore" style={{color : "white"}}>Create your own Store        </Link></div>
                       </DropdownItem>
                        {/* </DropdownItem> */}
                        {/* <DropdownItem> */}
                              <div className="row">
                                  <div className="col-md-4">
                                      <img className="storeimage" src="https://app.unbouncepreview.com/publish/assets/567d1d2a-99a8-4b43-ae7f-2e3eaa9fc929/116cead7-sqd-step1.png" height="100px"></img>
                                  </div>
                                  <div className="col-md-8 subtitletext" style={{fontSize : "15px"}}>
                                      <div className="mb-2">{this.props.username}</div>
                                      <div  className="mb-2"> Balance : Rp 0,00</div>
                                      <Link to="/editprofile" className="subtitletext">
                                      <DropdownItem  style={{padding : "0px"}}>
                                      <div className="text-light"><input type="button" className="btn btn-success form-control mb-1" value="Edit Profile"/></div>
                                      </DropdownItem>
                                      </Link>
                                      <DropdownItem  style={{padding : "0px"}}>
                                      <div  onClick={()=>this.props.logoutUser()} className="btn bg-secondary form-control " ><Link to="/" className="navbartext" style={{color : "white"}}>Logout </Link></div>
                                      </DropdownItem>
                                  </div>
                              </div>

                        {/* </DropdownItem> */}
                    </div>
                    <div className="col-md-4">
                      {/* <DropdownItem className="mt-3 mb-3"> */}
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            {/* <div  onClick={()=>this.props.logoutUser()} className="mt-5 mb-2 btn bg-secondary " ><Link to="/" className="navbartext" style={{color : "white"}}>Logout        </Link></div> */}
                
                      {/* </DropdownItem> */}
                      {/* <DropdownItem> */}
                            <DropdownItem  style={{padding : "0px"}}>
                                <div className="btn bg-primary"><Link to="/promo" className="navbartext " style={{color : "white"}}>Check Coupon / Promo   </Link></div>
                            </DropdownItem>
                         </div>
                     
                      {/* </DropdownItem> */}
                    </div>
                  
                  
                  </div>
                </DropdownMenu>
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


           {this.props.cart.length === 0 && this.props.username !== ""
           ?
           <div className="navbartext">
             <FontAwesomeIcon size="2x"  icon={faShoppingCart} style={{color : "#c02c3a"}}></FontAwesomeIcon>
             <div className="cartnum">{this.props.cart.length}</div>
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
      cart : state.userdata.CART
  }
}


export default connect(mapStateToProps, {logoutUser})(Header);