import React, { Component } from "react";
import Slider from "./../slider/Slider"
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { URLAPI } from "../redux/actions/types";
import { connect } from "react-redux";
import { getListCategory } from "./../redux/actions/index"



class Responsive extends Component {


  componentDidMount = () => {
    this.props.getListCategory()
    
  }
  printCatList = () => {
    if(this.props.listcategory.length > 0){
     
      var output = this.props.listcategory.map((val)=>{
          return (
            <div className="bg-light shadow" style={{width : "350px"}} >
              <center>
                <Link to={'/product?cat=' + val.name}> 
                {/* Lanjut */}
                  <img  className="p-0" src="https://www.electronicrecyclingassociation.ca/wp-content/uploads/2018/01/Electronics-Shop-4.png" height="75px"/>
              
                <span className="caption"> {val.name}</span>
                </Link>
                </center>
            </div>
          )
      })
      return output
    }
  }
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      centerMode: true,
      slidesToScroll: 3,
      variableWidth : true,
      initialSlide: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            dots: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            variableWidth : true,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth : false,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth : false,
            initialSlide: 1
          }
        }
      ]
    };
    return (
      <div > 

        <Slider {...settings}  >
            {/* <div className="bg-light shadow" style={{width : "350px"}} >
              <center>
                <Link to='/product'>
                  <img  className="p-0" src="https://www.electronicrecyclingassociation.ca/wp-content/uploads/2018/01/Electronics-Shop-4.png" height="75px"/>
                </Link>
                <span className="caption"> CATEGORY</span>
                </center>
            </div>
            <div className="bg-light shadow" style={{width : "350px"}} >
            <center>
                <Link to='/product'>
                  <img  className="p-0" src="https://www.electronicrecyclingassociation.ca/wp-content/uploads/2018/01/Electronics-Shop-4.png" height="75px"/>
                </Link>
                <span className="caption"> CATEGORY</span>
                </center>
            </div>
            <div className="bg-light shadow" style={{width : "350px"}}>
                <center>
                  <Link to='/product'>
                    <img  className="p-0" src="https://www.electronicrecyclingassociation.ca/wp-content/uploads/2018/01/Electronics-Shop-4.png" height="75px"/>
                  </Link>
                  <span className="caption"> CATEGORY</span>
                </center>
            </div>
            <div className="bg-light shadow" style={{width : "350px"}}>
               <center>
                  <Link to='/product'>
                    <img  className="p-0" src="https://www.electronicrecyclingassociation.ca/wp-content/uploads/2018/01/Electronics-Shop-4.png" height="75px"/>
                  </Link>
                  <span className="caption"> CATEGORY</span>
                </center>
            </div>
            <div className="bg-light shadow" style={{width : "350px"}}>
               <center>
                  <Link to='/product'>
                    <img  className="p-0" src="https://www.electronicrecyclingassociation.ca/wp-content/uploads/2018/01/Electronics-Shop-4.png" height="75px"/>
                  </Link>
                  <span className="caption"> CATEGORY</span>
                </center>
            </div>
            <div className="bg-light shadow" style={{width : "350px"}}>
               <center>
                  <Link to='/product'>
                    <img  className="p-0" src="https://www.electronicrecyclingassociation.ca/wp-content/uploads/2018/01/Electronics-Shop-4.png" height="75px"/>
                  </Link>
                  <span className="caption"> CATEGORY</span>
                </center>
            </div>
            <div className="bg-light shadow" style={{width : "350px"}} >
                <center>
                  <Link to='/product'>
                    <img  className="p-0" src="https://www.electronicrecyclingassociation.ca/wp-content/uploads/2018/01/Electronics-Shop-4.png" height="75px"/>
                  </Link>
                  <span className="caption"> CATEGORY</span>
                </center>
            </div> */}
            {this.printCatList()}
        </Slider>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
      listcategory : state.categorylist

  }
}

export default connect(mapStateToProps, {getListCategory}) (Responsive);
