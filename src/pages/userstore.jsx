import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faStoreAlt, faLuggageCart, faHourglassHalf, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { Table } from 'reactstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Link} from 'react-router-dom'
import Footer from './../components/footer';
import { connect } from 'react-redux'
import Axios from 'axios';
import { URLAPI } from '../redux/actions/types';
import numeral from 'numeral'

// NANTI KALAU ADD PRODUCT DI LOOPING 





class userStore extends React.Component{
    state = {
        modalOpen : false,
        imagenum : [true],
        userStore : [],
        storeProduct : [],
        categorylist : []
    }

    componentDidMount(){
        // KETIKA MASUK LEWAT LINK
        this.getCategoryList()
        this.getStoreInfo()
        this.getProductStore()
    }

    componentWillReceiveProps(){
        console.log("MASUK")
        // KETIKA RELOG f5
        this.getStoreInfo()
        this.getProductStore()
        
    }
    getCategoryList = () =>{
        Axios.get(URLAPI + '/category/getcategory')
        .then((res)=>{
            this.setState({
                categorylist : res.data
            })
         
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    getStoreInfo = () => {
        
        if(this.props.userdata.userid){
            console.log(this.props.userdata.userid)
            Axios.get(URLAPI+'/shop/getshopinfo/'+this.props.userdata.userid)
            .then((res)=>{
                console.log(res.data)
                this.setState({
                    userStore : res.data
                })
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
    getProductStore = () => {
        
        if(this.props.userdata.userid){
            console.log(this.props.userdata.userid)
            Axios.get(URLAPI+'/shop/getproductshop/'+this.props.userdata.userid)
            .then((res)=>{
                console.log(res.data)
                this.setState({
                    storeProduct : res.data
                })
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    modalOpen =()=>{
        this.setState({
            modalOpen :true,
        
        })
    }

    closeModal = () =>{
        this.setState({
            modalOpen : false,
            imagenum : [true]
            
         
        })
    }

    

    renderCategoryList = () =>{
        if(this.state.categorylist.length === 0 ){
            return (
              <option value="" disabled selected hidden>Loading...</option>
            )
          }else{
            var list = this.state.categorylist.map((val)=>{
              return (
                  <option value={val.name}> {val.name} </option>
              )
          })
          
          return list 
          }
    }

    renderShopHeader = () => {
        if(this.state.userStore.length !== 0 ){
            return (
                <div className="storecard p-3 mb-5">
                    <div className="row">
                        <div className="col-md-1 p-0" >
                            <img src={URLAPI + this.state.userStore[0].shopimage} alt="userprofile" className="storeimage"/>
                        </div>
                        <div className="col-md-3 subtitletext text-center" style={{paddingTop : "28px"}}>
                            <div className="mb-2">{this.state.userStore[0].name}</div>
                            <div style={{fontSize : "14px"}}>
                                <FontAwesomeIcon size="1x"  icon={faQuoteLeft} />
                                &nbsp;&nbsp; {this.state.userStore[0].description} &nbsp;&nbsp;
                                <FontAwesomeIcon size="1x"  icon={faQuoteRight}/>
                            </div>
                        </div>
                        <div className="col-md-3 subtitletext  p-3 text-center">
                            <div className="mb-2"> <FontAwesomeIcon size="2x"  icon={faHourglassHalf} ></FontAwesomeIcon></div>
                            <Link to="/userhistory">
                            <input type="button" className="btn form-control btn-primary navbartext" value="$ Transaction "/>
                            </Link>
                        </div>
                        <div className="col-md-1 subtitletext  p-3">
                        
                        </div>
                        <div className="col-md-2 subtitletext  text-center p-3"style={{fontSize : "17px"}}>
                        <div className="mb-2"><FontAwesomeIcon size="2x"  icon={faLuggageCart} ></FontAwesomeIcon></div>
                            <div className="mb-1" style={{color : '#83897D'}} > No. of Product</div>
                            <div> {this.state.storeProduct.length} </div>
                        </div>
                        <div className="col-md-2 subtitletext  text-center p-3"style={{fontSize : "17px"}}>
                        <div className="mb-2"><FontAwesomeIcon size="2x"  icon={faStoreAlt} ></FontAwesomeIcon></div>
                            <div className="mb-1" style={{color : '#83897D'}}> Product Sold</div>
                            <div> 0 </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    // RENDER TABLE PRODUCT 

    renderProductTable = () =>{
    
        console.log(this.state.storeProduct.length)
        if(this.state.storeProduct.length !== 0){
            var jsx = this.state.storeProduct.map((prd, i)=>{
                return(
                    <tr>
                        <th scope="row">{i+1}</th>
                        <td>
                            <img src="" alt=""></img>
                        </td>
                        <td>{prd.name}</td>
                        <td>{"Rp  " + numeral(prd.price).format(0,0)}</td>
                        <td>{prd.cat}</td>
                        <td>{prd.rating+"/5"}</td>
                        <td>
                            <input type="button" className="btn btn-danger mr-3 navbartext" value="delete" style={{width : "95px"}}/>
                            <input type="button" className="btn btn-primary navbartext" value="edit" style={{width : "95px"}}/>
                        </td>
                    </tr>
                )
            })
            return jsx
        }
    }

    previewFile = (index) => {
        var preview = document.getElementById('primg'+index);
        var file    = document.getElementById('productimage'+index).files[0];
  
       
        var reader  = new FileReader();
        console.log(reader)
      
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
                <div className="col-md-2" >
                    <div className="d-flex flex-column justify-content-center"> 
                        <img id={`primg${index + 1}`} src="#" alt="image preview" height="250" />   
                        <div>
                            <input type="file" id={`productimage${index + 1}`} ref={"prdimg"+(index+1)} className="form-control form-control-lg mb-3 " onChange={() => this.previewFile(index+1)}/>
                        </div> 
                    </div>
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

    onClickAddProduct = () =>{
        var name = this.refs.prdname.value
        var price = this.refs.prdprice.value
        var description = this.refs.prddesc.value
        var cat_name = this.refs.prdgenre.value
        var shop_id = this.state.userStore[0].userid

        // Multiple Images
        var images = []
        for(var i = 0; i<this.state.imagenum.length-1; i++){
            if(document.getElementById(`productimage${i+1}`).files[0]){
                images.push(document.getElementById(`productimage${i+1}`).files[0])
            }else{
                
            }
        }
        // var image = document.getElementById('productimage1').files[0]
        // console.log(image)
        // console.log(name, price, description, cat_name, shop_id)
         // console.log(image)
        // IMG TO BE CONTINUED

       // yang harus di push
       
        
        var data = {
            name,
            price,
            cat_name,
            shop_id,
            description,
            rating : 5 //default rating
        }


        if(images){
            var formData = new FormData()
            var headers ={
                headers : 
                {'Content-Type' : 'multipart/form-data'}
            }
            for(var y = 0; y<images.length; y++){
                console.log(images[y])
                console.log("Masuk images"+y)
                formData.append('image', images[y]) 
            }
            formData.append('data', JSON.stringify(data))
            console.log(data)
            console.log(formData)
            Axios.post(URLAPI + '/product/addproduct', formData, headers)
            .then((res)=>{
                console.log(res.data)
                
                return window.alert("Add Product Berhasil")
            })
            .catch((err)=>{
                console.log(err)
            })
        }
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
                            <input type="text" ref="prdname" className="form-control form-control-lg mb-3 "/>
                            
                            <div className="subtitletext mb-3">
                                Product Genre
                            </div>
                            <select  className="mb-5" required id = "myList" ref="prdgenre" className="form-control mb-2" placeholder="Genre">
                                    <option value="" disabled selected hidden>Choose Genre</option>
                                    {this.renderCategoryList()}
                                    
                            </select>
                            <div className="subtitletext mb-3">
                                Product Description
                            </div>
                            <input type="text" ref="prddesc" className="form-control form-control-lg mb-3 "/>
                            <div className="subtitletext mb-3">
                                Product Price
                            </div>
                            <input type="number" ref="prdprice" className="form-control form-control-lg mb-3 "/>
                     
                            <div className="subtitletext mb-3">
                                Product Image (up to 5)
                            </div>

                            <div className="row">

                                {this.printInputFile()}
                            </div>
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
                            <input type="button" className="btn btn-lg btn-success navbartext mb-2 p-2" value=" + Submit Product" onClick={()=>this.onClickAddProduct()}/>
                        </ModalFooter>
                    </Modal>
                   
                    {this.renderShopHeader()}
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
                                <th>Categories</th>
                                <th>Ratings</th>
                                <th>Settings</th>
                            </tr>
                            </thead>
                            <tbody>
                           
                            {this.renderProductTable()}
                            {/* <tr>
                                <th scope="row">1</th>
                                <td>
                                    <img src="" alt=""></img>
                                </td>
                                <td>Mark</td>
                                <td>Otto</td>
                         
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
                           
                                <td>
                                    <input type="button" className="btn btn-danger mr-3 navbartext" value="delete" style={{width : "95px"}}/>
                                    <input type="button" className="btn btn-primary navbartext" value="edit" style={{width : "95px"}}/>
                                </td>
                            </tr> */}
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
                {/* <Footer /> */}
            </div>
        )
    }
}

const mapStateToProps= (state)=>{
    return{ 
      userdata : state.userdata,
    }
}

export default connect(mapStateToProps, null)(userStore);