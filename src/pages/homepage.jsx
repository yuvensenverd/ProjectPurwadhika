import React from 'react'
import Carousel from './../components/carousel'
import Axios from 'axios'
import Responsive from './../components/responsiveslider'
import Centered from './../components/centerslide'
import numeral from 'numeral'

// ROUTE 

import { Link } from 'react-router-dom'

// REDUX TEST

import { connect } from 'react-redux'
import { loginUser } from './../redux/actions/index'

// Star 
// import StarRatingComponent from 'react-star-rating-component';
import StarRatings from 'react-star-ratings';

class Homepage extends React.Component{
    state = {
        productlist  : [],
        rating : 1

      }
   
    componentDidMount=()=>{
        // Axios.get('http://localhost:1998/getproduct')
        // .then((res)=>{
        //     console.log("Masuk")
        //     this.setState({
        //     productlist : res.data

        //     })
        //     console.log(this.state.productlist)
        
        // })
        // .catch((err)=>{
        //     console.log("Error")
        //     console.log(err)
        // })
    
        

        this.getProduct()

    }

    getProduct = () =>{
        Axios.get('http://localhost:1998/products')
        .then((res)=>{
            console.log(res.data)
            this.setState({
                productlist : res.data
    
            })
         
            console.log(this.state.productlist)
       
        })
        .catch((err)=>{
            console.log(err)
        })
    
        }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
      }

    changeRating( newRating, name ) {
    this.setState({
        rating: newRating
    });
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
  

    var output = this.state.productlist.map((val, index )=>{
        // console.log(index)
        // console.log(arr)
        return( 

        <div className="card d-inline-block m-r-21 m-b-25 m-l-21" >
            <img  className="mb-3" src="" alt="image" width="100%" height="175px"/>
            <div className="cardprtext pl-4 pr-4 mb-3" style={{height : "50px"}}>{this.renderName(val.name)}</div>
            <p className="price">
            {"Rp. " + numeral(val.price).format(0,0)}
                </p>
            <p>Some text about the Product.</p>
            {/* <StarRatingComponent 
                   
                    name="rate1"  // RATING INDEX / PRODUCT ID
                    starCount={5}
                    value={2} // PRODUCT RATING
                    // onStarClick={()=> this.onStarClick()}
                    
                /> */}
            <StarRatings
                rating={this.state.rating} // GAK PAKE STATE NANTI
                starRatedColor="orange"
                // changeRating={this.changeRating.bind(this)}
                numberOfStars={5}
                name='rating' // BERBEDA NANTI
                />
            <p className="mt-4">
                
                <p className="">
                    <a href="/productdetails">
                    <button><p  className="navbartext">Add to Cart</p></button>
                    </a>
                    </p>
                
            </p>
      
        </div>



        )
    })
   
    return output
    }



    render(){
        const { rating } = this.state;
        return(
            <div className="col p-0">
                <div className="row-md-3 mb-5">
                    <Carousel ></Carousel>
                    {/* <Centered></Centered> */}
                </div>

                {/* FILTER TEXT BOX */}
                

               
                {/* GENRE LIST PRINT */}
                <div className="p-0" style={{height : "90px"}} >
             
                    <Responsive></Responsive>
                  

                    {/* <div className="item p-0">
                        <img  className="p-0" src="https://www.electronicrecyclingassociation.ca/wp-content/uploads/2018/01/Electronics-Shop-4.png" height="125px" width="100%"/>
                        <span className="caption"> Halo</span>
                    </div>
                    <div className="item p-0">
                        <img  className="p-0" src="https://www.electronicrecyclingassociation.ca/wp-content/uploads/2018/01/Electronics-Shop-4.png" height="125px" width="100%"/>
                        <span className="caption"> Halo</span>
                    </div>
                    <div className="item p-0">
                        <img  className="p-0" src="https://www.electronicrecyclingassociation.ca/wp-content/uploads/2018/01/Electronics-Shop-4.png" height="125px" width="100%"/>
                        <span className="caption"> Halo</span>
                    </div>
                    <div className="item p-0">
                        <img  className="p-0" src="https://www.electronicrecyclingassociation.ca/wp-content/uploads/2018/01/Electronics-Shop-4.png" height="125px" width="100%"/>
                        <span className="caption"> Halo</span>
                    </div>
                    <div className="item p-0">
                        <img  className="p-0" src="https://www.electronicrecyclingassociation.ca/wp-content/uploads/2018/01/Electronics-Shop-4.png" height="125px" width="100%"/>
                        <span className="caption"> Halo</span>
                    </div>
                    <div className="item p-0">
                        <img  className="p-0" src="https://www.electronicrecyclingassociation.ca/wp-content/uploads/2018/01/Electronics-Shop-4.png" height="125px" width="100%"/>
                        <span className="caption"> Halo</span>
                    </div> */}
                   


                </div>

                {/* BANNER */}
                <div className="container mt-5 mb-5">
                    <div className="mt-5 mb-4">
                        <input type="button" style={{height : "100px", fontWeight: "bolder", fontSize : "18px", backgroundColor : "#c02c3a", color : "white", fontSize : "35px"}}className="btn btn-block" value="ON SALE"  />
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-center p-5" >
                    <input type="text" className="form-control form-control-lg text-center" placeholder="Search Items.." style={{ alignSelf: "center", borderRadius : "3px"}}></input>
                    <input type="button" className="btn" value="FILTER" style={{height : "50px", alignSelf : "center", width : "200px", backgroundColor : "black", fontWeight : "bolder", color : "white"}}></input>
                </div>
                <div className="row">
                    <div className="col-md-1">

                    </div>
                    <div className="col-md-10 p-0">
                        {/* <div className="d-flex flex-row justify-content-center"> */}
                        <center>
                        {this.renderProduct()}
                        </center>
                        {/* </div> */}
                 
                    </div>
                    <div className="col-md-1">
                    
                      
                    </div>
                </div>
     
                
              
            </div>
        )
    }
}

const mapStateToProps= (state)=>{
    return{ 
        testredux : state.pikachu,
        keren : state.text
    }
}

export default connect(mapStateToProps,{ loginUser })(Homepage);