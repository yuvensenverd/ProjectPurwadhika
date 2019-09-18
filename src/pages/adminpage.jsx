import React from 'react'
import {Link} from 'react-router-dom'
import { Table } from 'reactstrap'
import { connect } from 'react-redux'
import Axios from 'axios';
import { URLAPI, PATHDEFAULTPRD } from '../redux/actions/types';
import numeral from 'numeral'



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
        // 5 = show transaction (manual saja)
    }



    adminGetUser = () =>{

    if(this.state.change === true){ // untuk trigger function
        Axios.get(URLAPI + '/user/adminuser')
        .then((res)=>{
            console.log('get user')
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
       if(this.state.change === true){ // untuk trigger function

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
        if(this.state.change === true){ // untuk trigger function

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

    adminGetTransfer = () =>{
        if(this.state.change === true){ // untuk trigger function
            const token = localStorage.getItem('token')
            const headers = {
                headers: {
                    'Authorization' : `${token}`
                }
            }
            Axios.get(URLAPI + '/transaction/manualtransfer', headers)
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
        if(this.state.change === true){ // untuk trigger function

            Axios.get(URLAPI + '/product/getproduct?pagenumber=all')
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

    onDeleteProduct = (id) =>{
        var confirm = window.confirm("Are you sure you want to delete this item from your store ?")
        if(confirm){
            const token = localStorage.getItem('token')
            const headers = {
                headers: {
                    'Authorization' : `${token}`
                }
            }

            Axios.get(URLAPI + '/product/deleteproduct/' + id, headers) // set isdeleted product = 1
            .then((res)=>{
       
                this.setState({
                    change : true // supaya re-get product
                })
                window.alert("Delete Product Success!")
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    renderTableData = () =>{
        if(this.state.showTable === 1){
            this.adminGetProduct()
            var jsx =  this.state.data.map((prd, i)=>{
                return (
                    <tr>
                        <td>{i+1}</td>
                        <td>{prd.name}</td>
                        <td> {"Rp. " + numeral(prd.price).format(0,0)}</td>
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
                        <td>{prd.shopname}</td>
                        <td>{prd.avgrating ? parseFloat(prd.avgrating).toFixed(2)+ ' / 5' : 'Not Reviewed Yet'}</td>
                        <td>{prd.ReviewCount}</td>
                 
                        
                        <td>
                            <input type="button" className="btn btn-danger mr-3 navbartext" value="delete" style={{width : "95px"}} onClick={()=>this.onDeleteProduct(prd.id)}/>
                           
                        </td>
                    </tr>
                )
            })
          
            return jsx   
        }
        if(this.state.showTable === 2){
                this.adminGetBanner()
                var jsx =  this.state.data.map((banner, i)=>{
                    return (
                        <tr>
                            <td>{i+1}</td>
                            <td>
                                <img src={URLAPI + banner.image} width="200px" alt="image"/>
                            </td>
                            <td>
                                <input type="button" className="btn btn-danger mr-3 navbartext" value="delete" style={{width : "95px"}} onClick={()=>this.onClickDeleteBanner(banner.idbanner)}/>
                            </td>
                        </tr>
                    )
                })
              
                return jsx   
        }
        if(this.state.showTable === 3){
                
                this.adminGetCategories()
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
                                <input type="button" className="btn btn-primary navbartext" value="edit" onClick={()=>this.setState({editnum : i})} style={{width : "95px"}}/>
                            </td>
                        </tr>
                    )
                })
              
                return jsx   
            
        }
        if(this.state.showTable === 4){
        
                this.adminGetUser()
                return this.state.data.map((user, i)=>{
                    if(i !== this.state.editnum){

                        return (
                            <tr>
                                <td>{user.userid}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.saldo}</td>
                                <td>{user.status}</td>
                                <td>
                                    <input type="button" className="btn btn-primary navbartext" value="edit" style={{width : "95px"}}  onClick={()=>this.setState({editnum : i})}/>
                                </td>
                            </tr>
                        )
                    }else {
                        return (
                            <tr>
                                <td>{i+1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                <select  className="mb-5" required id = "myList" ref="edituserrole" className="form-control mb-2" placeholder="Status">
                                {user.role === 'Admin' ? <option value="Admin" selected >Admin</option> : <option value="Admin" >Admin</option>}
                                {user.role === 'User' ? <option value="User" selected >User</option> : <option value="User" >User</option>}
                                </select>
                                </td>
                                <td>
                                <input type="number" defaultValue={user.saldo} ref="editusersaldo" className="form-control"/>
                                </td>
                                <td>
                                <select  className="mb-5" required id = "myList" ref="edituserstatus" className="form-control mb-2" placeholder="Status">
                                {user.status === 'Verified' ? <option value="Verified" selected >Verified</option> : <option value="Verified" >Verified</option>}
                                {user.status === 'Unverified' ? <option value="Unverified" selected >Unverified</option> : <option value="Unverified" >Unverified</option>}
                                    
                                    
                                </select>
                                </td>
                                <td>
                                    <input type="button" className="btn btn-success mr-3 navbartext" value="save" style={{width : "95px"}} onClick={()=>this.onClickSaveUser(user.userid)}/>
                                    <input type="button" className="btn btn-danger navbartext" value="cancel" style={{width : "95px"}}  onClick={()=>this.setState({editnum : null})} />
                                </td>
                            </tr>
                        )
                    }
                }   
                )}
        if(this.state.showTable === 5){
            this.adminGetTransfer()
            var jsx =  this.state.data.map((trx, i)=>{
                return (
                    <tr>
                        <td>{i+1}</td>
                        <td>{trx.transactiondate.split('T')[0]}</td>
                        <td>{"Rp. " + numeral(trx.totalprice).format(0,0)}</td>
                        <td>{trx.userid}</td>
                        <td>
                            <img src={URLAPI + trx.imagepath} width="200px" alt="image"/>
                        </td>
                        <td>
                            <input type="button" className="btn btn-info mr-3 navbartext" value="APPROVE" style={{width : "120px"}} onClick={()=>this.approveTransaction(trx.id)}/>
                            <input type="button" className="btn btn-danger mr-3 navbartext" value="REJECT" style={{width : "95px"}} onClick={()=>this.rejectTransaction(trx.id)}/>
                        </td>
                    </tr>
                )
            })
            
            return jsx   
    }
        return (
            <div></div>
        )
    }

    renderTableHead = () =>{
        // PRINT HEAD SESUAI DENGAN DATA YANG DIAMBIL
        if(this.state.showTable === 1){
    
            return(
                <tr className="font-weight-bold">
                    <td>NO</td>
                    <td>NAME</td>
                    <td>PRICE</td>
                    <td>IMAGE</td>
                    <td>CATEGORY</td>
                    <td>SHOPNAME</td>
                    <td>RATING</td>
                    <td>NO OF REVIEW</td>
                  
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
                    <td>USERID</td>
                    <td>USERNAME</td>
                    <td>EMAIL</td>
                    <td>ROLE</td>
                    <td>SALDO</td>
                    <td>STATUS</td>
                    <td>SETTINGS</td>
                </tr>
            )
        }
        if(this.state.showTable === 5){
            return(
                <tr className="font-weight-bold">
                    <td>NO</td>
                    <td>TRANSACTION DATE</td>
                    <td>TOTAL PRICE</td>
                    <td>USERID</td>
                    <td>IMAGE</td>
                    <td>ACTION</td>
                </tr>
            )
        }
        return (
            <h1>No Table Are Selected!</h1>
        )
        
    }

    renderTableFoot = () =>{
        if(this.state.showTable === 2){ // BANNER
            return(
                <tr>
                    <td> <img id="imgpreview" src="#" alt="image preview" height="150" /></td>
                    <td>
                        <input type="file" id="imagefile" ref="catimg"  onChange={() => this.previewFile()}/>
                    </td>
                    <td>
                        <input type="button" className="btn btn-success" value="ADD" onClick={()=>this.onClickAddBanner()}/>
                    </td>
                </tr>
            )
        }
        if(this.state.showTable === 3){ // CATEGORY
            return(
                <tr>
                    <td> <img id="imgpreview" src="#" alt="image preview" height="150" /></td>
                    <td>
                        <input type="text" id="cattextid" ref="catinput" className="form-control" placeholder="Category Name.." />
                    </td>
                    <td>
                        <input type="file" id="imagefile" ref="catimg"  onChange={() => this.previewFile()}/>
                    </td>
                    <td>
                        <input type="button" className="btn btn-success" value="ADD" onClick={()=>this.onClickAddCategory()}/>
                    </td>
                </tr>
            )
        }
        // YANG GAK PUNYA FOOTER 
        return (
            <div></div>
        )
    }

    previewFile = () => {

        // UNTUK PREVIEW IMAGE SEBELUM DISUBMIT
        var preview = document.getElementById('imgpreview');
        var file    = document.getElementById('imagefile').files[0];
  
       
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



    changeTable = (i) => {
        // UNTUK MENTRIGGER FUNCTION GET()
        if(i !== this.state.showTable){
            this.setState({
                change : true,
                showTable : i,
                editnum : null,
                data : []
            })
        }
    }

    onClickSaveEditCategory = (catid) =>{
    
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
                // data : res.data,
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

        if(document.getElementById('imagefile').files[0]){
            var formData = new FormData()
            var headers ={
                headers : 
                {'Content-Type' : 'multipart/form-data'}
            }
    

            var data = { 
                name : this.refs.catinput.value
            }
     

            formData.append('image', document.getElementById('imagefile').files[0]) 
            formData.append('data', JSON.stringify(data))
            

            // AXIOS >> Update Path Image if image exist, Write path 
            Axios.post(URLAPI+'/category/addcategory',formData, headers )
            .then((res)=>{
                console.log("Berhasil update")
                console.log(res.data) // array of object
                this.setState({
                   change : true // otomatis refresh, get data baru
                //    data : res.data
                })
                // reset input
                window.alert("Berhasil Add Category")
                document.getElementById('primg').src = ""
                document.getElementById('cattextid').value =""
                document.getElementById('imgpreview').src = ''
                document.getElementById('imagefile').value = ''

               

                
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    onClickAddBanner = () => {
        
        console.log("Masuk Add Banner")
        if(document.getElementById('imagefile').files[0]){
        var formData = new FormData()
        var headers ={
            headers : 
            {'Content-Type' : 'multipart/form-data'}
        }
        
        console.log(document.getElementById('imagefile').files[0])

        var data = {}
        console.log(data)
       

        formData.append('image', document.getElementById('imagefile').files[0]) 
        formData.append('data', JSON.stringify(data))
        

        // AXIOS >> Update Path Image if image exist, Write path 
        Axios.post(URLAPI+`/banner/addbanner`,formData, headers )
        .then((res)=>{
            console.log(res.data) // array of object
            this.setState({
                change : true,
                // data : res.data,
                editnum : null
            })
            // reset input
            document.getElementById('imgpreview').src = ''
            document.getElementById('imagefile').value = ''
            window.alert("Berhasil Add Banner")  
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    }

    onClickDeleteBanner = (id) =>{

        var confirm = window.confirm("are you sure you want to delete this banner?")
        if(confirm){

            console.log(id)
            Axios.delete(URLAPI + '/banner/deletebanner/'+id)
            .then((res)=>{
                this.setState({
                    change : true,
                    // data : res.data,
                    editnum : null
                })
                window.alert("Berhasil Delete Banner")  
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    onClickSaveUser = (id) =>{
        var saldo = parseInt(this.refs.editusersaldo.value)
        var role = this.refs.edituserrole.value
        var status = this.refs.edituserstatus.value
        console.log(id)
        const data = {
            saldo,
            role, 
            status
        }
        console.log(data)
        const token = localStorage.getItem('token')
        const headers = {
            headers: {
                'Authorization' : `${token}`
            }
        }
        Axios.put(URLAPI+`/user/adminedit/${id}`, data, headers)
        .then((res)=>{
            this.setState({
                change : true,
                // data : res.data,
                editnum : null
            })
            window.alert('Edit User Success')
        })
        .catch((err)=>{
            console.log(err.response)
        })
    }

    approveTransaction = (id) =>{
        var confirm = window.confirm("Are you sure you want to approve the transaction ? ")
        if(confirm){
            const token = localStorage.getItem('token')
            const headers = {
                headers: {
                    'Authorization' : `${token}`
                }
            }
            Axios.get(URLAPI + '/transaction/adminapprove/' + id, headers)
            .then((res)=>{
                this.setState({
                    change : true,
                    editnum : null
                })
                window.alert('Transaction Approved')
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    } 

    rejectTransaction = (id) =>{
        var confirm = window.confirm("Are you sure you want to reject the transaction ? ")
        if(confirm){
            const token = localStorage.getItem('token')
            const headers = {
                headers: {
                    'Authorization' : `${token}`
                }
            }
            Axios.get(URLAPI + '/transaction/adminreject/' + id, headers)
            .then((res)=>{
                this.setState({
                    change : true,
                    editnum : null
                })
                window.alert('Transaction Rejected Success')
            })
            .catch((err)=>{
                console.log(err)
            })
            
        }
    }

    render(){
        if(this.props.userdata.CHECK && this.props.userdata.ROLE !== 'Admin'){
            console.log(this.props.userdata)
            return(
                <div>
                <div className="p-t-100"> You Do not have Permission to access admin page</div>
                <Link className="btn btn-success" to="/">Go Back</Link>
                </div>
            )
        }
        if(this.props.userdata.CHECK && this.props.userdata.ROLE === 'Admin'){

            return(
                <div className="p-t-100 p-l-3 p-r-3 ">
                    <div className="row mb-5 ml-5">
                        <div className="col-md-2 text-center mr-2 ">
                            <input type="button" className="btn btn-info navbartext" value="PRODUCTS" style={{width : "200px"}} onClick={()=>this.changeTable(1)}/>
                        </div>
                        <div className="col-md-2 text-center mr-2">
                            <input type="button" className="btn btn-danger navbartext" value="BANNER" style={{width : "200px"}} onClick={()=>this.changeTable(2)}/>
                        </div>
                        <div className="col-md-2 text-center mr-2">
                            <input type="button" className="btn btn-primary navbartext" value="CATEGORIES" style={{width : "200px"}} onClick={()=>this.changeTable(3)}/>
                        </div>
                        <div className="col-md-2 text-center mr-2">
                            <input type="button" className="btn btn-success navbartext" value="USER" style={{width : "200px"}} onClick={()=>this.changeTable(4)}/>
                        </div>
                        <div className="col-md-2 text-center mr-2">
                            <input type="button" className="btn btn-dark navbartext" value="CONFIRM TRANSACTION" style={{width : "350px"}} onClick={()=>this.changeTable(5)}/>
                        </div>
                    </div>
                    <div className="mycontainer p-l-80 p-r-80">
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
        return <div/>
    }
}

const mapStateToProps= (state)=>{
    return{ 
      userdata : state.userdata
    }
}

export default connect(mapStateToProps, null)(AdminPage);