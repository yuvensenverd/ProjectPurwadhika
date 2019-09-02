import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import Axios from 'axios'
import numeral from 'numeral'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Card, Button,  CardText, Row,  } from 'reactstrap';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { addItemCart, updateNotification, updateUser } from './../redux/actions/index'
import Footer from '../components/footer'
import { URLAPI, PATHDEFAULTPRD, PATHDEFAULTCARTEMPTY } from '../redux/actions/types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Link} from 'react-router-dom'

class UserCart extends React.Component{
    state={
        cart_user : [],
        finishload : false,
        totalprice : 0,
        updatedproduct : [],
        paymentmodal : false,
        // redirect : false,
        modaltransaction : false
    }
   

    componentWillUnmount(){
        if(this.state.cart_user.length !== 0 && this.state.updatedproduct.length !== 0){

            this.updateItemCart()
        }
    }

    updateItemCart = () =>{
        console.log(this.props.userdata.userid)
        var statecart = this.state.cart_user
        var updatecart = this.state.updatedproduct
        console.log(statecart)
        for(var i = 0; i<updatecart.length; i++){
            if(updatecart[i].value !== 0){
                var updatedqty = statecart[i].qty 
                console.log("updatedqty menjadi " + updatedqty)
                console.log("Masuk ubah produk " + updatecart[i].productid + "qty menjadi " + updatedqty)
                const token = localStorage.getItem('token')
                const headers = {
                    headers: {
                        'Authorization' : `${token}`
                    }
                }

                Axios.post(URLAPI + '/cart/updatecart', {
                    qtyupdated : updatedqty,
                    userid : this.props.userdata.userid ,
                    productid : updatecart[i].productid
                }, headers)
                .then((res)=>{
                    console.log("Berhasil update cart willunmount")
                })
                .catch((err)=>{
                    console.log(err)
                })
                // {
                //     qtyupdated : updatedqty,
                //     userid : this.props.userdata.userid ,
                //     productid : this.props.location.search.replace("?pid=", "")
                // }
            }else{
                console.log("Gak ada perubahan")
            }
        }

    }

    // Get user cart data from database
    getItemCartUser = () => {
     
        if(this.props.username !== "" && this.state.finishload === false){
            console.log(this.props.userdata.CART)
            console.log("masuk getitem")
            const token = localStorage.getItem('token')
            const headers = {
                headers: {
                    'Authorization' : `${token}`
                }
            }
            console.log(token)
         
            Axios.get(URLAPI+'/cart/getcart?user='+this.props.username, headers)
            .then((res)=>{
                this.setState({
                    cart_user : res.data,
                    finishload : true

                })
            
                console.log(this.state.cart_user)
                this.props.addItemCart(res.data) // update redux
                
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        
    }


    // Add item in usercart page
    addQty = (index) => {
       
        // console.log(this.state.updatedproduct[0]["productid"]) 
        var hasil = this.state.cart_user
        hasil[index].qty = hasil[index].qty +1

       
        // save changes
        var cart = this.state.updatedproduct // arr of obj
        cart[index].value = cart[index].value + 1
   
        this.setState({
            cart_user : hasil,
            updatedproduct : cart
        })
    }

    minQty = (index) => {
      
        if(this.state.cart_user[index].qty !== 1){
            var hasil = this.state.cart_user
            hasil[index].qty =hasil[index].qty -1
            
            // save changes
            var cart = this.state.updatedproduct // arr of obj
            cart[index].value = cart[index].value -1

            this.setState({
                cart_user : hasil,
                updatedproduct : cart
            })
        }
       
        
        
    }



    onDeleteItemCart = (id, index) =>{
        console.log(id)
        console.log(this.props.userdata.userid)
        var confirm = window.confirm("Are you sure to remove this item from your cart?")
        if(confirm){
            var statecart = this.state.cart_user
            var updatecart = this.state.updatedproduct
            console.log(statecart)
            const token = localStorage.getItem('token')
            const headers = {
                headers: {
                    'Authorization' : `${token}`
                }
            }
            // UPDATE BARANG YG DIUBAH DI STATE DULU
            for(var i = 0; i<updatecart.length; i++){
                if(updatecart[i].value !== 0){
                    var updatedqty = statecart[i].qty 
                    console.log("updatedqty menjadi " + updatedqty)
                    console.log("Masuk ubah produk " + updatecart[i].productid + "qty menjadi " + updatedqty)
                   
                    Axios.post(URLAPI + '/cart/updatecart', {
                        qtyupdated : updatedqty,
                        userid : this.props.userdata.userid ,
                        productid : updatecart[i].productid
                    }, headers)
                    .then((res)=>{
                        console.log("Berhasil update cart willunmount")

                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                }
            }
            Axios.get(URLAPI + '/cart/deletecart/'+id+'/'+this.props.userdata.userid, headers)
            .then((res)=>{
                console.log("berhasil delete")
                window.alert("berhasil delete product")
                console.log(res.data)
                var cartupdate = this.state.updatedproduct
                cartupdate.splice(index, 1)
                this.setState({
                    finishload : false // supaya nge-get ulang
                })
    
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }




    printCartSummary = () =>{
            var productobj = []
            // Print user cart table when loading is finished
            if(this.state.finishload === true) {
                if(this.state.cart_user.length !== 0){

                    var output = this.state.cart_user.map((item, index)=>{
                        productobj.push({
                            productid : item.id,
                            value : 0
                        })
                        return(
                            <div className="itemcart">
                                <div className="subtitletext mb-3">{item.shopname}</div>
                                <div className="row">
                                    <div className="col-md-2">
                                        <img 
                                         src={item.images ?
                                            URLAPI+ item.images.split(',')[0]
                                            :
                                            URLAPI + PATHDEFAULTPRD
                                            }  
                                        alt="item image" width="100%" height="100%"/>
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
                                                    <FontAwesomeIcon  size="2x"  icon={faTrashAlt} style={{color : "black", cursor : "pointer"}} onClick={()=>this.onDeleteItemCart(item.id, index)} />
                                                    </div>
                                                    <input type="button" className="btn btn-secondary rounded-circle mr-3 p-1 pl-3 pr-3 font-weight-bolder" value="-" onClick={()=>this.minQty(index, item.id)}/>
                                                    <input type="text" className="form-control d-inline text-center" style={{width :"75px", fontWeight : "bolder", fontSize : "18px"}} value={item.qty}  readOnly/>
                                                    <input type="button" className="btn btn-secondary rounded-circle ml-3 p-1 pl-3 pr-3 font-weight-bolder" value="+" onClick={()=>this.addQty(index, item.id)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    if(this.state.updatedproduct.length === 0){
                        this.setState({
                            updatedproduct : productobj
                        })
                        console.log(this.state.updatedproduct)
                    }
                }else{
                    return (
                        <div>
                            <h1 className="m-t-120">Your Cart is still empty! Start Shopping Now!</h1>
                            <Link to="/product">
                            <input type="button" value="Start Shopping" className="btn btn-danger btn-lg navbartext"/>
                            </Link>   
                         
                            <img src={URLAPI + PATHDEFAULTCARTEMPTY} width="200px" height="200px"/>
                          
                        </div>
                    )
                }
                
                
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
           
          
        }
    }

    onPaymentButtonClick = () =>{
        this.setState({
            paymentmodal : true
        })
        
    }

    onPayClick = () =>{
        var data = {
            userid : this.props.userdata.userid,
            totalprice : this.state.totalprice
        }
        var arr = []
        this.state.cart_user.map((val)=>{
            arr.push([val.id, val.price, val.qty])
        })
        data.listproduct = arr
        
        const token = localStorage.getItem('token')
        const headers = {
            headers: {
                'Authorization' : `${token}`
            }
        }

        Axios.post(URLAPI + '/cart/addtransaction', data, headers)
        .then((res)=>{
            
            
           

            //
            var data = {
                userid : this.props.userdata.userid,
                balance : -(this.state.totalprice)
              }
              Axios.put(URLAPI + `/user/onusertransaction`, data, headers)
              .then((res)=>{
           
                this.props.updateUser(res.data[0])
                this.props.addItemCart([]) // set cart empty in redux
                this.props.updateNotification(this.props.userdata.NOTIFLEN + arr.length)
                this.setState({
                    modaltransaction : true,
                    cart_user : []
                })
              
              })
              .catch((err)=>{
                console.log(err)
              })

        })
        .catch((err)=>{

        })
    }

    printPaymentDetails = () =>{
        var jsx = this.state.cart_user.map((item, index)=>{
            return (
                <div className="d-flex flex-column mb-3">
                    <div>{index+1 + ". " +item.name + ' x '  +item.qty}</div>
                    <div className="font-weight-bolder">{" Rp "+numeral(item.price * item.qty).format(0,0) }</div>
                </div>
            )
        })
        return jsx
    }


    render(){
        // if(this.state.redirect === true) {
        //     return (
        //         <Redirect to='/'/>
        //     )
        // }
        return(
            <div>
                <Modal isOpen={this.state.modaltransaction} toggle={()=>this.setState({ modaltransaction : false})} size="lg" style={{maxWidth: '600px', position : 'absolute', top : '20%', left : '40%'}}>
                    <ModalHeader>
                        <div className="subtitletext text-center p-l-90" style={{fontSize : "26px"}}>Payment Success!!</div>
                    </ModalHeader>
                    <ModalBody >
                            <center>
                            <FontAwesomeIcon size="5x"  icon={faCheckCircle} style={{color : "green"}}>  
                            </FontAwesomeIcon>
                            </center>
                    </ModalBody>
                    <ModalFooter>
                            <Link to="/product">
                            <input type="button" value="Go Back to Shop" className="btn btn-danger btn-lg navbartext" />
                            </Link>
                            <Link to="/">
                            <input type="button" value="Back to Home" className="btn btn-info btn-lg navbartext"/>
                            </Link>    
                    </ModalFooter>
              </Modal>
              <Modal isOpen={this.state.paymentmodal} toggle={()=>this.setState({paymentmodal : false})} size="lg" style={{width: '550px'}}>
                    <ModalHeader>
                        <center><div className="subtitletext text-center p-l-110" style={{fontSize : "26px"}}>Payment Details</div></center>
                    </ModalHeader>
                    <ModalBody >
                    <div className="subtitletext mb-2 mt-2"> Total Price  </div>  
                    <input type="text" className="form-control" ref="totalprice" value={"Rp "+numeral(this.state.totalprice).format(0,0)} readOnly />
                    <div className="subtitletext mb-2 mt-2"> Your Balance  </div>  
                    <input type="text" className="form-control" ref="userbalance" value={"Rp "+numeral(this.props.userdata.SALDO).format(0,0)} readOnly />

                    {
                        this.props.userdata.SALDO < this.state.totalprice 
                        ?
                        <div className="subtitletext mb-2 mt-5 text-danger"> Your Balance is not sufficient ! Please Top Up  </div>  
                        :
                        null
                    }    
                    
                    </ModalBody>
                    <ModalFooter>
                        <center>
                            <div className="p-r-140">

                                <input type="button" className="btn btn-danger navbartext mr-5" value="CANCEL" onClick={()=>this.setState({paymentmodal : false})} />
                                {
                                    this.props.userdata.SALDO < this.state.totalprice 
                                    ?
                                    <input type="button" className="btn btn-secondary navbartext" value="PAY NOW" disabled/>
                                    :
                                    <input type="button" className="btn btn-success navbartext" value="PAY NOW" onClick={()=>this.onPayClick()}/>
                                } 
                            </div>
                        </center>
                    </ModalFooter>
            </Modal>
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
                            {this.state.cart_user.length !== 0 
                            ?
                        
                            <Row>
                                <Card body>
                                <div className="subtitletext mb-4">Cart Summary</div>
                                {this.printPaymentDetails()}
                                <CardText className="mt-5">Total Price</CardText>
                                <CardText>Rp. {numeral(this.state.totalprice).format(0,0)}</CardText>
                                <input type="button" className="btn btn-dark navbartext" value="PAYMENT" onClick={()=>this.onPaymentButtonClick()}></input>
                                </Card>
                            </Row>
                            :
                            null
                            }
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


export default connect(mapStateToProps, {addItemCart, updateNotification, updateUser})(UserCart)