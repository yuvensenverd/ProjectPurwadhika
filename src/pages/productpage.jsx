import React from 'react'
import Carousel from './../components/carousel'
import Axios from 'axios'

// Star 
// import StarRatingComponent from 'react-star-rating-component';
import StarRatings from 'react-star-ratings';

class productPage extends React.Component{
    state = {
        productlist  : [],
        rating : 0
    
      }


    componentDidMount=()=>{
        
        Axios.get('http://localhost:2000/CO')
        .then((res)=>{
            
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
    
    
    renderProduct = () => {


        var output = this.state.productlist.map((val)=>{
            return( 
    
            <div className="cardpr d-inline-block mr-3 mb-4" >
                <img  src={val.productimageurl} alt={val.productname} width="100%" height="100%"/>
                <div className="cardprtext" style={{height : "67px"}}>{val.productname}</div>
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
        


    render(){

        return(

        


            <div >
                <Carousel></Carousel>
                <div className="mycontainer mt-5">

                    <div class="row">

                        <div class="col-md-3 p-t-25" >
                            Another Navbar / User Cart 
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



export default productPage;