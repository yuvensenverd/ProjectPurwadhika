import React from 'react'
import { Redirect } from 'react-router'
import Footer from './../components/footer';


class CreateStore extends React.Component{
    state={
        redirect : false
    }

    checkValidate =() =>{
        var name = this.refs.storename.value
        var description = this.refs.storedesc.value

        console.log(name)
        console.log(description)
        

        // axios get localhost1998 /createshop?user=enverdliem

        // REDIRECT FALSE, USER INPUT ALL VALID
        this.setState({
            redirect : true
        })
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
        if(this.state.redirect === true){
            return ( 
                <Redirect to="/userstore"> </Redirect>
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

export default CreateStore;