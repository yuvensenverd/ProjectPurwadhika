import React from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import numeral from 'numeral'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Card, Button,  CardText, Row,  } from 'reactstrap';
import Footer from '../components/footer'
import { URLAPI } from '../redux/actions/types';


class UserCart extends React.Component{
    state={
        cart_user : [],
        finishload : false,
        totalprice : 0
    }
   

    componentDidMount(){
        
    }

    getItemCartUser = () => {
     
        if(this.props.username !== "" && this.state.finishload === false){
            console.log(this.props.userdata.CART)
            console.log(this.props.username)
            Axios.get(URLAPI+'/cart/getcart?user='+this.props.username)
            .then((res)=>{
                this.setState({
                    cart_user : res.data,
                    finishload : true
                })
                console.log(this.state.cart_user)
                
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        
    }

    addQty = (index) => {
        console.log(index)
        console.log(this.state.cart_user[index].qty)
        if(this.state.cart_user[index].qty !== 0){
            this.state.cart_user[index].qty = this.state.cart_user[index].qty +1
        }
        var hasil = this.state.cart_user
        this.setState({
            cart_user : hasil
        })
    }

    minQty = (index) => {
        console.log(index)
        console.log(this.state.cart_user[index].qty)
        if(this.state.cart_user[index].qty !== 0){
            this.state.cart_user[index].qty = this.state.cart_user[index].qty -1
        }
        var hasil = this.state.cart_user
        this.setState({
            cart_user : hasil
        })
        
    }




    printCartSummary = () =>{
       
            if(this.state.finishload === true) {

                var output = this.state.cart_user.map((item, index)=>{
                  
                    return(
                        <div className="itemcart">
                            <div className="subtitletext">{item.shopname}</div>
                            <div className="row">
                                <div className="col-md-2">
                                    <img src={item.image} alt="item image" width="100%" height="100%"/>
                                </div>
                                <div className="col-md-9">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="d-flex flex-column">
                                                <div>{item.name}</div>
                                                <div className="itempricecart">{"@Rp" + numeral(item.price).format(0,0)}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            
                                        </div>
                                        <div className="col-md-3">
                                            <div className="d-flex flex-row">
                                                <div className="mr-4">
                                                <FontAwesomeIcon size="2x"  icon={faTrashAlt} style={{color : "black"}}/>
                                                </div>
                                                <input type="button" className="btn btn-secondary rounded-circle mr-3 p-1 pl-3 pr-3 font-weight-bolder" value="-" onClick={()=>this.minQty(index)}/>
                                                <input type="text" className="form-control d-inline text-center" style={{width :"75px", fontWeight : "bolder", fontSize : "18px"}} value={item.qty}  readOnly/>
                                                <input type="button" className="btn btn-secondary rounded-circle ml-3 p-1 pl-3 pr-3 font-weight-bolder" value="+" onClick={()=>this.addQty(index)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
          
     
                return output
            }
        
    }

   

    printTotalPrice = () =>{
        if(this.state.finishload === true){
            var total = 0 
            this.state.cart_user.map((item)=>{
                total = total + (item.qty * item.price)
            })
            if(total !== this.state.totalprice){ // SUPAYA GAK REACH MAXIMUM DEPTH DLL
                this.setState({
                    totalprice : total
                })
            }
           
            console.log(this.state.totalprice)
        }
    }

    render(){
        return(
            <div>
            <div className="mycontainer p-t-100 mb-5">
                <div className="row">
                    <div className="col-md-9">
                        <h1 className="mb-3">Cart Items</h1>
                 
                        {this.getItemCartUser()}
                        {this.printCartSummary()}
                        {this.printTotalPrice()}
                    </div>
                    <div className="col-md-3">
                        <div className="mt-5 ml-2">
                            <Row>
                        
                                <Card body>
                                <div className="subtitletext mb-3">Cart Summary</div>
                                <CardText>Total Price</CardText>
                                <CardText>Rp. {numeral(this.state.totalprice).format(0,0)}</CardText>
                                <Button>PAYMENT</Button>
                                </Card>
                            
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
            
                {/* <Footer/> */}
             
            </div>
        )
    }
}

const mapStateToProps= (state)=>{
    return{ 
      username : state.userdata.USERNAME,
      userdata : state.userdata
    }
}


export default connect(mapStateToProps)(UserCart)