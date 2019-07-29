import React from 'react'

class editProfile extends React.Component{
    state = { 

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
      
    render(){
        return(
            <div>
                <div className="container mt-5">
                    <div className="row border border-secondary">
                        <div className="col-md-3 " style={{height : "400px"}}>
                       
                            <center><h3 className="mb-3 mt-3">Your Avatar</h3></center>
                           
                            <img id="imgpreview" className="rounded-circle mb-4 mt-5 text-center ml-5 " src="https://cdn3.iconfinder.com/data/icons/users-6/100/654853-user-men-2-512.png" width="150px" height="150px"></img>
                            <input type="file" className="mt-5 btn btn-secondary " id="imgprofileinput" style={{width : "250px"}} onChange={() => this.previewFile()}></input>
                        </div>
                        <div className="col-md-9 pl-5 pt-2">
                            <div className="subtitletext mb-3 mt-3"> Name </div>
                            <input type="text" className="form-control form-control-lg mb-3" readOnly></input>
                            <div className="subtitletext mb-3"> Your Location </div>
                            <input type="text" className="form-control form-control-lg mb-5" readOnly></input>
                            <div className="d-flex flex-row justify-content-center">
                                <input type="button" className="btn btn-success navbartext mr-5" value="CHANGE USERNAME"></input>
                                <input type="button" className="btn btn-primary navbartext mr-5" value="CHANGE PASSWORD"></input>
                                <input type="button" className="btn btn-danger navbartext" value="CHANGE LOCATION"></input>

                            </div>
                            

                        </div>


                    </div>
                </div>
            </div>
        )
    }
}

export default editProfile;