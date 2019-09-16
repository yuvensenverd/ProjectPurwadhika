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
import { URLAPI, PATHDEFAULTPRD } from '../redux/actions/types';
import { Redirect } from 'react-router'
import { isNull } from 'util';
import Fade from 'react-reveal/Fade';
import Carousel from './../components/carousel'
import ReactLoading from 'react-loading';


class productDetails extends React.Component{
    state={
        
        jumlah : 1,
        price : 10000,
        totalprice : 0,
        productdetail : [],
        relatedproduct : [],
        message : "",

        modalOpen : false,
        finishloadrelated : false,
        redirect : false,
        productid : null,
        genre : ''
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
     
   
      
    }

    componentDidUpdate = () =>{
        // KALAU UDAH DAPET GENRENYA PAS PRINT
        if(this.state.genre !== '' && this.state.relatedproduct.length === 0 && this.state.productid){
            this.getRelatedProducts()
        }
        
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

    }

    minQty = () => {
        if(this.state.jumlah !== 0){
            this.setState({
                jumlah : this.state.jumlah - 1,
                
            })
        }
        
    }
    getProductDetails= (id)=>{
       
        Axios.get(URLAPI+'/product/getproduct?id='+id)
        .then((res)=>{
            this.setState({
                productdetail : res.data,
                genre : res.data[0].category,
                productid : res.data[0].id
            })
            // console.log(this.state.productdetail)
            // console.log(this.state.genre)
        })
        .catch((err)=>{
            this.setState({
                message : "Product Not Found ... "
            })
            console.log(err)
        })
    }

    getRelatedProducts = () =>{
        console.log('related')
        if(this.state.genre !== '' && this.state.productid){

            Axios.get(URLAPI+'/product/getrelated?cat=' + this.state.genre + '&cid=' + this.state.productid)
            .then((res)=>{
                this.setState({
                    relatedproduct : res.data,
                    finishloadrelated : true
                })
                console.log(this.state.relatedproduct)
            })
            .catch((err)=>{
                this.setState({
                    message : "Product Loading Error..."
                })
                console.log(err)
            })
        }
    }



    addToCart = (item) =>{
        
        if(this.props.userdata.USERNAME === ""){
            
            return window.alert("You have to login first! Please log in !")
        }

        // MAKE CART AUTO ADD
        // INSERT INTO TABLE CART 
        // USERNAME = THIS.props.userdata.username
        if(this.state.jumlah === 0){
            return window.alert("Quantity must be atleast 1!")
        }
        if(this.props.userdata.USERNAME === ""){
 
            return window.alert("Login First before proceed to buy items")
        }

        var newcart = this.props.userdata.CART

        // NAMBAH PROPERTY QTY KEDALAM CART
        item= {...item, qty : this.state.jumlah}
        

        // COUNTING DUPLICATE ITEMS
        var exist = false
        var updatedqty = 0
        console.log(newcart)
        newcart.forEach(itemprop => {
            if(item.name === itemprop.name){
                itemprop.qty = itemprop.qty + item.qty

                updatedqty = itemprop.qty // take the updated qty for update in sql

                exist = true
            }
        });
        if(exist === false){
            newcart.push(item)
            console.log('newcart')
            console.log(newcart)
           

            // SQL INSERT (Coz New)
            const token = localStorage.getItem('token')
            const headers = {
                headers: {
                    'Authorization' : `${token}`
                }
            }
        
            Axios.post(URLAPI+'/cart/addcart?user='+this.props.username, {
                qty : this.state.jumlah,
                productid : this.props.location.search.replace("?pid=", "")
            }, headers)
            .then((res)=>{
              
                // OPEN MODAL NOTIFICATION
                console.log('asd')
                console.log(newcart)
                this.props.addItemCart(newcart)
              
                this.setState({
                    modalOpen : true
                })
            })
            .catch((err)=>{
                console.log(err)
            })
        }else{

            // SHOULD BE SQL UPDATE , WHERE USERID & PRODUCT ID 
        
      

            //SQL UPDATE
            const token = localStorage.getItem('token')
            const headers = {
                headers: {
                    'Authorization' : `${token}`
                }
            }
            Axios.post(URLAPI + '/cart/updatecart', {
                qtyupdated : updatedqty,
                userid : this.props.userdata.userid ,
                productid : this.props.location.search.replace("?pid=", "")
            }, headers)
            .then((res)=>{
                console.log("Berhasil update cart")
                this.props.addItemCart(newcart) // sama aja krn redux diupdate seluruh isi cart
                this.setState({
                    modalOpen : true
                })
            })
            .catch((err)=>{
                console.log(err)
            })

        }

    }

    goBack = () => {
        window.history.back();
    }

    printRecommended = () =>{
        if(this.state.relatedproduct.length !== 0){
            var jsx = this.state.relatedproduct.map((item)=>{
                return(
                
                <div className="col-md-2 ">
                      <a href={"/productdetails?pid=" + item.id} style={{color : 'black', textDecoration : 'none'}}>
                    <div className="d-flex flex-column p-2">
                    <img 
                        src={item.images ?
                        URLAPI+ item.images
                        :
                        URLAPI + PATHDEFAULTPRD
                        }  
                    alt="item image" width="100%" height='135px'/>
                    <div style={{height : '50px'}}> {item.name} </div>
                    <div className="text text-warning font-weight-bold"> {"Rp. " + numeral(item.price).format(0,0)}</div>
                    
                    </div>
                    </a>
    
                </div>
             
                    
                )
            })
            return jsx
        }
    }

    printProductDetails = () =>{
        if(this.state.productdetail.length === 1 && this.state.finishloadrelated === true){ 
            return (
                <div>
                <div className="p-t-100 mycontainer mb-5">
                    {/* <div>
                         <div  className="btn btn-danger badge badge-pill d-flex flex-row mb-4 p-2" onClick={()=>this.goBack()} style={{width : "150px"}}>
                          
                                <FontAwesomeIcon size="2x"  icon={faBackward} style={{color : "white"}}>  
                                </FontAwesomeIcon>
                                <div className="subtitletext ml-4 pb-2 "  style={{fontSize : "22px"}}>Back</div>
                        
                        </div>
                </div> */}
                   <Link to={`/profileshop?shopid=${this.state.productdetail[0].shopid}`} className="navbartext">
                        <div className="badge badge-pill badge-secondary mb-4" style={{fontSize : "30px"}}>{this.state.productdetail[0].shopname}</div>
                        </Link>
                        <div className="row ">
                        
                        <div className="col-md-5" style={{padding : '0px', margin : '0px'}}>
                            {/* <img src={URLAPI+this.state.productdetail[0].images.split(',')[0]} alt="productimage" height="100%" width="100%" style={{padding : '0px', margin : '0px'}}/> */}
                            <Carousel slideheight={'600px'} 
                            items={this.state.productdetail[0].images}
                            
                            />
                           
                            
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
                            <div className="d-flex flex-column mb-2">

                                <StarRatings
                                rating={this.state.productdetail[0].avgrating ? this.state.productdetail[0].avgrating : 0}
                                starRatedColor="orange"
                                // changeRating={this.changeRating}
                                numberOfStars={5}
                                starDimension="20px"
                                name='rating'
                                />
                            <p style={{fontSize : '20px', marginTop : '10px'}}>{`(${this.state.productdetail[0].ReviewCount} User Rated This Product)`}</p>
                            </div>
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
                    {this.state.relatedproduct.length !== 0 ? 
                    <div>
                    <h5 className="mb-4">Product Reccomendations</h5>
                    <div className="row mb-5">
                        
                        {this.printRecommended()}
                    </div>
                    </div>
                    :
                    null
                
                    }
                    
                     {/* <div className="mb-4"><h1>Product Description</h1></div>
                     <div className="subtitletext" style={{fontSize : "17px"}}>  ayayayayasdfasdf</div> */}
                     <div className="mt-5">
                     <Tab productid={this.props.location.search.replace("?pid=", "")} datatabone={this.state.productdetail[0].description} datatabtwo={this.state.productdetail[0].shopdesc}></Tab>
                     </div>
                    </div>
                    </div>
                    <Footer/>
                    </div>
            )
        }else{
            return (
                <div>Product Not Found :(</div>
            )
        }
        
    }

    calculateTotal = () => {
        this.setState((state) => ({ // TAKE state parameter so the totalprice is updated (syncronously)
            totalprice : state.jumlah *  state.price
        }));
    }
    printLength =()=>{
        return (
            <h1>{this.props.usercart.length}</h1>
        )
    }
    render(){
        if(this.state.redirect === true){
            return (
                <Redirect to="/login"></Redirect>
            )
    
        }
     
        return(
            <div>
            <div>
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
        
                    <Fade clear>
                    {this.printProductDetails()}
                    </Fade>
                    {this.state.productdetail.length === 0 ? 
                    <div className="d-flex flex-column row p-t-100 p-l-100">
                    <h1 className="mb-5">{this.state.message}</h1>
                    <Link to="/product?cat=Fashion">
                    <input type="button" className="btn btn-success navbartext p-3 border border-radius" value="Browse Other Products"/>
                    </Link>
                    </div>
                     : null}
        
                    {/* {console.log(JSON.stringify(this.props.usercart))}} */}
       
                    {/* <h1>{this.props.usercart.CARTLEN}</h1> */}
                    {/* SUDAH TAMBAH :) CART DI MOVIE PAKAI JSON */}
           


                </div>
               
            </div>
    
           
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