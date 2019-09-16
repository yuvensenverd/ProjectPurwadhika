import React from 'react'
import Carousel from './../components/carousel'
import Axios from 'axios'
import { URLAPI, PATHDEFAULTPRD, PATHDEFAULTCARTEMPTY } from "../redux/actions/types";
import { connect } from "react-redux";
import { getListCategory } from "./../redux/actions/index"
import numeral from 'numeral'
import { Link } from 'react-router-dom'
import Footer from './../components/footer';
import ReactLoading from 'react-loading';
import queryString from 'query-string'

// ANIMATIONS 
import Fade from 'react-reveal/Fade';

// import { CSSTransition, TransitionGroup } from "react-transition-group";

// Star 
import StarRatings from 'react-star-ratings';



class productPage extends React.Component{
    state = {
        productlist  : [],
        rating : 0,
        bannerimgpath : [],
        currentgenre : '',
        reload : false,
        finishload : false,
        filtertext : '',
        prlengthdisplay : 0,
        inProp : false,
        setInProp : false
      }


    componentDidMount=()=>{
        this.getBannerPath()
        if(this.props.listcategory.length === 0){
            this.props.getListCategory()
        }
        
        var currentgenre = queryString.parse(this.props.location.search)
        if(!currentgenre.cat){
            this.setState({
                currentgenre : 'Products'
            })
            // PRINT ALL 
            this.getProduct()
        }
        else{
            this.setState({
                currentgenre : currentgenre.cat
            })
            this.getProduct(currentgenre.cat)
        }
       //pathname, search, hash, state

  
    }

    getBannerPath = () => { // CAROUSEL
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

    getProduct = (category) =>{
        
        console.log(category)
        Axios.get(URLAPI+'/product/getproduct?cat=' + category + '&pagenumber=all') // get all no limit
        .then((res)=>{
            
            this.setState({
                productlist : res.data,
                reload : false,
                finishload : true
            })
            
            var select_box = document.getElementById("catlist");
            select_box.selectedIndex = 0;
     
       
        })
        .catch((err)=>{
            console.log(err)
        })
    
        }

    filterProduct = (filterby) =>{
        console.log(filterby)
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
        if(filterby === "Rating High"){
            var sorted=  this.state.productlist.sort(function(a,b){
                return b.avgrating - a.avgrating
            })
            console.log(sorted)
            this.setState({
                productlist : sorted
            })
        }
        if(filterby === "Rating Low"){
            var sorted=  this.state.productlist.sort(function(a,b){
                return a.avgrating - b.avgrating
            })
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
        
        for(var i = 0; i<4; i++){
            arr.push(judul[i])
            
        }
        if(judul.length >= 4){
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
                <img src={URLAPI + PATHDEFAULTCARTEMPTY} width="200px" height="200px"/>
                </center>
                </div>
            )
        }


        var output = this.state.productlist
        .filter((val)=> {
            return val.name.toLowerCase().indexOf(this.state.filtertext.toLowerCase()) !== -1

        })
        
        
        .map((val)=>{
            return( 
         
                     
    
            <div className="cardpr d-inline-block mr-3 mb-4" >
                <img 
                   src={val.images ?
                    URLAPI+ val.images.split(',')[0]
                    :
                    URLAPI + PATHDEFAULTPRD
                    } 
                  alt="image" width="100%" height="200px"
                  />
                <div className="cardprtext p-3 mb-2" style={{height : "80px"}}>{this.renderName(val.name)}</div>
                <div className="pricepr mt-1 mb-3">
                {/* {"Rp. " + numeral(val.name).format(0,0)} */}
                {"Rp. " + numeral(val.price).format(0,0)}
                </div>
                <div className="d-flex flex-row justify-content-center mt-2">

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
                <Link to={`/profileshop?shopid=${val.shopid}`}>
                    <h5 className="mb-3 badge badge-dark">{val.shopname}</h5>
                </Link>

                    
                <Link to={"/productdetails?pid=" + val.id}> 
                    <input type='text' value="View Product" className="form-control btn btn-dark navbartext pt-4 pb-4"/>
                </Link>

            
            </div>
       
            
            
    
    
    
            )
        })
        if(output.length !== this.state.prlengthdisplay){
            this.setState({
                prlengthdisplay : output.length
            })
        }
        
        return output
        }

    onClickChange = (genre) =>{
        this.refs.filtertextref.value = '' // KOSONG TExt filter
        this.setState({
            currentgenre : genre,
            reload : true,
            filtertext : ''
        })
        this.getProduct(genre)
    }
    
    
    printCategory = () =>{
        var jsx = this.props.listcategory.map((val)=>{
            return (
                <Fade>
                <Link to={"/product?cat=" + val.name} style={{ textDecoration: 'none' }}>
                <div>
                    <div className="d-flex flex-column align-items-center justify-content-center imagecat mb-3" onClick={()=>this.onClickChange(val.name)}>
                        <img src={URLAPI + val.image} alt="logo"  height="50px" />
                        {/* <input type="button" className="btn navbartext btn-secondary form-control" value={val.name}  ></input> */}
                        <div class="content text-center ">
                            <h5>{val.name}</h5>
                        
                        </div>


                    </div>
                </div>
                </Link>
                </Fade>
               
            )
        })
        return jsx
    }


    render(){
        if(this.state.productlist.length === 0 && this.state.finishload === false){
            return(
                <div className="p-t-100 d-flex flex-column align-items-center" >
                    <h1 className="mb-5">Loading... Please Wait</h1>
                    <ReactLoading type="spin" color="#afb9c9"  />
                </div>
            )
        }
 
        return(

            <div className="p-t-58">
                {this.state.bannerimgpath.length !== 0 
                    ?
                    <Carousel slideheight={'330px'} items={this.state.bannerimgpath[0].images}/> 
                    :
                    null //loading
                    }
                <div className="mycontainer mt-5">

                    <div class="row">

                        <div class="col-md-3 p-t-25" >
                            <div className="cardprtext mb-4" style={{fontSize : "25px"}}>  
                                Select Category
                            </div>
                            <div>
                                <div className="d-flex flex-column align-items-center justify-content-center mb-4" style={{backgroundColor : "#BDC1C9"}}>
                                    {/* <img src="xd" alt="logo" height ="50%"></img> */}
                                   {/* <h1>a</h1> */}
                                </div>
                                {this.printCategory()}
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div className="row">
                                <div className="col-md-8 d-flex flex-column ">
                                    <h1>{this.state.productlist.length === 0 ? null : this.state.currentgenre}</h1>
                            
                                    <div className="mb-3">{this.state.prlengthdisplay === 0 ? null : this.state.prlengthdisplay + "  Products Found"}</div>

                                   
                                </div>
                                <div className="col-md-4">
                                    <select  id = "catlist" ref="inputgenre" className="form-control mt-2 mb-2" placeholder="Filter By" onChange={()=>this.filterProduct(this.refs.inputgenre.value)}>
                                        <option value="No Filter" >No Sort</option>
                                        <option value="price low">Price Lowest to Highest</option>
                                        <option value="price high">Price Highest to Lowest</option>
                                        <option value="name a">A to Z</option>
                                        <option value="name z">Z to A</option>
                                        <option value="Rating High">Highest Rating</option>
                                        <option value="Rating Low">Lowest Rating</option>
                                        
                                    </select>
                                </div>
                            </div>
                            <div className="d-flex flex-row ">
                                <input type="text" 
                                ref="filtertextref"
                                
                                className="form-control text-center"
                                placeholder="Search Product Name..." 
                              
                                style={{ alignSelf: "center", borderRadius : "3px"}}
                                />
                                <input type="button"
                                 className="btn" value="SEARCH" 
                                 style={{height : "40px", alignSelf : "center", width : "200px", backgroundColor : "black", fontWeight : "bolder", color : "white"}} 
                                 onClick={()=>this.setState({ filtertext : this.refs.filtertextref.value.replace(/^\s+|\s+$/g, '')})}
                                 />
                            </div>

                            <div className="pl-2 pr-2 pt-3">
                                {/* <StyleRoot>
                                    <div style={styles.fadeIn}>
                                         {this.renderProduct()}
                                    </div>
                                </StyleRoot> */}
                                <Fade>
                                    <div>
                                     {this.renderProduct()}
                                    </div>
                                </Fade>
                              
                         
                               
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