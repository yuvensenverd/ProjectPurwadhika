import React from 'react'
import queryString from 'query-string'
import Axios from 'axios'
import { URLAPI, PATHDEFAULTPRD } from '../redux/actions/types'
import numeral from 'numeral'
import Tab from './../components/tab'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faStoreAlt, faLuggageCart, faHourglassHalf, faQuoteLeft, faQuoteRight, faProjectDiagram } from '@fortawesome/free-solid-svg-icons'

class shopProfile extends React.Component{
    state = {
        shopinfo : [],
        data : [],
        catlist : [],
        filtertext : '',
        rating : []
    }

    componentDidMount(){
       
        const values = queryString.parse(this.props.location.search)
        if(values.shopid){

            const token = localStorage.getItem('token')
            const headers = {
                headers: {
                    'Authorization' : `${token}`
                }
            }
            //-----------------------------------------------------------------
            Axios.get(URLAPI + `/shop/getshopinfo/${values.shopid}`, headers)
            .then((res)=>{
                this.setState({
                    shopinfo : res.data
                })
                console.log(this.state)
            })
            .catch((err)=>{
                console.log(err)
            })

            Axios.get(URLAPI + `/shop/getproductshop/${values.shopid}`, headers)
            .then((res)=>{
                this.setState({
                    data : res.data
                })
                console.log(this.state)
            })
            .catch((err)=>{
                console.log(err)
            })

            Axios.get(URLAPI + `/shop/getshoprating?shopid=${values.shopid}`, headers)
            .then((res)=>{
                this.setState({
                    rating : res.data
                })
                console.log(this.state)
            })
            .catch((err)=>{
                console.log(err)
            })

            
        }
    }

    

    renderProduct = () =>{
        if(this.state.data.length !== 0){
            // LIST CATEGORY 
            var catlist = []
            this.state.data.forEach(x => {
                if(!catlist.includes(x.cat)){
                    catlist.push(x.cat)
                }
            });
      
            var jsx = this.state.data
            .filter((val)=>{
                return val.cat.includes(this.state.filtertext)
            })
         
            
            
            .map((product)=>{
               
                return(
                    <div className="cardpr d-inline-block mr-3 mb-4" >
                <img 
                   src={product.images ?
                    URLAPI+ product.images.split(',')[0]
                    :
                    URLAPI + PATHDEFAULTPRD
                    } 
                  alt="image" width="100%" height="200px"
                  />
                <div className="cardprtext p-3 mb-2" style={{height : "80px"}}>{product.name}</div>
                <div className="pricepr mt-1 mb-3">
                {/* {"Rp. " + numeral(product.name).format(0,0)} */}
                {"Rp. " + numeral(product.price).format(0,0)}
                </div>
                <div className="d-flex flex-row justify-content-center mt-2">

                    <StarRatings
                        rating={product.avgrating ? product.avgrating : 0}
                        starRatedColor="orange"
                        // changeRating={this.changeRating}
                        numberOfStars={5}
                        starDimension="16px"
                        name='rating'
                    />
                    <p className="pl-2" style={{fontSize : '16px'}}>{`(${product.ReviewCount})`}</p>
                </div>
                    
                <Link to={"/productdetails?pid=" + product.id}> 
                    <input type='text' value="View Product" className="form-control btn btn-dark navbartext pt-4 pb-4"/>
                </Link>

            
            </div>
                )
           
            }

            
           

        
            
            )
            if(this.state.catlist.length === 0){
                this.setState({
                    catlist
                })
            }
        
            return jsx
        }
    }

    renderShop = () =>{
        if(this.state.shopinfo.length !== 0 && this.state.rating.length !== 0){
            return(
                <div className="storecard p-3 mb-5 mr-3">
                    <div className="row">
                        <div className="col-md-1 subtitletext  p-3">
                         
                        </div>
                        <div className="col-md-1 p-0" >
                            <img src={URLAPI + this.state.shopinfo[0].shopimage} alt="userprofile" className="storeimage"/>
                        </div>
                        <div className="col-md-3 subtitletext text-center" style={{paddingTop : "28px"}}>
                            <div className="mb-2">{this.state.shopinfo[0].name}</div>
                            <div style={{fontSize : "14px"}}>
                                <FontAwesomeIcon size="1x"  icon={faQuoteLeft} />
                                &nbsp;&nbsp; {this.state.shopinfo[0].description} &nbsp;&nbsp;
                                <FontAwesomeIcon size="1x"  icon={faQuoteRight}/>
                            </div>
                        </div>
                        <div className="col-md-4 subtitletext  p-4 text-center" style={{fontSize : '15px'}}>
                            <div className="mb-4">Products : {this.state.data.length}</div>
                            <div>Shop Rating : 
                            {this.state.rating[0].shopAvgRating ? this.state.rating[0].shopAvgRating + `( based on ${this.state.rating[0].shopReviewCount} Reviews)` : 'Not Reviewed Yet'}
                            </div>
                        </div>
                       
                      
                        <div className="col-md-3 subtitletext  text-center p-5">
                                <StarRatings
                                rating={this.state.rating[0].shopAvgRating ? this.state.rating[0].shopAvgRating : 0}
                                starRatedColor="orange"
                                // changeRating={this.changeRating}
                                numberOfStars={5}
                                starDimension="35px"
                                name='rating'
                            />
                        </div>
                      
                    </div>
                </div>
            )
        }
    }

    renderGenreProduct  = () =>{
        if(this.state.catlist.length !== 0){
            var jsx = this.state.catlist.map((cat)=>{
                return(


                <input type="button" className="btn btn-secondary navbartext p-3 rounded-circle" value={cat} onClick={()=>this.filterProduct(cat)}/>
       
                )
            })
            return jsx
        }
      
    }

    filterProduct = (cat = '') =>{
        console.log('filter')
        console.log(cat)
        this.setState({
            filtertext : cat
        })
    }


    render(){
        return(
            <div>
                <div className="p-t-57  pl-3 pr-3">
                   {this.renderShop()}
                </div>
                <div className="row pl-3 pr-3 mt-4">
                    <div className="col-md-1">

                    </div>
                </div>
                <div className="row d-flex flex-row justify-content-center mb-4 ">
                    <div className="badge badge-danger mb-4 subtitletext p-3" style={{fontSize : "30px", width : '500px',  backgroundColor : "#c02c3a"}}>Product Available</div>
                </div>
                <div className="row pl-5 mb-5 d-flex justify-content-between pr-5">
                    
                

                    <input type="button" className="btn btn-secondary navbartext rounded-circle p-3 " value="All Products" onClick={()=>this.filterProduct()} />
                    
                
                    {this.renderGenreProduct()}
                  
                    
                </div>
                <div className="row pl-5 pr-5 ">
                    <div>
                        {this.renderProduct()}
                    </div>
                        
                    
                </div>
            </div>
        )
    }
}

export default shopProfile