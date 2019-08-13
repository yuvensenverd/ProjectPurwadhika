import React from 'react'
import { connect } from 'react-redux'
import Axios from 'axios';
import { URLAPI, GETTOKENURL, APIWILAYAHURL } from '../redux/actions/types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class editProfile extends React.Component{
    state = { 
        modalOpen : false,
        //Change Residence
        modalOpenResidence : false,
        province : [],
        imageFile : null
    }

    
    componentDidMount = () => {
        this.getDataProvince()
    }

    getDataProvince = () =>{
        Axios.get(GETTOKENURL)
        .then((res)=>{
          var token = res.data.token
          token = token + '/m/wilayah/provinsi'
          Axios.get(APIWILAYAHURL+token)
          .then((res)=>{
            this.setState({
              province : res.data.data
            })
            console.log(this.state.province)
          })
          .catch((err)=>{
  
          })
        })
        .catch((err)=>{
          console.log(err)
        })
      }

    // getProfile = () => {

    //     // if(this.props.userdata.username !== "" & this.state.loading === false){
    //     //     console.log("Masuk")
    //     //     Axios.post(URLAPI + '/user/getprofile', {
    //     //         id : this.props.userdata.userid
    //     //     })
    //     //     .then((res)=>{
    //     //         console.log("Selesai gEt")
    //     //         this.setState({
    //     //             userprofile : res.data,
    //     //             loading : true
    //     //         })
    //     //         console.log(res.data)
    //     //     })
    //     //     .catch((err)=>{
    //     //         console.log(err)
    //     //     })
    //     // }
    // }

    closeModal = () =>{
        this.setState({
            modalOpen : false
        })
    }

    previewFile = (event) => {
        var preview = document.getElementById('imgpreview')
        var file    = document.getElementById('imgprofileinput').files[0];
        console.log(event.target.files[0])

        var imgfile = event.target.files[0]

       
        var reader  = new FileReader();
      
        reader.onloadend = function () {
          preview.src = reader.result;
        }
      
        if (file) {
          reader.readAsDataURL(file);
          this.setState({
              imageFile : imgfile
          })
          console.log("image terisi")
        } else {
          preview.src = "";
          this.setState({
            imageFile : null
        })
        console.log("balik state null")
        }
      }

    onClickSaveImage = () => {
        if(this.state.imageFile){
            var formData = new FormData()
            var headers ={
                headers : 
                {'Content-Type' : 'multipart/form-data'}
            }
            console.log(this.state.imageFile)

            var data = {
                userid : this.props.userdata.userid
            }

            formData.append('image', this.state.imageFile)
            formData.append('data', JSON.stringify(data))
            

            // AXIOS POST
            Axios.post(URLAPI+'/user/saveprofile',formData, headers )
            .then((res)=>{
                console.log("Berhasil update")
            })
            .then((err)=>{
                console.log(err)
            })
        }
    }

    printProfile = () => {
        if(this.props.userdata.USERNAME !== ""){
        
                return(
    
                <div className="mycontainer p-t-100">
                    
                <div className="row border border-secondary ">
                   
                    <div className="col-md-3" style={{height : "400px"}}>
                        
                        <center><h3 className="mb-3 mt-3">Your Avatar Preview</h3></center>
                       
                        <img id="imgpreview" className="rounded-circle mb-4 mt-5 text-center m-l-85 " src={URLAPI+this.props.userdata.PROFILEIMG} width="150px" height="150px"></img>
                        <input type="file" className="mt-5 mb-5 btn " id="imgprofileinput" style={{ color : "white", backgroundColor : "black"}} onChange={this.previewFile}></input>
                        <input type="button" className="btn btn-success navbartext form-control" value="SAVE AVATAR" onClick={()=>this.onClickSaveImage()}/>
                    </div>
                    <div className="col-md-9 pl-5 pt-2">
                        
                        <div className="subtitletext mb-3 mt-3"> Name  </div>      
                        <input type="text" className="form-control form-control-lg mb-3" ref="name" value={this.props.userdata.USERNAME} readOnly></input>
                        <div className="subtitletext mb-3"> Your Phone Number <input type="button" className="btn badge-pill badge-danger navbartext ml-3" style={{fontSize : "10px"}} value="CHANGE"/></div>
                        <input type="number" className="form-control form-control-lg mb-3" ref="phone" value={this.props.userdata.PHONENUMBER} readOnly></input>
                        <div className="subtitletext mb-3"> Your Email Address <input type="button" className="btn badge-pill badge-danger navbartext ml-3" style={{fontSize : "10px"}} value="CHANGE"/></div>
                        <input type="text" className="form-control form-control-lg mb-3" ref="email" value={this.props.userdata.EMAIL} readOnly></input>
                        <div className="subtitletext mb-3"> Your Location <input type="button" className="btn badge-pill badge-danger navbartext ml-3" style={{fontSize : "10px"}} value="CHANGE" onClick={()=>this.setState({modalOpenResidence : true})}/></div>
                        <input type="text" className="form-control form-control-lg mb-5" ref="location" value={this.props.userdata.RESIDENCE} readOnly></input>
                        <div className="subtitletext mb-3 "> Saldo </div>
                        <input type="number" className="form-control form-control-lg mb-3" value={this.props.userdata.SALDO} readOnly></input>
                        <div className="d-flex flex-row justify-content-center mb-5">
                            {/* <input type="button" className="btn btn-success navbartext mr-5" onClick={()=>this.setState({isEdit : true})} value="EDIT PROFILE"/> */}
                            <input type="button" className="btn btn-info navbartext mr-5 mt-3" value="CHANGE PASSWORD" onClick={()=>this.setState({modalOpen : true})}/>
                            
                        
    
                        </div>
                        
    
                    </div>
    
    
                </div>
            </div>
                )
            
           
        }
    }

    printDataProvinsi = () => {
        if(this.state.province.length === 0 ){
          return (
            <option value="" disabled selected hidden>Loading...</option>
          )
        }else{
          var list = this.state.province.map((val)=>{
            return (
                <option value={val.name}> {val.name} </option>
            )
        })
        
        return list 
        }
        
      }

    onSaveChangePassword = () =>{
        // PASSWORD CHANGE
    }
      
    render(){
        return(
            <div>
                {/* MODAL PASSWORD */}
                <Modal isOpen={this.state.modalOpen} toggle={this.closeModal} size="lg" style={{width: '550px'}}>
                        <ModalHeader>
                            <center><div className="subtitletext text-center p-l-110" style={{fontSize : "26px"}}>Change Password</div></center>
                        </ModalHeader>
                        <ModalBody >
                            <div className="subtitletext mb-2 mt-2"> Old Password  </div>  
                            <input type="text" className="form-control" ref="oldpw" placeholder="type old password..." />
                            <div className="subtitletext mb-2 mt-2"> New Password  </div>  
                            <input type="text" className="form-control" ref="newpw" placeholder="type new password..." />
                            <div className="subtitletext mb-2 mt-2"> Confirm New Password  </div>  
                            <input type="text" className="form-control" ref="confirmnewpw" placeholder="confirm new password..." />
                              
                        </ModalBody>
                        <ModalFooter>
                            <center>
                                <div className="p-r-140">

                            <input type="button" className="btn btn-danger navbartext mr-5" value="CANCEL" onClick={()=>this.setState({modalOpen : false})}/>
                            <input type="button" className="btn btn-success navbartext" value="CHANGE" onClick={()=>this.onSaveChangePassword()}/>
                                </div>
                            </center>
                        </ModalFooter>
                </Modal>

                {/* MODAL CHANGE LOCATION */}
                <Modal isOpen={this.state.modalOpenResidence} toggle={()=>this.setState({modalOpenResidence : false})} size="lg" style={{width: '550px'}}>
                        <ModalHeader>
                            <center><div className="subtitletext text-center p-l-110" style={{fontSize : "26px"}}>Change RESIDENCE</div></center>
                        </ModalHeader>
                        <ModalBody >
                            <div className="subtitletext mb-2 mt-2"> Old RESIDENCE  </div>  
                            <input type="text" className="form-control" ref="oldpw" placeholder="type old password..." value={this.props.userdata.RESIDENCE} />
                            <div className="subtitletext mb-2 mt-2"> New RESIDENCE  </div>  
                            <select required id="myList" ref="inputresidence" className="form-control mb-5" placeholder="Choose New Residence">
                                    <option value="">CHOOSE PROVINCE</option>
                                    {this.printDataProvinsi()}
                            </select>
                            
                              
                        </ModalBody>
                        <ModalFooter>
                            <center>
                                <div className="p-r-140">

                                    <input type="button" className="btn btn-danger navbartext mr-5" value="CANCEL" onClick={()=>this.setState({modalOpenResidence : false})} />
                                    <input type="button" className="btn btn-success navbartext" value="CHANGE"/>
                                </div>
                            </center>
                        </ModalFooter>
                </Modal>

        
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