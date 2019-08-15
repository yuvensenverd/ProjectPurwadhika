import React from 'react'
import Carousel from './../components/carousel'
import Axios from 'axios'
import { URLAPI } from "../redux/actions/types";
import { connect } from "react-redux";
import { getListCategory } from "./../redux/actions/index"
import numeral from 'numeral'
import { Link } from 'react-router-dom'
import Footer from './../components/footer';

// Star 
// import StarRatingComponent from 'react-star-rating-component';
import StarRatings from 'react-star-ratings';



class productPage extends React.Component{
    state = {
        productlist  : [],
        rating : 0
    
    
      }


    componentDidMount=()=>{
        if(this.props.listcategory.length === 0){
            this.props.getListCategory()
        }
        
        var currentgenre = this.props.location.search.replace("?cat=", "")
        if(!currentgenre){
            // PRINT ALL 
            console.log(this.props.location)
            console.log("Nda ada query, Select ALL")
            this.getProduct()
            console.log(this.state.productlist)
          
        }
        else{
        
            this.getProduct(currentgenre)
        }
       //pathname, search, hash, state
     

       

        
        

  
    }
    getProduct = (category = "") =>{
        Axios.get(URLAPI+'/product/getproduct?cat=' + category)
        .then((res)=>{
            
            this.setState({
            productlist : res.data
    
            })
            var select_box = document.getElementById("catlist");
            select_box.selectedIndex = 0;
            console.log(this.state.productlist)
       
        })
        .catch((err)=>{
            console.log(err)
        })
    
        }

    filterProduct = (filterby) =>{
        console.log(filterby)
        if(filterby === "No Filter"){
            this.getProduct(this.props.location.search.replace("?cat=", ""))
        }
        if(filterby === "price low"){
            var sorted=  this.state.productlist.sort(function(a,b){
                return a.price - b.price
            })
            console.log(sorted)
            this.setState({
                productlist : sorted
            })
        }
        if(filterby === "price high"){
            var sorted=  this.state.productlist.sort(function(a,b){
                return b.price - a.price
            })
            console.log(sorted)
            this.setState({
                productlist : sorted
            })
        }
        if(filterby === "name a"){
            var sorted = this.state.productlist.sort((a, b) => a.name.localeCompare(b.name))
            console.log(sorted)
            this.setState({
                productlist : sorted
            })
        }
        if(filterby === "name z"){
            var sorted = this.state.productlist.sort((a, b) => b.name.localeCompare(a.name))
            console.log(sorted)
            this.setState({
                productlist : sorted
            })
        }
        

  
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
        }
    
    renderName = (text) => {
        var judul = text.split(" ")
        var arr = []
        
        for(var i = 0; i<5; i++){
            arr.push(judul[i])
            
        }
        if(judul.length > 5){
            arr.push("...")
        }
        return arr.join(" ")
    }
    
    renderProduct = () => {

        console.log(this.state.productlist)
        if(this.state.productlist.length === 0){
            return (
                <div className="pt-5">
                <center>
                <h1>Product Not Found</h1>
                </center>
                </div>
            )
        }


        var output = this.state.productlist.map((val)=>{
            return( 
    
            <div className="cardpr d-inline-block mr-3 mb-4" >
                <img  src={URLAPI+ val.images.split(',')[0]} alt="image" width="100%" height="200px"/>
                <div className="cardprtext p-3 mb-2" style={{height : "80px"}}>{this.renderName(val.name)}</div>
                <div className="pricepr mt-1 mb-3">
                {/* {"Rp. " + numeral(val.name).format(0,0)} */}
                {"Rp. " + numeral(val.price).format(0,0)}
                </div>
                {/* <StarRatingComponent 
                   
                    name="rate1" // INGAT KASIH ID BERBEDA 
                    starCount={5}
                    value={this.state.rating}
                    onStarClick={()=> this.onStarClick()}
                    
                /> */}
                 <StarRatings
                    rating={val.rating}
                    starRatedColor="orange"
                    // changeRating={this.changeRating}
                    numberOfStars={5}
                    name='rating'
                    />
                
                <p className="mt-3">
                    <button>
                        <Link to={"/productdetails?pid=" + val.id}>
                        <p className="navbartext">Add to Cart</p>
                        </Link>
                    </button>
                </p>

            
            </div>
    
    
    
            )
        })
        return output
        }
    
    
    printCategory = () =>{
        var jsx = this.props.listcategory.map((val)=>{
            return (
                <Link to={"/product?cat=" + val.name}>
                <div className="d-flex flex-column align-items-center justify-content-center mb-4 " style={{backgroundColor : "#BDC1C9"}}>
                    <img src="xd" alt="logo" height ="50%"></img>
                    <input type="button" className="btn navbartext btn-secondary form-control" value={val.name} onClick={() => this.getProduct(val.name)} ></input>
                


                </div>
                </Link>
               
            )
        })
        return jsx
    }


    render(){

        return(

            <div >
                <Carousel slideheight={'330px'}/>
                <div className="mycontainer mt-5">

                    <div class="row">

                        <div class="col-md-3 p-t-25" >
                            <div className="cardprtext mb-4" style={{fontSize : "25px"}}>  
                                Select Category
                            </div>
                            <div>
                                <div className="d-flex flex-column align-items-center justify-content-center mb-4" style={{backgroundColor : "#BDC1C9"}}>
                                    <img src="xd" alt="logo" height ="50%"></img>
                                    <input type="button" className="btn navbartext btn-secondary form-control" value="All Product" onClick={() => this.getProduct()} ></input>
                                </div>
                                {this.printCategory()}
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div className="row">
                                <div className="col-md-8">
                                    <h1>Product Genre</h1>
                                    <div>{this.state.productlist.length === 0 ? null : this.state.productlist.length + "  Products Found"}</div>
                                </div>
                                <div className="col-md-4">
                                    <select  id = "catlist" ref="inputgenre" className="form-control mt-2" placeholder="Filter By" onChange={()=>this.filterProduct(this.refs.inputgenre.value)}>
                                        <option value="No Filter" >No Sort</option>
                                        <option value="price low">Price Lowest to Highest</option>
                                        <option value="price high">Price Highest to Lowest</option>
                                        <option value="name a">A to Z</option>
                                        <option value="name z">Z to A</option>
                                        <option value="Rating">Rating</option>
                                        
                                    </select>
                                </div>
                            </div>

                            <div className="pl-2 pr-2 pt-3">
                                {this.renderProduct()}
                            </div>
                            
                        </div>
                        
                    </div>

                </div>
                <Footer/>

            </div>
        )
        
    }

}

const mapStateToProps = (state) =>{
    return {
        listcategory : state.categorylist
  
    }
  }



export default connect(mapStateToProps, {getListCategory})(productPage);