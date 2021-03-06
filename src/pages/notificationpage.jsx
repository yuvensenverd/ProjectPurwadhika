import React from 'react'
import numeral from 'numeral'
import Axios from 'axios';
import { URLAPI, PATHDEFAULTCARTEMPTY } from '../redux/actions/types';
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBackward, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router'
import { updateNotification, loadingFalse, loading } from '../redux/actions/index'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import ReactLoading from 'react-loading'
import queryString from 'query-string'
import { isNull } from "util";
import SweetAlert from 'react-bootstrap-sweetalert'



class NotificationPage extends React.Component{
    state = {
        data : [],
        finishload : false,
        status : '',
        modalOpen : false,
        itemindex : null,
        starrating : 0,
        idproductSelected : null,
        show : false
    }

    closeModal = () =>{
        this.setState({
            modalOpen : false,
            starrating : 0,
            itemindex : null,
            idproductSelected : null
        })
    }

    componentWillReceiveProps(){
    
        const values = queryString.parse(this.props.location.search)
        if(this.props.userdata.userid && !this.props.userdata.finishload){

            if(values.type){
                if(values.type === "confirmation"){
                    this.getWaitingConfirmation()
                }else if(values.type === "confirmed"){
                    this.getConfirmedOrder()
                }else if(values.type === "cancelled"){
                    this.getCancelledOrder()
                }else{
                    this.getWaitingConfirmation()
                }
            }else{
                this.getWaitingConfirmation()
            }
        }
        
    }
    
    componentDidMount(){
        const values = queryString.parse(this.props.location.search)
        console.log(values)
        if(this.props.userdata.userid){
            if(values.type){
                if(values.type === "confirmation"){
                    this.getWaitingConfirmation()
                }else if(values.type === "confirmed"){
                    this.getConfirmedOrder()
                }else if(values.type === "cancelled"){
                    this.getCancelledOrder()
                }else{
                    this.getWaitingConfirmation()
                }
            }else{
                this.getWaitingConfirmation()
            }

        }
       
    }

    getCancelledOrder = () =>{
        console.log('cancelled')
        const token = localStorage.getItem('token')
        const headers = {
            headers: {
                'Authorization' : `${token}`
            }
        }
        console.log(this.props.userdata.userid)
        Axios.get(URLAPI + '/transaction/getcancelled/' + this.props.userdata.userid, headers)
        .then((res)=>{
            this.setState({
                data : res.data,
                finishload : true,
                datatype : 'Cancelled',
                itemindex : null
            })
            console.log(this.state.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    getConfirmedOrder = () =>{
        const token = localStorage.getItem('token')
        const headers = {
            headers: {
                'Authorization' : `${token}`
            }
        }
        Axios.get(URLAPI + '/transaction/getconfirmed/' + this.props.userdata.userid, headers)
        .then((res)=>{
            this.setState({
                data : res.data,
                finishload : true,
                datatype : 'Confirmed',
                itemindex : null

            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
       
    getWaitingConfirmation = () =>{
        // axios from transaction 
        console.log("Masuk")
        const token = localStorage.getItem('token')
        const headers = {
            headers: {
                'Authorization' : `${token}`
            }
        }
        console.log(this.props.userdata.userid)
        Axios.get(URLAPI + '/transaction/getunconfirmed/' + this.props.userdata.userid, headers)
        .then((res)=>{
            this.setState({
                data : res.data,
                finishload : true,
                datatype : 'Unconfirmed',
                itemindex : null
            })
            console.log(this.state.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    changeRating( newRating ) {
        console.log(newRating)
        this.setState({
            starrating : newRating
        })
      }

    renderData = () =>{
        if(this.state.finishload === true && this.state.datatype === 'Unconfirmed' && this.state.data.length !== 0){
                var jsx = this.state.data.map((item, i)=>{
                    return (
                        <div>
                            <div className="storecard p-3 mb-0 " style={{height : "130px"}}>
                                <div className="row">
                                    
                                    <div className="col-md-1  pr-5 pb-2" >
                                        <img src={URLAPI + item.images.split(',')[0]} alt="userprofile" className="" width="80px" height="80px"/>
                                    </div>
                                    <div className="col-md-4 pt-3 pl-5 d-flex flex-column">
                                        <h4 className="font-weight-bold subtitletext">{item.shop}</h4>
                                        <h5>{item.name + ` x ${item.qty} pcs`}</h5>
                                    </div>
                                    <div className="col-md-2 pt-4 d-flex flex-column">
                                       
                                            {/* <div>{item.name}</div> */}
                                            <h5 className="font-weight-bold  text-secondary">{"Total Price :"}</h5>
                                            <div className="itempricecart">{'Rp ' +numeral(item.qty * item.price).format(0,0)}</div>
                            
                                    </div>
    
                                    <div className="col-md-3 subtitletext  text-center pt-4 d-flex flex-row ">
                                     
                                        <input type="text" className="form-control" value="Waiting for confirmation..."/>
                                    </div>
                                    <div className="col-md-2 subtitletext  text-center pt-3 d-flex flex-column ">
                                        <p>{"transaction date"}</p>
                                        <h5>{item.transactiondate.split('T')[0]}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                return jsx
          
        }
        if(this.state.finishload === true && this.state.datatype === 'Confirmed' && this.state.data.length !== 0){
            
                
                var jsx = this.state.data.map((item, i)=>{
                    return (
                        <div>
                            <div className="storecard p-3 mb-0 " style={{height : "130px"}}>
                                <div className="row">
                                    
                                    <div className="col-md-1  pr-5 pb-2" >
                                        <img src={URLAPI + item.images.split(',')[0]} alt="userprofile" className="" width="80px" height="80px"/>
                                    </div>
                                    <div className="col-md-4 pt-3 pl-5 d-flex flex-column">
                                        <h4 className="font-weight-bold subtitletext">{item.shop}</h4>
                                        <h5>{item.name + ` x ${item.qty} pcs`}</h5>
                                    </div>
                                    <div className="col-md-3 subtitletext  text-center pt-4 d-flex flex-row ">
                                     
                                        <input type="text" className="form-control" value="Confirmed by Shop"/>
                                    </div>
                                    <div className="col-md-2 subtitletext  text-center pt-3 d-flex flex-column ">
                                        <p>{"transaction date"}</p>
                                        <h5>{item.transactiondate.split('T')[0]}</h5>
                                    </div>
                                    <div className="col-md-2 subtitletext  text-center  d-flex flex-column  ">
                                        <h5> Product Recieved ?</h5>
                                        <div>
                                        <input type="button" className="btn btn-secondary mr-3" value="Yes" onClick={()=>this.setState({
                                            itemindex : i,
                                            modalOpen : true,
                                            idproductSelected : item.productid
                                        })}/>
                               
                                        </div>
    
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                return jsx
            
        }
        if(this.state.finishload === true && this.state.datatype === 'Cancelled' && this.state.data.length !== 0){
           
                
                var jsx = this.state.data.map((item, i)=>{
                    return (
                        <div>
                            <div className="storecard p-3 mb-0 " style={{height : "130px"}}>
                                <div className="row">
                                    
                                    <div className="col-md-1  pr-5 pb-2" >
                                        <img src={URLAPI + item.images.split(',')[0]} alt="userprofile" className="" width="80px" height="80px"/>
                                    </div>
                                    <div className="col-md-4 pt-3 pl-5 d-flex flex-column">
                                        <h4 className="font-weight-bold subtitletext">{item.shop}</h4>
                                        <h5>{item.name + ` x ${item.qty} pcs`}</h5>
                                    </div>
                                    <div className="col-md-3 subtitletext  text-center pt-4 d-flex flex-row ">
                                     
                                        <input type="text" className="form-control" 
                                        value={item.status}/>
                                    </div>
                                    <div className="col-md-2 subtitletext  text-center pt-3 d-flex flex-column ">
                                        <p>{"transaction date"}</p>
                                        <h5>{item.transactiondate.split('T')[0]}</h5>
                                    </div>
                                    <div className="col-md-2 subtitletext  text-center  d-flex flex-column pt-4">
                                     
                                       
                                        <input type="button" className="btn btn-danger mr-3" value="OK" onClick={()=>this.onDeleteCancelled(item.transactionid)}/>
                               
                                      
    
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                return jsx
        }
        if(this.state.finishload === true && this.state.datatype === 'Unconfirmed' && this.state.data.length === 0){
            return(
                <center>
                <div>
                    <h1 className="m-t-120">Product Confirmation Empty </h1>
                    <img src={URLAPI + PATHDEFAULTCARTEMPTY} width="200px" height="200px"/>
                </div>
                </center>
            )
        }
        if(this.state.finishload === true && this.state.datatype === 'Confirmed' && this.state.data.length === 0){
            return(
                <center>
                <div>
                    <h1 className="m-t-120">Product Confirmed Empty </h1>
                    <img src={URLAPI + PATHDEFAULTCARTEMPTY} width="200px" height="200px"/>
                </div>
                </center>
            )
        }
        if(this.state.finishload === true && this.state.datatype === 'Cancelled' && this.state.data.length === 0){
            return(
                <center>
                <div>
                    <h1 className="m-t-120">Product Cancelled Empty </h1>
                    <img src={URLAPI + PATHDEFAULTCARTEMPTY} width="200px" height="200px"/>
                </div>
                </center>
            )
        }
        
  
        
    }
    onDeleteCancelled = (id) =>{
        var confirm = window.confirm("Delete ?")
        if(confirm){
            const token = localStorage.getItem('token')
            const headers = {
                headers: {
                    'Authorization' : `${token}`
                }
            }
            Axios.get(URLAPI + `/transaction/tidelete/${id}`, headers)
            .then((res)=>{
         
                this.setState({
                    finishload : true,
                    datatype : 'Cancelled'
                })
                this.getCancelledOrder()
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        
    }

    onSubmitButtonClick = (id) =>{

        this.props.loading()
        const token = localStorage.getItem('token')
        const headers = {
            headers: {
                'Authorization' : `${token}`
            }
        }
 
   
        if(this.refs.reviewref.value.replace(/\s+/, "") !== ""){
          
            var description = this.refs.reviewref.value // if user write a review
        }
     

     
        // if(this.state.starrating !== 0){

        //     if(description.replace(/\s+/, "") === ""){
        //         description = 'No Description'
        //     }
        // }else{
        //     description = null
        // }
        var userid = this.props.userdata.userid
        var rating = this.state.starrating
        var productid = this.state.idproductSelected
        var data = {
            userid,
            productid,
            description : description ? description : null,
            rating
        }

     
        Axios.post(URLAPI + '/transaction/successproduct/' + id,data, headers)
        .then((res)=>{
            console.log('asduhaushduas')
            this.setState({
                modalOpen : false,
                starrating : 0,
                itemindex : null,
                finishload : true,
                datatype : 'Unconfirmed',
                show : true
            })
            this.props.updateNotification(this.props.userdata.NOTIFLEN - 1)
            this.props.loadingFalse()
            this.getConfirmedOrder()
        })
        .catch((err)=>{
            this.props.loadingFalse()
            console.log(err)
        })

    }



    render(){
        if(this.props.userdata.CHECK && this.props.userdata.USERNAME === ''){
            return(
                <Redirect to="/"/>
            )
        }
        if(this.state.data.length === 0 && this.state.finishload === false){ // fix later
            return(
                <div className="p-t-100 d-flex flex-column align-items-center" >
                    <h1 className="mb-5">Loading... Please Wait</h1>
                    <ReactLoading type="spin" color="#afb9c9"  />
                </div>
            )
        }
      
        return(
            <div className="mycontainer p-t-100">
                <SweetAlert success title="Success!" onConfirm={()=>this.setState({ show : false})} show={this.state.show}>
                    Thank you for shopping with us!
                </SweetAlert>
                  <Modal isOpen={this.state.modalOpen} toggle={this.closeModal} size="lg" style={{maxWidth: '600px', position : 'absolute', top : '20%', left : '40%'}}>
                        <ModalHeader>
                            <div className="subtitletext p-l-50" style={{fontSize : "26px"}}>Thank you for shopping !</div>
                        </ModalHeader>
                        <ModalBody >
                        
                            <h5 className="text-center">Please Rate Our Product</h5>
                            {!isNull(this.state.itemindex) ?
                            <div className="m-b-50">
                            <center>
                            <img src={URLAPI + this.state.data[this.state.itemindex].images.split(',')[0]} width="200px" height="200px"/>
                            </center>
                            </div>
                            :
                            null
                        }
                        <div className="mb-3">
                        <center>
                         <StarRatings
                            rating={this.state.starrating} 
                            starRatedColor="orange"
                            changeRating={this.changeRating.bind(this)}
                            numberOfStars={5}
                            starSpacing="15px"
                            starDimension="40px"
                            name='rating' 
                            />
                        </center>
                        </div>
                        {this.state.starrating !== 0 
                        ?
                        <center>
                        <div>
                    
                            <h5> Thanks For Your Feedback !</h5>
                            <textarea id="textareareview" className="form-control border border-dark" ref="reviewref" placeholder="(Optional) Write Your Reviews about this product ..."/>
                     
                        </div>
                        </center>
                        :
                        null
                        }
                        

                                
                        </ModalBody>
                        <ModalFooter>
                            <center>
                            <div className="align-item-center p-r-135">
                                {this.props.userdata.LOADING 
                                ?
                                <center>
                                <button className="btn btn-dark btn-lg navbartext form-control">
                                <div class="spinner-border text-secondary" role="status">
                                <span class="sr-only">Loading...</span>
                                </div>
                                </button>
                                </center>
                                :
                                <input type="button" value="Submit" className="btn btn-dark btn-lg navbartext form-control" style={{width : "200px"}}
                                onClick={()=>this.onSubmitButtonClick(this.state.data[this.state.itemindex].transactionid)}/>
                                }
                                 
                            </div>
                            </center>
                        </ModalFooter>
                </Modal>
               <div className="row mb-5 p-0 m-0">
                    <div className="col-md-4 text-center p-0 m-0 ">
                        <a href="/notification?type=confirmation">
                            <input type="button" className="btn btn-info navbartext form-control" value="Waiting Confirmation"   />
                        </a>
                        
                    </div>
                    <div className="col-md-4 text-center p-0 m-0 ">
                        <a href="/notification?type=confirmed">
                            <input type="button" className="btn btn-success navbartext form-control" value="Confirmed Orders" />
                        </a>
                        
                    </div>
                    <div className="col-md-4 text-center p-0 m-0 ">
                        <a href="/notification?type=cancelled">
                            <input type="button" className="btn btn-danger navbartext form-control" value="Cancelled Products" />
                        </a>
                        
                    </div>
                </div>
                <div>
                    {this.renderData()}
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps= (state)=>{
    return{ 
      userdata : state.userdata,
    }
}

export default connect(mapStateToProps, {updateNotification, loading, loadingFalse})(NotificationPage);