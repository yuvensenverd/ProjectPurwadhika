import React from 'react'
import {Link} from 'react-router-dom'
import { Table } from 'reactstrap'
import { connect } from 'react-redux'
import Axios from 'axios';
import { URLAPI } from '../redux/actions/types';


class AdminPage extends React.Component{
    state = {
        showTable : null,
        finishload : false,
        data : []
        // 1 = show product
        // 2 = show banner (carousel)
        // 3 = show category
        // 4 = show user 
    }

    componentDidMount = () =>{

    }

    adminGetUser = () =>{
        Axios.get(URLAPI + '/user/adminuser')
        .then((res)=>{
            console.log(res.data)
            this.setState({
                data : res.data,
                finishload : true
            })
        })
        .catch((err)=>{
            console.log(err)
        })
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
            if(this.state.finishload === false){
                this.adminGetUser()
            }else{
                return this.state.data.map((user, i)=>{
                    return (
                        <tr>
                            <td>{i+1}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.saldo}</td>
                            <td>{user.status}</td>
                            <td>
                                <input type="button" className="btn btn-danger mr-3 navbartext" value="delete" style={{width : "95px"}}/>
                                <input type="button" className="btn btn-primary navbartext" value="edit" style={{width : "95px"}}/>
                            </td>
                        </tr>
                    )
                })
                
            }
            
            
        }
        return (
            <h1>No Table Are Selected!</h1>
        )
    }

    renderTableHead = () =>{
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
                <tr className="font-weight-bold">
                    <td>NO</td>
                    <td>USERNAME</td>
                    <td>EMAIL</td>
                    <td>ROLE</td>
                    <td>SALDO</td>
                    <td>STATUS</td>
                    <td>SETTINGS</td>
                </tr>
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
                    <Table hover style={{fontSize : "15px"}}>
                        <thead>
                            {this.renderTableHead()}
                        </thead>
                        <tbody>
                            
                            {this.renderTableData()}
                        </tbody>
                        <tfoot>

                        </tfoot>
                    </Table>
                   
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