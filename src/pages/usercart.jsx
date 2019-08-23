import React from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import numeral from 'numeral'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Card, Button,  CardText, Row,  } from 'reactstrap';
import { addItemCart } from './../redux/actions/index'
import Footer from '../components/footer'
import { URLAPI, PATHDEFAULTPRD } from '../redux/actions/types';


class UserCart extends React.Component{
    state={
        cart_user : [],
        finishload : false,
        totalprice : 0,
        updatedproduct : []
    }
   

    componentWillUnmount(){
        this.updateItemCart()
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
    addQty = (index,itemid) => {
       

        
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

    minQty = (index, itemid) => {
      
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
                                <input type="button" className="btn btn-dark navbartext" value="PAYMENT"></input>
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


export default connect(mapStateToProps, {addItemCart})(UserCart)