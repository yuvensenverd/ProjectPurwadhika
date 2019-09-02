import React from 'react'
import Carousel from './../components/carousel'
import Axios from 'axios'
import Responsive from './../components/responsiveslider'
import Centered from './../components/centerslide'
import numeral from 'numeral'
import Footer from './../components/footer';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import {onChangeFilter} from '../redux/actions/textactions'
import { Redirect } from 'react-router'
import ReactLoading from 'react-loading';
// ROUTE 

import { Link } from 'react-router-dom'

// REDUX TEST

import { connect } from 'react-redux'
import { loginUser } from './../redux/actions/index'

// Star 
// import StarRatingComponent from 'react-star-rating-component';
import StarRatings from 'react-star-ratings';
import { URLAPI, PATHDEFAULTPRD, PATHDEFAULTCARTEMPTY } from '../redux/actions/types';
import queryString from 'query-string'

class searchProduct extends React.Component{
    state = {
        productlist  : [],
        rating : 1,
        bannerimgpath : [],
        productcount : 0,
        currentPage : null,
        totalPage : 0,
        finishload : false,
        finishloadproduct : false,
        pageperitem : 15
        
     
        

      }
   
    componentDidMount=()=>{

        console.log(this.props.location)

        const values = queryString.parse(this.props.location.search)
        console.log(values)
        if(!values.pagenumber){
            values.pagenumber=1
        }
        this.setState({
            currentPage : parseInt(values.pagenumber)
        })
        

        this.getProduct()
   
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
            if(!values.keyword){
                values.keyword = ''
            }
            Axios.get(URLAPI+`/product/getproduct?pagenumber=${values.pagenumber}&keyword=${values.keyword}`)
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


    getNumberItem = () =>{
        const values = queryString.parse(this.props.location.search)
        // console.log(values)
        // if(!values.pagenumber){
        //     values.pagenumber=1
        
        // }
        if(!values.keyword){
            values.keyword = ''
        }
        Axios.get(URLAPI + `/product/productcount?keyword=${values.keyword}`)
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
                    <PaginationLink href={this.printHref(`pagenumber=${page}`)} className="text-dark">
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
        
    if(this.state.productlist.length > 0){

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
                    <h5 className="mb-3 badge badge-dark">{val.shopname}</h5>

                    
                    <Link to={"/productdetails?pid=" + val.id}> 
                        <input type='text' value="View Product" className="form-control btn btn-dark navbartext pt-4 pb-4"/>


                    </Link>
          
            </div>
    
    
    
            )
        })
       
        return output
    }else{
        return(
            <div className="p-t-100 text-center mb-5">
            <h1>No Product Found :(</h1>
            <img src={URLAPI + PATHDEFAULTCARTEMPTY} width="200px" height="200px"/>
        </div>
        )
    }

    }

    printHref = (query)=>{
        const values = queryString.parse(this.props.location.search)
        if(values.keyword){
            return `?keyword=${values.keyword}&${query}`
        }else{
            return `?${query}`
        }
    }



    render(){
        // const { totalPage, currentPage } = this.state;
        // if(this.state.finishload === true){

        //     if(currentPage > totalPage){
        //         return(
        //             <Redirect to={`/search?pagenumber=${totalPage}`}/>
        //         )
        //     }
        //     else if (currentPage < 0){
        //         return(
        //             <Redirect to={`/`}/>
        //         )
        //     }
        // }
        return(
            <div>
            <div className="col p-t-100">
              
                
                <div className="d-flex flex-row justify-content-center p-5" >
                    <input type="text" 
                    ref="filtertextref"
                 
                
                    defaultValue={queryString.parse(this.props.location.search).keyword}
                    className="form-control form-control-lg text-center"
                     placeholder="Search Items.." 
                     style={{ alignSelf: "center", borderRadius : "3px"}}
                     onChange={()=>this.props.onChangeFilter(this.refs.filtertextref.value)}
                    ></input>
                    <a href={`?keyword=${this.props.textfilter}`}>
                    <input type="button" className="btn" value="FILTER" style={{height : "50px", alignSelf : "center", width : "200px", backgroundColor : "black", fontWeight : "bolder", color : "white"}}/>
                    </a>
                </div>
        
                <div className="row">
                    <div className="col-md-1">

                    </div>
                    <div className="col-md-10 p-0">
                        {/* <div className="d-flex flex-row justify-content-center"> */}
                        {this.state.productcount !== 0 ? 
                        <div className="mb-5">
                        {this.state.productcount + ` Product Found, Showing (${((this.state.currentPage-1)*this.state.pageperitem)+1}
                         -${this.state.productlist.length+((this.state.currentPage-1)*this.state.pageperitem)})`}
                        </div>
                    :
                    null}
                        {this.renderProduct()}
                       
                        {/* </div> */}
                 
                    </div>
                    <div className="col-md-1">
                    
                      
                    </div>
                </div>
             

                {this.state.productcount > 0
                ?
                <div className="d-flex flex-row justify-content-center">
                    <Pagination aria-label="Page navigation example" size="lg" >
                <PaginationItem >
                    <PaginationLink first href={this.printHref(`pagenumber=1`)} className="text-dark"/>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink previous
                     href={this.state.currentPage ===1 ?
                        this.printHref(`pagenumber=${this.state.currentPage}`)
                        :
                        this.printHref(`pagenumber=${this.state.currentPage-1}`)
                       
                    } 
                     className="text-dark" />
                </PaginationItem>
                
                {this.printPaginationButton()}
                    
                <PaginationItem>
                    <PaginationLink next 
                    href={this.state.currentPage === this.state.totalPage ?
                        this.printHref(`pagenumber=${this.state.currentPage}`)
                        :
                        this.printHref(`pagenumber=${this.state.currentPage+1}`)
                     } 
                     className="text-dark" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink last href={this.printHref(`pagenumber=${this.state.totalPage}`)}  className="text-dark"/>
                </PaginationItem>
                </Pagination>
                </div>
                :
                null
            }
                


               
              
            </div>
            <Footer/>
                
            </div>
        )
    }
}

const mapStateToProps= (state)=>{
    return{ 
        textfilter : state.filtertext.text
    }
}

export default connect(mapStateToProps,{onChangeFilter})(searchProduct);