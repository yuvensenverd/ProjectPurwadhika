import React from 'react'
import { Redirect } from 'react-router'
import Footer from './../components/footer';
import { connect } from 'react-redux'
import Axios from 'axios';
import { updateUser } from '../redux/actions/index'
import { URLAPI } from '../redux/actions/types';


class CreateStore extends React.Component{
    state={
        redirect : false
    }

    checkValidate =() =>{
        var name = this.refs.storename.value
        var description = this.refs.storedesc.value
        var image = document.getElementById('inputfile').files[0]
        
        var data = {
            userid : this.props.userdata.userid,
            name,
            description
        }
        
        if(image){

            var formData = new FormData()
            var headers ={
                headers : 
                {'Content-Type' : 'multipart/form-data'}
            }
    
    
            formData.append('image', image) 
            formData.append('data', JSON.stringify(data))

            Axios.post(URLAPI + '/shop/createshop', formData, headers)
            .then((res)=>{
                console.log(res.data)
                console.log("success")
                this.props.updateUser(res.data[0]) // update props, ubah di reducer HAVESHOP >> true
                this.setState({
                    redirect : true
                })
            })
            .catch((err)=>{
                console.log(err)
            })
        }

    }

     previewFile = () => {
        var preview = document.getElementById('blah')
        var file    = document.getElementById('inputfile').files[0];

       
        var reader  = new FileReader();
        console.log(reader)
      
        reader.onloadend = function () {
          preview.src = reader.result;
        }
      
        if (file) {
          reader.readAsDataURL(file);
        } else {
          preview.src = "";
        }
      }
      

    render(){
        if(this.state.redirect === true || this.props.userdata.HAVESHOP ){
            return ( 
                <Redirect to="/userstore"> </Redirect>
            )
        }
        if(this.props.userdata.HAVESHOP && this.props.userdata.CHECK){
            return ( 
                <Redirect to="/userstore"> </Redirect>
            )
        }
    
        if(this.props.userdata.CHECK && this.props.userdata.USERNAME === ''){
            console.log('masuk')
            window.alert("Please Login to enter  shop !")
            return ( 
                <Redirect to="/"> </Redirect>
            )
        }
        
        if(this.props.userdata.CHECK && this.props.userdata.STATUS !== "Verified"){
            window.alert("Your Account is not verified yet, Please Verify your account first ! ")
            return (
                <Redirect to="/"> </Redirect> 
            )
        }
        return(
            <div>
            <div className="mycontainer">
                <div className="p-t-100">
                    <div className="d-flex justify-content-center navbartext bg-secondary" style={{height : "100px",alignItems:"center", fontSize : "40px"}}>
                        Create Your Store 
                    </div>
                    <div className="subtitletext mb-1">
                        Store Name
                    </div>
                    <input type="text" ref="storename" className="form-control form-control-lg mb-5 "/>
                    <div className="subtitletext mb-1">
                        Store Description
                    </div>
                    {/* <input type="text" className="form-control form-control-lg mb-5 "/> */}
                    <textarea rows="5" id="storedesc" ref="storedesc" className="form-control mb-5"></textarea>
                    <div className="subtitletext mb-1">
                        Store Image
                    </div>
                    <input type='file' id="inputfile" ref="inputimage "className="mb-5" onChange={() => this.previewFile()}/>
                    <div><img id="blah" src="#" alt="image preview" height="200" /></div>
                 
                    <input type="button" className="form-control form-control-lg btn btn-success navbartext  mb-5 mt-5" value="CREATE STORE" onClick={()=>this.checkValidate()}/>



                </div>
            </div>
            <Footer/>
            </div>
        )
    }
}

const mapStateToProps= (state)=>{
    return{ 
      userdata : state.userdata,
    }
}

export default connect(mapStateToProps, {updateUser})(CreateStore);