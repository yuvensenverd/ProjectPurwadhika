import React, { Component } from "react";
import Slider from "./../slider/Slider"
import { Link } from 'react-router-dom'

export default class Responsive extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      centerMode: true,
      slidesToScroll: 3,
      variableWidth : true,
      initialSlide: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
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
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth : false,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
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
            <div className="bg-light shadow" style={{width : "350px"}} >
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
            </div>
       
        </Slider>
      </div>
    );
  }
}
