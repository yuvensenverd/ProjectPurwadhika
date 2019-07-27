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
                {"Welcome, "+ this.props.username}
                </DropdownToggle>
                
                <DropdownMenu className="navbartext pt-1 mr-3" style={{backgroundColor : "white", color : "black"}} right>
                  <DropdownItem>
                    <Link to="/">
                          <div className="navbartext" style={{color : "black"}}onClick={()=>this.props.logoutUser()}>Logout</div>
                      </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/promo">
                          <div className="navbartext" style={{color : "black"}} >Check Coupon / Promo</div>
                      </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/createstore">
                          <div className="navbartext" style={{color : "black"}} >Create your own Store</div>
                      </Link>
                  </DropdownItem>
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