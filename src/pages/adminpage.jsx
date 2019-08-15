import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

class AdminPage extends React.Component{
    state = {
        showTable : null,
        loading : false
        // 1 = show product
        // 2 = show banner (carousel)
        // 3 = show category
        // 4 = show user 
    }

    componentDidMount = () =>{

    }

    renderTableData = () =>{
        if(this.state.showTable === 1){
            // setstate loading === true
            // Function Axios , then setstate data and loading === false
            // if loading === false , then state.data di map
            // Option 2 , bikin rendertabledata for header jg 
            return(
                <div>
                    Product
                </div>
            )
        }
        if(this.state.showTable === 2){
            return(
                <div>
                    Banner
                </div>
            )
        }
        if(this.state.showTable === 3){
            return(
                <div>
                    Category
                </div>
            )
        }
        if(this.state.showTable === 4){
            return(
                <div>
                    User
                </div>
            )
        }
        return (
            <h1>No Table Are Selected!</h1>
        )
    }

    render(){
        return(
            <div className="p-t-100 p-l-5 p-r-5 ">
                <div className="row mb-5">
                    <div className="col-md-3 text-center">
                        <input type="button" className="btn btn-info navbartext" value="PRODUCTS" style={{width : "200px"}} onClick={()=>this.setState({showTable : 1})}/>
                    </div>
                    <div className="col-md-3 text-center">
                        <input type="button" className="btn btn-danger navbartext" value="BANNER" style={{width : "200px"}} onClick={()=>this.setState({showTable : 2})}/>
                    </div>
                    <div className="col-md-3 text-center">
                        <input type="button" className="btn btn-primary navbartext" value="CATEGORIES" style={{width : "200px"}} onClick={()=>this.setState({showTable : 3})}/>
                    </div>
                    <div className="col-md-3 text-center">
                        <input type="button" className="btn btn-success navbartext" value="USER" style={{width : "200px"}} onClick={()=>this.setState({showTable : 4})}/>
                    </div>
                </div>
                <div className="mycontainer">
                    {this.renderTableData()}
                </div>
            </div>
        )
    }
}

const mapStateToProps= (state)=>{
    return{ 
      userdata : state.userdata
    }
}

export default connect(mapStateToProps, null)(AdminPage);