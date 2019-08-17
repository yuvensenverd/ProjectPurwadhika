import React from 'react'
import {Link} from 'react-router-dom'
import { Table } from 'reactstrap'
import { connect } from 'react-redux'
import Axios from 'axios';
import { URLAPI, PATHDEFAULTPRD } from '../redux/actions/types';


class AdminPage extends React.Component{
    state = {
        showTable : null,
        data : [],
        change : false,
        editnum : null
        // 1 = show product
        // 2 = show banner (carousel)
        // 3 = show category
        // 4 = show user 
    }

    componentDidMount = () =>{

    }



    adminGetUser = () =>{

    if(this.state.change === true){
        Axios.get(URLAPI + '/user/adminuser')
        .then((res)=>{
            console.log(res.data)
            this.setState({
                data : res.data,
                change : false
    
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
         
    }

    adminGetCategories = () =>{
       if(this.state.change === true){

           Axios.get(URLAPI + '/category/getcategory')
           .then((res)=>{
               console.log(res.data)
               this.setState({
                   data : res.data,
                   change : false
               })
           })
           .catch((err)=>{
               console.log(err)
           })
       }
        
    }

    adminGetBanner = () => {
        if(this.state.change === true){

            Axios.get(URLAPI + '/banner/getbanner')
            .then((res)=>{
                console.log(res.data)
                this.setState({
                    data : res.data,
                    change : false
     
                })
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    adminGetProduct = () =>{
        if(this.state.change === true){

            Axios.get(URLAPI + '/product/getproduct')
            .then((res)=>{
                console.log(res.data)
                this.setState({
                    data : res.data,
                    change : false
     
                })
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    renderTableData = () =>{
        if(this.state.showTable === 1){
            this.adminGetProduct()
            // setstate loading === true
            // Function Axios , then setstate data and loading === false
            // if loading === false , then state.data di map
            // Option 2 , bikin rendertabledata for header jg 
            var jsx =  this.state.data.map((prd, i)=>{
                return (
                    <tr>
                        <td>{i+1}</td>
                        <td>{prd.name}</td>
                        <td>{prd.price}</td>
                        <td>
                            <img
                             src={prd.images ?
                                URLAPI+ prd.images.split(',')[0]
                                :
                                URLAPI + PATHDEFAULTPRD
                                } 
                             
                             alt="" width='100px'>
                             </img>
                        </td>
                        <td>{prd.category}</td>
                        <td>{prd.description}</td>
                        <td>{prd.shopname}</td>
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
        if(this.state.showTable === 2){
                this.adminGetBanner()
                console.log("masuk")
                var jsx =  this.state.data.map((banner, i)=>{
                    return (
                        <tr>
                            <td>{i+1}</td>
                            <td>
                                <img src="" alt="image"/>
                            </td>
                            <td>
                                <input type="button" className="btn btn-danger mr-3 navbartext" value="delete" style={{width : "95px"}}/>
                                <input type="button" className="btn btn-primary navbartext" value="edit" style={{width : "95px"}}/>
                            </td>
                        </tr>
                    )
                })
              
                return jsx   
        }
        if(this.state.showTable === 3){
                
                this.adminGetCategories()
                console.log("masuk category")
                var jsx =  this.state.data.map((cat, i)=>{
                    if(i === this.state.editnum){

                        return (
                            <tr>
                                <td>{i+1}</td>
                                <td>
                                    <input type="text" ref="editnamecat" className="form-control" defaultValue={cat.name}/>
                                </td>
                                <td>
                                    {/* <img src={URLAPI + cat.image} alt="image" width="100px"/> */}
                                    <input type="file" id="editfilecat" ref="editfilecatref" />
                                </td>
                                <td>
                                    <input type="button" className="btn btn-danger mr-3 navbartext" value="cancel" onClick={()=>this.setState({editnum : null})} style={{width : "95px"}}/>
                                    <input type="button" className="btn btn-success navbartext" value="save" onClick={()=>this.onClickSaveEditCategory(cat.id)} style={{width : "95px"}}/>
                                </td>
                            </tr>
                        )
                    }
                    return (
                        <tr>
                                <td>{i+1}</td>
                                <td>{cat.name}</td>
                                <td>
                                    <img src={URLAPI + cat.image} id="idimagecat" alt="image" width="100px"/>
                                </td>
                                <td>
                                    <input type="button" className="btn btn-danger mr-3 navbartext" value="delete"  style={{width : "95px"}}/>
                                    <input type="button" className="btn btn-primary navbartext" value="edit" onClick={()=>this.setState({editnum : i})} style={{width : "95px"}}/>
                                </td>
                            </tr>
                    )
                })
              
                return jsx   
            
        }
        if(this.state.showTable === 4){
        
                this.adminGetUser()
                console.log("masuk")
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
        return (
            <h1>No Table Are Selected!</h1>
        )
    }

    renderTableHead = () =>{
        // NANTI JGN DDITEMBAK LANGSUNG COLUMNYA
        if(this.state.showTable === 1){
    
            return(
                <tr className="font-weight-bold">
                    <td>NO</td>
                    <td>NAME</td>
                    <td>PRICE</td>
                    <td>CATEGORY</td>
                    <td>DESC</td>
                    <td>SHOPNAME</td>
                    <td>RATING</td>
                    <td>IMAGE</td>
                    <td>SETTINGS</td>
                </tr>
            )
        }
        if(this.state.showTable === 2){
            return(
                <tr className="font-weight-bold">
                    <td>NO</td>
                    <td>IMAGE</td>
                    <td>SETTINGS</td>
                </tr>
            )
        }
        if(this.state.showTable === 3){
            return(
                <tr className="font-weight-bold">
                    <td>NO</td>
                    <td>CATEGORIES</td>
                    <td>IMAGE</td>
                    <td>SETTINGS</td>
                </tr>
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

    renderTableFoot = () =>{
        if(this.state.showTable === 3){
            return(
                <tr>
                    <td> <img id="primg" src="#" alt="image preview" height="150" /></td>
                    <td>
                        <input type="text" id="cattextid" ref="catinput" className="form-control" placeholder="Category Name.." />
                    </td>
                    <td>
                        <input type="file" id="catimage" ref="catimg"  onChange={() => this.previewFile()}/>
                    </td>
                    <td>
                        <input type="button" className="btn btn-success" value="ADD" onClick={()=>this.onClickAddCategory()}/>
                    </td>
                </tr>
            )
        }

        return (
            <div></div>
        )
    }

    previewFile = () => {
        var preview = document.getElementById('primg');
        var file    = document.getElementById('catimage').files[0];
  
       
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



    changeTable = (i) => {
        if(i !== this.state.showTable){
            this.setState({
                change : true,
                showTable : i
            })
        }
    }

    onClickSaveEditCategory = (catid) =>{
    
        console.log("Masuk Edit")
        var formData = new FormData()
        var headers ={
            headers : 
            {'Content-Type' : 'multipart/form-data'}
        }
        
        console.log(document.getElementById('editfilecat').files[0])

        var data = { 
            name : this.refs.editnamecat.value
        }
        console.log(data)
        console.log(catid) //dapet

        formData.append('image', document.getElementById('editfilecat').files[0]) 
        formData.append('data', JSON.stringify(data))
        

        // AXIOS >> Update Path Image if image exist, Write path 
        Axios.post(URLAPI+`/category/editcategory/${catid}`,formData, headers )
        .then((res)=>{
            console.log("Berhasil update category")
            console.log(res.data) // array of object
            this.setState({
                change : true,
                data : res.data,
                editnum : null
            })
            // reset input
            window.alert("Berhasil edit Category")  
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }

    onClickAddCategory = () => {

        if(document.getElementById('catimage').files[0]){
            console.log("Masuk")
            var formData = new FormData()
            var headers ={
                headers : 
                {'Content-Type' : 'multipart/form-data'}
            }
            console.log(document.getElementById('catimage').files[0])

            var data = { 
                name : this.refs.catinput.value
            }
            console.log(data)

            formData.append('image', document.getElementById('catimage').files[0]) 
            formData.append('data', JSON.stringify(data))
            

            // AXIOS >> Update Path Image if image exist, Write path 
            Axios.post(URLAPI+'/category/addcategory',formData, headers )
            .then((res)=>{
                console.log("Berhasil update")
                console.log(res.data) // array of object
                this.setState({
                   change : true,
                   data : res.data
                })
                // reset input
                window.alert("Berhasil Add Category")
                document.getElementById('primg').src = ""
                document.getElementById('cattextid').value =""
                document.getElementById('catimage').files[0]=null
                document.getElementById('catimage').value=null

               

                
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    render(){
        return(
            <div className="p-t-100 p-l-5 p-r-5 ">
                <div className="row mb-5">
                    <div className="col-md-3 text-center">
                        <input type="button" className="btn btn-info navbartext" value="PRODUCTS" style={{width : "200px"}} onClick={()=>this.changeTable(1)}/>
                    </div>
                    <div className="col-md-3 text-center">
                        <input type="button" className="btn btn-danger navbartext" value="BANNER" style={{width : "200px"}} onClick={()=>this.changeTable(2)}/>
                    </div>
                    <div className="col-md-3 text-center">
                        <input type="button" className="btn btn-primary navbartext" value="CATEGORIES" style={{width : "200px"}} onClick={()=>this.changeTable(3)}/>
                    </div>
                    <div className="col-md-3 text-center">
                        <input type="button" className="btn btn-success navbartext" value="USER" style={{width : "200px"}} onClick={()=>this.changeTable(4)}/>
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
                            {this.renderTableFoot()}
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