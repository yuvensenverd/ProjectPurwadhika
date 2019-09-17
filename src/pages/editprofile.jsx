import React from 'react'
import { connect } from 'react-redux'
import Axios from 'axios';
import { URLAPI, GETTOKENURL, APIWILAYAHURL, PATHDEFAULTPICT } from '../redux/actions/types';
import { updateUser, loading, loadingFalse } from '../redux/actions/index'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import numeral from 'numeral'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router'

class editProfile extends React.Component{
    state = { 
        modalOpen : false,
        modalOpenResidence : false,
        province : [],
        imageFile : null,
        avatarChangeModal : false
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
          })
          .catch((err)=>{
            console.log(err)
          })
        })
        .catch((err)=>{
          console.log(err)
        })
      }


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
            this.props.loading()
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
            

            // AXIOS >> Update Path Image if image exist, Write path 
            Axios.post(URLAPI+'/user/saveprofile',formData, headers )
            .then((res)=>{
                console.log("Berhasil update")
                console.log(res.data) // array of object
                
                this.props.updateUser(res.data[0]) // UPDATE DATA TERBARU
                this.props.loadingFalse()
                this.setState({
                    avatarChangeModal : true
                })
            })
            .catch((err)=>{
                this.props.loadingFalse()
                window.alert(err)
            })
        }
    }

    printProfile = () => {
        // AMBIL DATA DARI REDUX
        if(this.props.userdata.USERNAME !== "" && this.props.userdata.CHECK){
        
                return(
    
                <div className="mycontainer p-t-100">
                    
                <div className="row border border-secondary ">
                   
                    <div className="col-md-3" style={{height : "400px"}}>
                        
                        <center><h3 className="mb-3 mt-3">Your Avatar Preview</h3></center>
                       
                        <img id="imgpreview" className="rounded-circle mb-4 mt-5 text-center m-l-85 "
                         src={this.props.userdata.PROFILEIMG ? 
                            URLAPI+this.props.userdata.PROFILEIMG
                            :
                           URLAPI+PATHDEFAULTPICT
                        } width="150px" height="150px" alt="avatar image"/>
                            

                        
                        <input type="file" className="mt-5 mb-5 btn " id="imgprofileinput" style={{ color : "white", backgroundColor : "black"}} onChange={this.previewFile}></input>
                        {this.props.userdata.LOADING 
                        ?
                        <button className="btn btn-success navbartext form-control">
                        <div class="spinner-border text-secondary" role="status">
                                <span class="sr-only">Loading...</span>
                        </div>
                        </button>
                        :
                        <input type="button" className="btn btn-success navbartext form-control" value="SAVE AVATAR" onClick={()=>this.onClickSaveImage()}/>
                        }
                    </div>
                    <div className="col-md-9 pl-5 pt-2">
                        
                        <div className="subtitletext mb-3 mt-3"> Name  </div>      
                        <input type="text" className="form-control form-control-lg mb-3" ref="name" value={this.props.userdata.USERNAME} readOnly></input>
                        {/* <div className="subtitletext mb-3"> Your Phone Number <input type="button" className="btn badge-pill badge-danger navbartext ml-3" style={{fontSize : "10px"}} value="CHANGE"/></div> */}
                        <input type="number" className="form-control form-control-lg mb-3" ref="phone" value={this.props.userdata.PHONENUMBER} readOnly></input>
                        {/* <div className="subtitletext mb-3"> Your Email Address <input type="button" className="btn badge-pill badge-danger navbartext ml-3" style={{fontSize : "10px"}} value="CHANGE"/></div> */}
                        <input type="text" className="form-control form-control-lg mb-3" ref="email" value={this.props.userdata.EMAIL} readOnly></input>
                        <div className="subtitletext mb-3"> Your Location <input type="button" className="btn badge-pill badge-danger navbartext ml-3" style={{fontSize : "10px"}} value="CHANGE" onClick={()=>this.setState({modalOpenResidence : true})}/></div>
                        <input type="text" className="form-control form-control-lg mb-5" ref="location" value={this.props.userdata.RESIDENCE} readOnly></input>
                        <div className="subtitletext mb-3 "> Saldo </div>
                        <input type="text" className="form-control form-control-lg mb-3" value={"Rp  " + numeral(this.props.userdata.SALDO).format(0,0)} readOnly></input>
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
        var oldpass = this.refs.oldpw.value
        var newpass = this.refs.newpw.value
        var confirm = this.refs.confirmnewpw.value
        if(newpass === confirm){
            const token = localStorage.getItem('token')
            var headers ={
                headers : 
                {
                    'Authorization' : `${token}`
                }
            }
            const data = {
                oldpass,
                password : newpass,
                userid : this.props.userdata.userid
            }
            Axios.put(URLAPI+'/user/onchangepass', data, headers)
            .then((res)=>{
                console.log(res.data)
                window.alert("Update Password Success")
                this.props.updateUser(res.data[0])
                this.closeModal()
            })
            .catch((err)=>{
                window.alert(err.response.data.err)
            })
        }
    }

    onClickSaveResidence = () =>{
        // PASSWORD CHANGE
        var newres = this.refs.inputresidence.value

        if(this.props.userdata.RESIDENCE !== newres){
            const token = localStorage.getItem('token')
            var headers ={
                headers : 
                {
                    'Authorization' : `${token}`
                }
            }
            //
            Axios.put(URLAPI + '/user/changeresidence', {
                id : this.props.userdata.userid,
                residence : newres
            }, headers)
            .then((res)=>{
                window.alert("Change Residence Success!")
                this.props.updateUser(res.data[0])
                this.setState({modalOpenResidence : false})

            })
            .catch((err)=>{
                console.log(err)
            })
        }else{
            window.alert("Residence Tidak berubah!")
        }
    }
      
    render(){
        if(this.props.userdata.CHECK && this.props.userdata.USERNAME === ''){
    
            return ( 
                <Redirect to="/"> </Redirect>
            )
        }
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
                                    <input type="button" className="btn btn-success navbartext" value="CHANGE" onClick={()=>this.onClickSaveResidence()}/>
                                </div>
                            </center>
                        </ModalFooter>
                </Modal>

                {/* USER AVATAR SUCCESS */}
                <Modal isOpen={this.state.avatarChangeModal} toggle={()=>this.setState({avatarChangeModal : false})} size="lg" style={{maxWidth: '800px', position : 'absolute', top : '20%', left : '40%'}}>
                        <ModalHeader>
                            <div className="subtitletext text-center p-l-10" style={{fontSize : "26px"}}>Avatar Has Been Updated!</div>
                        </ModalHeader>
                        <ModalBody >
                                <center>
                                <FontAwesomeIcon size="5x"  icon={faCheckCircle} style={{color : "red"}}>  
                                </FontAwesomeIcon>
                                </center>
                        </ModalBody>
                        <ModalFooter>
                                <Link to="/">
                                <input type="button" value="Go to Homepage" className="btn btn-danger btn-lg navbartext" />
                                </Link>
                          
                                <input type="button" value="Stay this page" className="btn btn-info btn-lg navbartext" onClick={()=>this.setState({avatarChangeModal : false})}/>
                              
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

export default connect(mapStateToProps, {updateUser, loading, loadingFalse})(editProfile);