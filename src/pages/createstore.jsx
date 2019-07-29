import React from 'react'
import { Redirect } from 'react-router'


class CreateStore extends React.Component{
    state={
        redirect : false
    }

    checkValidate =() =>{
        

        // REDIRECT FALSE, USER INPUT ALL VALID
        this.setState({
            redirect : true
        })
    }

     previewFile = () => {
        var preview = document.getElementById('blah')
        var file    = document.getElementById('inputfile').files[0];

       
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
      

    render(){
        if(this.state.redirect === true){
            return ( 
                <Redirect to="/userstore"> </Redirect>
            )
        }
        return(
            <div>
                <div className="container mt-5">
                    <div className="d-flex justify-content-center mt-5 mb-5 navbartext bg-secondary" style={{height : "100px",alignItems:"center", fontSize : "40px"}}>
                        Create Your Store 
                    </div>
                    <div className="subtitletext mb-1">
                        Store Name
                    </div>
                    <input type="text" className="form-control form-control-lg mb-5 "/>
                    <div className="subtitletext mb-1">
                        Store Description
                    </div>
                    {/* <input type="text" className="form-control form-control-lg mb-5 "/> */}
                    <textarea rows="5" id="storedesc" className="form-control mb-5"></textarea>
                    <div className="subtitletext mb-1">
                        Store Image
                    </div>
                    <input type='file' id="inputfile" className="mb-5" onChange={() => this.previewFile()}/>
                    <div><img id="blah" src="#" alt="image preview" height="200" /></div>
                 
                    <input type="button" className="form-control form-control-lg btn btn-success navbartext  mb-5 mt-5" value="CREATE STORE" onClick={()=>this.checkValidate()}/>



                </div>
            </div>
        )
    }
}

export default CreateStore;