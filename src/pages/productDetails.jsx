import React from 'react'
import numeral from 'numeral'
import Tab from './../components/tab'
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom'
import Axios from 'axios';
import { connect } from 'react-redux'
import { addItemCart } from './../redux/actions/index'


class productDetails extends React.Component{
    state={
        
        jumlah : 1,
        price : 10000,
        totalprice : 0,
        productdetail : [],
        message : ""
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
       
        Axios.get('http://localhost:1998/products?id='+id)
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

    printProductDetails = () =>{
        if(this.state.productdetail.length === 1){
            return (
                <div>
                <div className="row p-t-100">
                        <div className="col-md-5 border border-secondary">
                            <img src="http://images.thenorthface.com/is/image/TheNorthFace/236x204_CLR/womens-better-than-naked-jacket-AVKL_NN4_hero.png" height="500px"></img>
                        </div>
                        <div className="col-md-7 pl-5">
                            
                            <h1 className="mb-4">{this.state.productdetail[0].name}</h1>
                            <div className="badge badge-pill badge-danger mb-4" style={{fontSize : "20px"}}> {this.state.productdetail[0].category}</div>
                            <h3 className="mb-3">Quantity</h3>
                           
                           
                            <div className="mb-5">
                            <input type="button" className="btn btn-success rounded-circle mr-3" value="+" onClick={() => this.addQty()}/>
                            <input type="text" className="form-control d-inline text-center" style={{width :"100px", fontWeight : "bolder", fontSize : "23px"}} value={this.state.jumlah}  readOnly/>
                            <input type="button" className="btn btn-success rounded-circle ml-3 " value="-" onClick={() => this.minQty()}/>
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
                                <input type="button" value="PROCEED" className="btn btn-dark btn-lg navbartext" style={{width : "350px"}} onClick={()=>this.props.addItemCart(this.state.productdetail[0])} />
                            </div>
                            

                        </div>
                    </div>
                     <div className=" p-5">
                     {/* <div className="mb-4"><h1>Product Description</h1></div>
                     <div className="subtitletext" style={{fontSize : "17px"}}>  ayayayayasdfasdf</div> */}
                     <Tab datatabone={this.state.productdetail[0].desc}></Tab>
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
    render(){
     
        return(
            <div className="mycontainer mb-5">
                <div >
                    {this.printProductDetails()}
                    {this.state.productdetail.length === 0 ? <h1 className="row p-t-100">{this.state.message}</h1> : null}
                    {console.log(this.props.usercart)}
           


                </div>
            </div>
        )
    }
}

const mapStateToProps= (state)=>{
    return{ 
      usercart : state.userdata.CART
    }
}

export default connect(mapStateToProps, {addItemCart})(productDetails);