import React from 'react'
import './../pages/404css/style.css'
import { Link } from 'react-router-dom'


class PageNotFound extends React.Component{
    render(){
        return(
            <div className="mycontainer ">
                        <div id="notfound">
                     <div class="notfound">
                    <div class="notfound-bg">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <h1>oops!</h1>
                    <h2>Error 404 : Page Not Found</h2>
                    <Link className="btn btn-sucess" to="/">Go Back</Link>
                    <div class="notfound-social">
                        {/* <a href="#"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-twitter"></i></a>
                        <a href="#"><i class="fa fa-pinterest"></i></a>
                        <a href="#"><i class="fa fa-google-plus"></i></a> */}
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PageNotFound;