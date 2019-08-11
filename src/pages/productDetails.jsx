import React from 'react'
import numeral from 'numeral'
import Tab from './../components/tab'
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom'
import Axios from 'axios';
import { connect } from 'react-redux'
import { addItemCart } from './../redux/actions/index'
import Footer from './../components/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { URLAPI } from '../redux/actions/types';


class productDetails extends React.Component{
    state={
        
        jumlah : 1,
        price : 10000,
        totalprice : 0,
        productdetail : [],
        message : "",
        modalOpen : false
        // productid : null
    }
    
    componentDidMount(){
        
        // this.setState({
        //     productid : id
        // })
        var id = this.props.location.search.replace("?pid=", "")
        console.log(id)
        if(id){
            this.setState({
                message : "Loading Product..."
            })
            this.getProductDetails(this.props.location.search.replace("?pid=", ""))
        }else {
            console.log("Product Not Found")
        }
        console.log(this.props.username)
   
      
    }

    closeModal = () =>{
        this.setState({
            modalOpen : false
        })
    }


    addQty = () => {
        this.setState({
            jumlah : this.state.jumlah + 1,
            
        })
        this.calculateTotal()
    }

    minQty = () => {
        if(this.state.jumlah !== 0){
            this.setState({
                jumlah : this.state.jumlah - 1,
                
            })
            this.calculateTotal()
        }
        
    }
    getProductDetails= (id)=>{
       
        Axios.get(URLAPI+'/product/getproduct?id='+id)
        .then((res)=>{
            this.setState({
                productdetail : res.data
            })
            console.log(this.state.productdetail)
        })
        .catch((err)=>{
            this.setState({
                message : "Product Loading Error..."
            })
            console.log(err.response.data)
        })
    }



    addToCart = (item) =>{

        // MAKE CART AUTO ADD
        // INSERT INTO TABLE CART 
        // USERNAME = THIS.props.userdata.username
        if(this.state.jumlah === 0){
            return window.alert("Quantity must be atleast 1!")
        }

        var newcart = this.props.userdata.CART

        // NAMBAH PROPERTY TOTALPRICE DAN QTY KEDALAM CART
        item= {...item, totalprice : this.state.jumlah * this.state.productdetail[0].price, qty : this.state.jumlah}
        

        // COUNTING DUPLICATE ITEMS
        var exist = false
        var updatedqty = 0
        console.log(newcart)
        newcart.forEach(itemprop => {
            if(item.name === itemprop.name){
                itemprop.qty = itemprop.qty + item.qty

                updatedqty = itemprop.qty // take the updated qty for update in sql

                itemprop.totalprice = itemprop.totalprice + item.totalprice
                exist = true
            }
        });
        if(exist === false){
            newcart.push(item)
            this.props.addItemCart(newcart)

            // SQL INSERT (Coz New)
            Axios.post(URLAPI+'/cart/addcart?user='+this.props.username, {
                qty : this.state.jumlah,
                productid : this.props.location.search.replace("?pid=", "")
            })
            .then((res)=>{
              
                // OPEN MODAL NOTIFICATION
              
                this.setState({
                    modalOpen : true
                })
            })
            .catch((err)=>{
                console.log(err)
            })
        }else{

            // SHOULD BE SQL UPDATE , WHERE USERID & PRODUCT ID 
        
            this.props.addItemCart(newcart) // sama aja krn redux diupdate seluruh isi cart

            //SQL UPDATE
            Axios.post(URLAPI + '/cart/updatecart', {
                qtyupdated : updatedqty,
                userid : this.props.userdata.userid ,
                productid : this.props.location.search.replace("?pid=", "")
            })
            .then((res)=>{
                console.log("Berhasil update cart")
                this.setState({
                    modalOpen : true
                })
            })
            .catch((err)=>{
                console.log(err)
            })

        }

        // ADD TO SQL DATABASE CART
     
        

        

    }

    printProductDetails = () =>{
        if(this.state.productdetail.length === 1){ 
            return (
                <div className="p-t-100">
                
                         <div >
                            <Link to="/product" className="d-flex flex-row mb-4">
                                <FontAwesomeIcon size="2x"  icon={faBackward} style={{color : "#c02c3a"}}>  
                                </FontAwesomeIcon>
                                <div className="subtitletext ml-4 pb-2 " style={{fontSize : "22px"}}>Back</div>
                            </Link>
                        </div>
                        <div className="badge badge-pill badge-secondary mb-4" style={{fontSize : "30px"}}>{this.state.productdetail[0].shopname}</div>
                <div className="row ">
                        
                        <div className="col-md-5 border border-secondary">
                            <img src="" alt="productimage" height="500px"></img>
                        </div>
                        <div className="col-md-7 pl-5">
                            
                            <h1 className="mb-4">{this.state.productdetail[0].name}</h1>
                            <div className="badge badge-pill badge-danger mb-4" style={{fontSize : "20px"}}> {this.state.productdetail[0].category}</div>
                            <h3 className="mb-3">Quantity</h3>
                           
                           
                            <div className="mb-5">
                            <input type="button" className="btn btn-success rounded-circle mr-3 " value="-" onClick={() => this.minQty()}/>
                            
                            <input type="text" className="form-control d-inline text-center" style={{width :"100px", fontWeight : "bolder", fontSize : "23px"}} value={this.state.jumlah}  readOnly/>
                            <input type="button" className="btn btn-success rounded-circle ml-3" value="+" onClick={() => this.addQty()}/>
                            </div>
                            <div className="mb-5 ">
                            <h3 className="">Product Rating</h3>
                            <div>
                            <StarRatings
                            // rating={this.state.productdetail[0].rating} //2.5
                            rating={this.state.productdetail[0].rating}
                            starRatedColor="orange"
                            // changeRating={this.changeRating}
                            numberOfStars={5}
                            name='rating'
                            
                            />
                            </div>
                            </div>
                            <h3 className="mb-3">Total Price</h3>
                            <input type="text"  className="form-control d-inline mb-5" style={{width :"250px", fontWeight : "bolder", fontSize : "23px"}} value={"Rp. " + numeral(this.state.productdetail[0].price * this.state.jumlah).format(0,0)} readOnly/>
                            <div>
                                <input type="button" value="PROCEED" className="btn btn-dark btn-lg navbartext" style={{width : "350px"}} onClick={()=>this.addToCart(this.state.productdetail[0])} />
                            </div>
                            

                        </div>
                    </div>
                     <div className=" p-5">
                     {/* <div className="mb-4"><h1>Product Description</h1></div>
                     <div className="subtitletext" style={{fontSize : "17px"}}>  ayayayayasdfasdf</div> */}
                     <Tab datatabone={this.state.productdetail[0].desc} datatabtwo={this.state.productdetail[0].shopdesc}></Tab>
                    </div>
                    </div>
            )
        }else{
            return (
                <div>Product Not Found :(</div>
            )
        }
        
    }

    calculateTotal = () => {
        this.setState((state) => ({
            totalprice : state.jumlah *  state.price
        }));
    }
    printLength =()=>{
        return (
            <h1>{this.props.usercart.length}</h1>
        )
    }
    render(){
     
        return(
            <div>
            <div className="mycontainer mb-5">
                 <Modal isOpen={this.state.modalOpen} toggle={this.closeModal} size="lg" style={{maxWidth: '600px', position : 'absolute', top : '20%', left : '40%'}}>
                        <ModalHeader>
                            <div className="subtitletext text-center p-l-90" style={{fontSize : "26px"}}>Item Added To Cart !</div>
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
                                <Link to="/usercart">
                                <input type="button" value="Transaction Page" className="btn btn-info btn-lg navbartext"/>
                                </Link>    
                        </ModalFooter>
                </Modal>
                <div >
        

                    {this.printProductDetails()}
                    {this.state.productdetail.length === 0 ? <h1 className="row p-t-100">{this.state.message}</h1> : null}
        
                    {/* {console.log(JSON.stringify(this.props.usercart))}} */}
       
                    {/* <h1>{this.props.usercart.CARTLEN}</h1> */}
                    {/* SUDAH TAMBAH :) CART DI MOVIE PAKAI JSON */}
           


                </div>
               
            </div>
             <Footer/>
             </div>
        )
    }
}

const mapStateToProps= (state)=>{
    return{ 
      userdata : state.userdata,
      username : state.userdata.USERNAME
    }
}

export default connect(mapStateToProps, {addItemCart})(productDetails);