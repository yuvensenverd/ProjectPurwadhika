import React from 'react'
import Carousel from './../components/carousel'
import Axios from 'axios'
import { URLAPI } from "../redux/actions/types";
import { connect } from "react-redux";
import { getListCategory } from "./../redux/actions/index"

// Star 
// import StarRatingComponent from 'react-star-rating-component';
import StarRatings from 'react-star-ratings';



class productPage extends React.Component{
    state = {
        productlist  : [],
        rating : 0,
        genre : ["Fashion", "Electronics", "Sports", "Book", "Snacks", "Pet Accessories", "Gaming"]
    
      }


    componentDidMount=()=>{
        if(this.props.listcategory.length === 0){
            this.props.getListCategory()
        }
        
        var currentgenre = this.props.location.search.replace("?cat=", "")
        if(!currentgenre){
            // PRINT ALL 
            console.log("Nda ada query, Select ALL")
        }
        console.log(this.props.location) //pathname, search, hash, state
     

        





        
        // Axios.get('http://localhost:2000/CO')
        // .then((res)=>{
            
        //     this.setState({
        //     productlist : res.data
    
        //     })
        //     console.log(this.state.productlist)
       
        // })
        // .catch((err)=>{
        //     console.log(err)
        // })
    
        }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
        }
    
    renderName = (text) => {
        var judul = text.split(" ")
        for(var i = 0; i<5; i++){
            judul.push(text[i])
        }
        if(judul.length > 5){
            judul.push("...")
        }
        return judul.join(" ")
    }
    
    renderProduct = () => {


        var output = this.state.productlist.map((val)=>{
            return( 
    
            <div className="cardpr d-inline-block mr-3 mb-4" >
                <img  src={val.productimageurl} alt={val.productname} width="100%" height="100%"/>
                <div className="cardprtext p-2 mb-2" style={{height : "67px"}}>{this.renderName(val.productname)}</div>
                <div className="pricepr mt-1 mb-3">Rp. 50.000,00</div>
                {/* <StarRatingComponent 
                   
                    name="rate1" // INGAT KASIH ID BERBEDA 
                    starCount={5}
                    value={this.state.rating}
                    onStarClick={()=> this.onStarClick()}
                    
                /> */}
                 <StarRatings
                    rating={this.state.rating}
                    starRatedColor="orange"
                    // changeRating={this.changeRating}
                    numberOfStars={5}
                    name='rating'
                    />
                <p className="mt-3"><button><a href={val.producturl} className="navbartext">Add to Cart</a></button></p>

            
            </div>
    
    
    
            )
        })
        return output
        }
    
    
    printCategory = () =>{
        var jsx = this.props.listcategory.map((val)=>{
            return (
                <div className="d-flex flex-column align-items-center justify-content-center mb-4" style={{backgroundColor : "#BDC1C9"}}>
                    <img src="xd" alt="logo" height ="50%"></img>
                    <input type="button" className="btn navbartext btn-secondary form-control" value={val.name} ></input>


                </div>
               
            )
        })
        return jsx
    }


    render(){

        return(

        


            <div >
                <Carousel></Carousel>
                <div className="mycontainer mt-5">

                    <div class="row">

                        <div class="col-md-3 p-t-25" >
                            <div className="cardprtext mb-4" style={{fontSize : "25px"}}>  
                                Select Category
                            </div>
                            <div>
                                {this.printCategory()}
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div className="row">
                                <div className="col-md-8">
                                    <h1>Product Genre</h1>
                                </div>
                                <div className="col-md-4">
                                    <select required id = "myList" ref="inputgenre" className="form-control mt-2" placeholder="Filter By">
                                        <option value="" disabled selected hidden>Filter By</option>
                                        
                                    </select>
                                </div>
                            </div>

                            <div className="pl-2 pr-2 pt-3">
                                {this.renderProduct()}
                            </div>
                            
                        </div>
                        
                    </div>

                </div>

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