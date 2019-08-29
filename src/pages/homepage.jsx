import React from 'react'
import Carousel from './../components/carousel'
import Axios from 'axios'
import Responsive from './../components/responsiveslider'
import Centered from './../components/centerslide'
import numeral from 'numeral'
import Footer from './../components/footer';

// ROUTE 

import { Link } from 'react-router-dom'

// REDUX TEST

import { connect } from 'react-redux'
import { loginUser } from './../redux/actions/index'

// Star 
// import StarRatingComponent from 'react-star-rating-component';
import StarRatings from 'react-star-ratings';
import { URLAPI, PATHDEFAULTPRD } from '../redux/actions/types';

class Homepage extends React.Component{
    state = {
        productlist  : [],
        rating : 1,
        bannerimgpath : []

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
        this.getBannerPath()

    }

    getProduct = () =>{
        Axios.get(URLAPI+'/product/getproduct')
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

    getBannerPath = () => {
        Axios.get(URLAPI + '/banner/getpathbanner')
        .then((res)=>{
            console.log(res.data)
            this.setState({
                bannerimgpath : res.data
            })
            console.log(this.state.bannerimgpath)
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

        <div className="card d-inline-block m-r-21 m-b-25 " >
            <img  className="mb-3" 
            src={val.images ?
                URLAPI+ val.images.split(',')[0]
                :
                URLAPI + PATHDEFAULTPRD
                } 
            alt="image" width="100%" height="175px"/>
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
           <div className="d-flex flex-row justify-content-center">

                <StarRatings
                rating={val.avgrating ? val.avgrating : 0}
                starRatedColor="orange"
                // changeRating={this.changeRating}
                numberOfStars={5}
                starDimension="16px"
                name='rating'
                />
             <p className="pl-2" style={{fontSize : '16px'}}>{`(${val.ReviewCount})`}</p>
            </div>

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



    render(){
        const { rating } = this.state;
        return(
            <div className="col p-0">
                <div className="row-md-3 mb-5 p-t-58">
                    {this.state.bannerimgpath.length !== 0 
                    ?
                    <Carousel slideheight={'330px'} items={this.state.bannerimgpath[0].images}/> 
                    :
                    null //loading
                    }
                    
                    {/* SEMENTARA */}
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
                <Footer/>
                
              
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