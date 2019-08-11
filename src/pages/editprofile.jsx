import React from 'react'
import { connect } from 'react-redux'
import Axios from 'axios';
import { URLAPI } from '../redux/actions/types';

class editProfile extends React.Component{
    state = { 
   
        isEdit : false
   
    }

    
    componentDidMount = () => {
        
    }

    getProfile = () => {

        // if(this.props.userdata.username !== "" & this.state.loading === false){
        //     console.log("Masuk")
        //     Axios.post(URLAPI + '/user/getprofile', {
        //         id : this.props.userdata.userid
        //     })
        //     .then((res)=>{
        //         console.log("Selesai gEt")
        //         this.setState({
        //             userprofile : res.data,
        //             loading : true
        //         })
        //         console.log(res.data)
        //     })
        //     .catch((err)=>{
        //         console.log(err)
        //     })
        // }
    }

    previewFile = () => {
        var preview = document.getElementById('imgpreview')
        var file    = document.getElementById('imgprofileinput').files[0];
   
       
        var reader  = new FileReader();
      
        reader.onloadend = function () {
          preview.src = reader.result;
        }
      
        if (file) {
          reader.readAsDataURL(file);
        } else {
          preview.src = "";
        }
      }

    printProfile = () => {
        if(this.props.userdata.USERNAME !== ""){
            console.log("Masuk")
            if(this.state.isEdit === false){

                return(
    
                <div className="mycontainer p-t-100">
                <div className="row border border-secondary ">
                   
                    <div className="col-md-3 " style={{height : "400px"}}>
                   
                        <center><h3 className="mb-3 mt-3">Your Avatar</h3></center>
                       
                        <img id="imgpreview" className="rounded-circle mb-4 mt-5 text-center ml-5 " src="https://cdn3.iconfinder.com/data/icons/users-6/100/654853-user-men-2-512.png" width="150px" height="150px"></img>
                        <input type="file" className="mt-5 btn " id="imgprofileinput" style={{width : "250px", color : "white", backgroundColor : "black"}} onChange={() => this.previewFile()}></input>
                    </div>
                    <div className="col-md-9 pl-5 pt-2">
                        <div className="subtitletext mb-3 mt-3"> Name </div>
                        <input type="text" className="form-control form-control-lg mb-3" ref="name" value={this.props.userdata.USERNAME} readOnly></input>
                        <div className="subtitletext mb-3"> Your Phone Number </div>
                        <input type="number" className="form-control form-control-lg mb-3" ref="phone" value={this.props.userdata.PHONENUMBER} readOnly></input>
                        <div className="subtitletext mb-3"> Your Location </div>
                        <input type="text" className="form-control form-control-lg mb-5" ref="location" value={this.props.userdata.RESIDENCE} readOnly></input>
                        <div className="subtitletext mb-3 "> Saldo </div>
                        <input type="number" className="form-control form-control-lg mb-3" value={this.props.userdata.SALDO} readOnly></input>
                        <div className="d-flex flex-row justify-content-center mb-5">
                            <input type="button" className="btn btn-success navbartext mr-5" onClick={()=>this.setState({isEdit : true})} value="EDIT PROFILE"></input>
                            <input type="button" className="btn btn-primary navbartext mr-5" value="CHANGE PASSWORD"></input>
                        
    
                        </div>
                        
    
                    </div>
    
    
                </div>
            </div>
                )
            }
            else {
                return(
    
                    <div className="mycontainer p-t-100">
                    <div className="row border border-secondary ">
                       
                        <div className="col-md-3 " style={{height : "400px"}}>
                       
                            <center><h3 className="mb-3 mt-3">Your Avatar</h3></center>
                           
                            <img id="imgpreview" className="rounded-circle mb-4 mt-5 text-center ml-5 " src="https://cdn3.iconfinder.com/data/icons/users-6/100/654853-user-men-2-512.png" width="150px" height="150px"></img>
                            <input type="file" className="mt-5 btn " id="imgprofileinput" style={{width : "250px", color : "white", backgroundColor : "black"}} onChange={() => this.previewFile()}></input>
                        </div>
                        <div className="col-md-9 pl-5 pt-2">
                            <div className="subtitletext mb-3 mt-3"> Name </div>
                            <input type="text" className="form-control form-control-lg mb-3" ref="name" value={this.props.userdata.USERNAME} readOnly></input>
                            <div className="subtitletext mb-3"> Your Phone Number </div>
                            <input type="number" className="form-control form-control-lg mb-3" ref="phone" defaultValue={this.props.userdata.PHONENUMBER} ></input>
                            <div className="subtitletext mb-3"> Your Location </div>
                            <input type="text" className="form-control form-control-lg mb-5" ref="location" defaultValue={this.props.userdata.RESIDENCE} ></input>
                            <div className="subtitletext mb-3 "> Saldo </div>
                            <input type="number" className="form-control form-control-lg mb-3" value={this.props.userdata.SALDO} readOnly></input>
                            <div className="d-flex flex-row justify-content-center mb-5">
                                <input type="button" className="btn btn-success navbartext mr-5" value="SAVE"></input>
                                <input type="button" className="btn btn-danger navbartext mr-5"  onClick={()=>this.setState({isEdit : false})} value="CANCEL"></input>
        
                            </div>
                            
        
                        </div>
        
        
                    </div>
                </div>
                    )
            }
        }
    }
      
    render(){
        return(
            <div>
        
               {this.printProfile()}

            </div>
        )
    }
}

const mapStateToProps= (state)=>{
    return{ 
      userdata : state.userdata,
      username : state.userdata.USERNAME
    }
}

export default connect(mapStateToProps, null)(editProfile);