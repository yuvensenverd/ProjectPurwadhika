import React from 'react'
import Carousel from './../components/carousel'
import Axios from 'axios'
import Responsive from './../components/responsiveslider'
import Centered from './../components/centerslide'
import numeral from 'numeral'
import Footer from './../components/footer';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Redirect } from 'react-router'

// ROUTE 

import { Link } from 'react-router-dom'

// REDUX TEST

import { connect } from 'react-redux'
import { loginUser } from './../redux/actions/index'

// Star 
// import StarRatingComponent from 'react-star-rating-component';
import StarRatings from 'react-star-ratings';
import { URLAPI, PATHDEFAULTPRD } from '../redux/actions/types';
import queryString from 'query-string'

class Homepage extends React.Component{
    state = {
        productlist  : [],
        rating : 1,
        bannerimgpath : [],
        productcount : 0,
        currentPage : null,
        totalPage : 0,
        finishload : false,
        finishloadproduct : false,
        filtertext : '',
        

      }
   
    componentDidMount=()=>{

        const values = queryString.parse(this.props.location.search)
        console.log(values)
        if(!values.pagenumber){
            values.pagenumber=1
        }
        this.setState({
            currentPage : parseInt(values.pagenumber)
        })
        

        this.getProduct()
        this.getBannerPath()
        this.getNumberItem()

    }

    componentDidUpdate(){
        this.getProduct()
    }

    getProduct = () =>{
        if(this.state.finishloadproduct === false){

            const values = queryString.parse(this.props.location.search)
            console.log(values)
            if(!values.pagenumber){
                values.pagenumber=1
            }
            Axios.get(URLAPI+`/product/getproduct?pagenumber=${values.pagenumber}`)
            .then((res)=>{
                console.log(res.data)
                this.setState({
                    productlist : res.data,
                    finishloadproduct : true
        
                })
             
                console.log(this.state.productlist)
           
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    
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

    getNumberItem = () =>{
        Axios.get(URLAPI + `/product/productcount`)
        .then((res)=>{
            console.log("ini count ")
            console.log(res.data)
            this.setState({
                productcount : res.data[0].count
            })

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

    onButtonFilterClick = () =>{
        console.log(this.state.filtertext)

    }
    

    printPaginationButton = () =>{
        var jsx = []
        if(this.state.productcount !== 0){
            var x = this.state.productcount
            var page = 1
            while(x > 0){
                jsx.push(
                    <PaginationItem >
                    <PaginationLink href={`?pagenumber=${page}`} className="text-dark">
                    {page}
                    </PaginationLink>
                    </PaginationItem>
                )
                page ++ 

                x = x-15 // 15 per page
                // if(x === 0){
                //     console.log("masuk")
                //     break;
                // }
            }
            if(this.state.totalPage === 0){

                this.setState({
                    totalPage : page-1,
                    finishload : true
                })
            }
            
            return jsx
        }
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
        // const { totalPage, currentPage } = this.state;
        // if(this.state.finishload === true){

        //     if(currentPage > totalPage){
        //         return(
        //             <Redirect to={`?pagenumber=${totalPage}`}/>
        //         )
        //     }
        //     else if (currentPage < 0){
        //         return(
        //             <Redirect to={`/`}/>
        //         )
        //     }
        // }
        return(
            <div className="col p-0">
                <div className="row-md-3 mb-5 p-t-58">
                    {this.state.bannerimgpath.length !== 0 
                    ?
                    <Carousel slideheight={'330px'} items={this.state.bannerimgpath[0].images}/> 
                    :
                    null //loading
                    }
                    
 
                </div>
                

               
           
                <div className="p-0" style={{height : "90px"}} >
             
                    <Responsive></Responsive>
                  

            


                </div>
                <div className="d-flex flex-row justify-content-center p-t-100">
                        
                </div>

                {/* BANNER */}
                <div className="container mt-5 mb-5">
                    <div className="mt-5 mb-4">
                        <input type="button" style={{height : "100px", fontWeight: "bolder", fontSize : "18px", backgroundColor : "#c02c3a", color : "white", fontSize : "35px"}}className="btn btn-block" value="ON SALE"  />
                    </div>
                </div>
                
                <div className="d-flex flex-row justify-content-center p-5" >
                    <input type="text" 
                    ref="filtertextref"
                    value={this.state.filtertext}
                    className="form-control form-control-lg text-center"
                     placeholder="Search Items.." 
                     style={{ alignSelf: "center", borderRadius : "3px"}}
                     onChange={()=>this.setState({ filtertext : this.refs.filtertextref.value})}
                    ></input>
                    <a href={`/search?keyword=${this.state.filtertext}`}>
                    <input type="button" className="btn" value="FILTER" style={{height : "50px", alignSelf : "center", width : "200px", backgroundColor : "black", fontWeight : "bolder", color : "white"}} onClick={()=>this.onButtonFilterClick()}/>
                    </a>
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
                <div className="d-flex flex-row justify-content-center">
                <Pagination aria-label="Page navigation example" size="lg" >
                <PaginationItem >
                    <PaginationLink first href={`?pagenumber=1`} className="text-dark"/>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink previous
                     href={this.state.currentPage ===1 ?
                        `?pagenumber=${this.state.currentPage}`
                        :
                        `?pagenumber=${this.state.currentPage-1}`
                    } 
                     className="text-dark" />
                </PaginationItem>
                
                {this.printPaginationButton()}
                    
                <PaginationItem>
                    <PaginationLink next 
                    href={this.state.currentPage === this.state.totalPage ?
                        `?pagenumber=${this.state.currentPage}`
                        :
                        `?pagenumber=${this.state.currentPage+1}`
                     } 
                     className="text-dark" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink last href={`?pagenumber=${this.state.totalPage}`}  className="text-dark"/>
                </PaginationItem>
                </Pagination>
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