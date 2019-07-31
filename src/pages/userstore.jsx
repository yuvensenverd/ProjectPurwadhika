import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faStoreAlt, faLuggageCart, faHourglassHalf } from '@fortawesome/free-solid-svg-icons'
import { Table } from 'reactstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Link} from 'react-router-dom'






class userStore extends React.Component{
    state = {
        modalOpen : false,
        imagenum : [true]
    }

    closeModal = () =>{
        this.setState({
            modalOpen : false,
            imagenum : [true]
            
         
        })
    }

    previewFile = (index) => {
        var preview = document.getElementById('primg'+index);
        var file    = document.getElementById('productimage'+index).files[0];
  
       
        var reader  = new FileReader();
      
        reader.onloadend = function () {
          preview.src = reader.result;
        }
      
        if (file) {
          reader.readAsDataURL(file);
          var a = true
          var array = this.state.imagenum.concat(a)
          this.setState({
              imagenum : array
          })
          
        } else {
          preview.src = "";
        }
      }

    printInputFile = () => {

       
     

        
        var jsx = this.state.imagenum.map((val, index)=>{
            if(index <= 4){

            
            return (
                <div>
                    <div>
                    <input type="file" id={`productimage${index + 1}`} className="form-control form-control-lg mb-3 " onChange={() => this.previewFile(index+1)}/>
                    </div>
                    <img id={`primg${index + 1}`} src="#" alt="image preview" height="100" />    
                </div>
            )
            }
            else {
                return (
                    <div></div>
                )
            }
        })
       
        
        return jsx
    
    }

    modalOpen =()=>{
        this.setState({
            modalOpen :true,
        
        })
    }
      


    render(){
        return(
            <div>
                <div className="storecontainer p-t-100">
                    <Modal isOpen={this.state.modalOpen} toggle={this.closeModal} size="lg" style={{maxWidth: '1600px', width: '80%'}}>
                        <ModalHeader>
                                <h1>Add Your Product</h1>
                        </ModalHeader>
                        <ModalBody>
                            <div className="subtitletext mb-3">
                                Product Name
                            </div>
                            <input type="text" className="form-control form-control-lg mb-3 "/>
                            
                            <div className="subtitletext mb-3">
                                Product Genre
                            </div>
                            <select  className="mb-5" required id = "myList" ref="inputgenre" className="form-control mb-2" placeholder="Genre">
                                    <option value="" disabled selected hidden>Choose Genre</option>
                                    {/* function */}
                            </select>
                            <div className="subtitletext mb-3">
                                Product Description
                            </div>
                            <input type="text" className="form-control form-control-lg mb-3 "/>
                            <div className="subtitletext mb-3">
                                Product Price
                            </div>
                            <input type="number" className="form-control form-control-lg mb-3 "/>
                            <div className="subtitletext mb-3">
                                No. of Product Stock Available
                            </div>
                            <input type="number" className="form-control form-control-lg mb-3 "/>
                            <div className="subtitletext mb-3">
                                Product Image (up to 5)
                            </div>
                           
                            {this.printInputFile()}
                            {/* {this.state.imagenum.length === 1 
                            ?
                            <div>
                                <div>
                                <input type="file" id={`productimage${1}`} className="form-control form-control-lg mb-3 " onChange={() => this.previewFile()}/>
                                </div>
                                <img id={`primg${1}`} src="#" alt="image preview" height="200" />    
                            </div>
                            :
                            null
                            } */}
                        </ModalBody>
                        <ModalFooter>

                            <input type="button" className="btn btn-lg btn-danger navbartext mb-2 p-2" value=" - Cancel" onClick={()=>this.closeModal()}/>
                            <input type="button" className="btn btn-lg btn-success navbartext mb-2 p-2" value=" + Submit Product" />
                        </ModalFooter>
                    </Modal>
                    <div className="storecard p-3 mb-5">
                        <div className="row">
                            <div className="col-md-1 p-0" >
                                <img src='https://app.unbouncepreview.com/publish/assets/567d1d2a-99a8-4b43-ae7f-2e3eaa9fc929/116cead7-sqd-step1.png' alt="userprofile" className="storeimage"/>
                            </div>
                            <div className="col-md-2 subtitletext text-center" style={{paddingTop : "28px"}}>
                                <div className="mb-2">Store Name</div>
                                <div style={{fontSize : "14px"}}><FontAwesomeIcon size="1x"  icon={faMapMarkerAlt} ></FontAwesomeIcon>&nbsp;&nbsp; Makassar, Indonesia</div>
                            </div>
                            <div className="col-md-2 subtitletext  p-3 text-center">
                                <div className="mb-2"> <FontAwesomeIcon size="2x"  icon={faHourglassHalf} ></FontAwesomeIcon></div>
                                <Link to="/userhistory">
                                <input type="button" className="btn form-control btn-primary navbartext" value="$ Transaction "/>
                                </Link>
                            </div>
                            <div className="col-md-3 subtitletext  p-3">
                          
                            </div>
                            <div className="col-md-2 subtitletext  text-center p-3"style={{fontSize : "17px"}}>
                            <div className="mb-2"><FontAwesomeIcon size="2x"  icon={faLuggageCart} ></FontAwesomeIcon></div>
                                <div className="mb-1" style={{color : '#83897D'}} > No. of Product</div>
                                <div> 0 </div>
                            </div>
                            <div className="col-md-2 subtitletext  text-center p-3"style={{fontSize : "17px"}}>
                            <div className="mb-2"><FontAwesomeIcon size="2x"  icon={faStoreAlt} ></FontAwesomeIcon></div>
                                <div className="mb-1" style={{color : '#83897D'}}> Product Sold</div>
                                <div> 0 </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div  style={{float : "right"}}> 
                                <input type="button" className="btn  btn-success navbartext mb-2 p-2" value=" + Add Product" onClick={()=>this.modalOpen()}/>
                            </div>

                        <Table hover style={{fontSize : "20px"}}>
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Settings</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>
                                    <img src="" alt=""></img>
                                </td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>
                                    <input type="button" className="btn btn-danger mr-3 navbartext" value="delete" style={{width : "95px"}}/>
                                    <input type="button" className="btn btn-primary navbartext" value="edit" style={{width : "95px"}}/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>
                                    <img src="" alt=""></img>
                                </td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>
                                    <input type="button" className="btn btn-danger mr-3 navbartext" value="delete" style={{width : "95px"}}/>
                                    <input type="button" className="btn btn-primary navbartext" value="edit" style={{width : "95px"}}/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>
                                    <img src="" alt=""></img>
                                </td>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                                <td>
                                    <input type="button" className="btn btn-danger mr-3 navbartext" value="delete" style={{width : "95px"}}/>
                                    <input type="button" className="btn btn-primary navbartext" value="edit" style={{width : "95px"}}/>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                        </div>
                        {/* <div className="d-flex flex-column justify-content-center align-items-center">
                                <div><h1> No Product Yet ! </h1></div>
                                <img src="https://cdn.shopify.com/s/files/1/1061/1924/products/Frowning_Emoji_Icon_30260b4f-d601-45f5-9bb3-836f607cacbc_large.png?v=1542446803" height="200" width="200" className="mb-3"></img>
                                <input type="button" className="btn  btn-success navbartext mb-2 p-2 form-control" value=" + Add Product" style={{width : "400px", fontSize : "30px"}}/>
                        </div> */}
                    </div>
                </div>

            </div>
        )
    }
}

export default userStore;