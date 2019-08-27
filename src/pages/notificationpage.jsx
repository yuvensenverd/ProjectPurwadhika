import React from 'react'
import numeral from 'numeral'
import Axios from 'axios';
import { URLAPI } from '../redux/actions/types';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import StarRatings from 'react-star-ratings';



class NotificationPage extends React.Component{
    state = {
        data : [],
        finishload : false,
        status : '',
        modalOpen : false,
        itemindex : null,
        starrating : 0
    }

    closeModal = () =>{
        this.setState({
            modalOpen : false,
            starrating : 0,
            itemindex : null
        })
    }

    componentWillReceiveProps(){
    
        this.getWaitingConfirmation()
        
    }
    
    componentDidMount(){
        this.getWaitingConfirmation()
    }

    getConfirmedOrder = () =>{
        console.log("Masuk")
        const token = localStorage.getItem('token')
        const headers = {
            headers: {
                'Authorization' : `${token}`
            }
        }
        console.log(this.props.userdata.userid)
        Axios.get(URLAPI + '/transaction/getconfirmed/' + this.props.userdata.userid, headers)
        .then((res)=>{
            this.setState({
                data : res.data,
                finishload : true,
                datatype : 'Confirmed'
            })
            console.log(this.state.data)
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
                datatype : 'Unconfirmed'
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
        if(this.state.finishload === true && this.state.datatype === 'Unconfirmed'){
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
        if(this.state.finishload === true && this.state.datatype === 'Confirmed'){
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
                                        modalOpen : true
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
    }

    onSubmitButtonClick = (id) =>{
        console.log(id)
        const token = localStorage.getItem('token')
        const headers = {
            headers: {
                'Authorization' : `${token}`
            }
        }
        Axios.get(URLAPI + '/transaction/successproduct/' + id, headers)
        .then((res)=>{
            this.setState({
                modalOpen : false,
                starrating : 0,
                itemindex : null,
                finishload : true,
                datatype : 'Unconfirmed'
            })
            this.getConfirmedOrder()
        })
        .catch((err)=>{
            console.log(err)
        })

    }



    render(){
        console.log(this.state.itemindex)
        return(
            <div className="mycontainer p-t-100">
                  <Modal isOpen={this.state.modalOpen} toggle={this.closeModal} size="lg" style={{maxWidth: '600px', position : 'absolute', top : '20%', left : '40%'}}>
                        <ModalHeader>
                            <div className="subtitletext p-l-50" style={{fontSize : "26px"}}>Thank you for shopping !</div>
                        </ModalHeader>
                        <ModalBody >
                            <h5 className="text-center">Please Rate Our Product</h5>
                            {this.state.itemindex || this.state.itemindex === 0 ?
                            <div className="m-b-50">
                            <center>
                                 {console.log(this.state.data[this.state.itemindex].images.split(',')[0])}
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
                        <h5> Thanks For Your Feedback !</h5>
                        </center>
                        :
                        null
                        }
                        

                                
                        </ModalBody>
                        <ModalFooter>
                            <center>
                            <div className="align-item-center p-r-135">
                                 <input type="button" value="Submit" className="btn btn-dark btn-lg navbartext form-control" style={{width : "200px"}}
                                  onClick={()=>this.onSubmitButtonClick(this.state.data[this.state.itemindex].transactionid)}/>
                            </div>
                            </center>
                        </ModalFooter>
                </Modal>
               <div className="row mb-5 p-0 m-0">
                    <div className="col-md-6 text-center p-0 m-0 ">
                        <input type="button" className="btn btn-info navbartext form-control" value="Waiting Confirmation" onClick={()=>this.getWaitingConfirmation()} />
                    </div>
                    <div className="col-md-6 text-center p-0 m-0 ">
                        <input type="button" className="btn btn-success navbartext form-control" value="Confirmed Orders" onClick={()=>this.getConfirmedOrder()} />
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

export default connect(mapStateToProps, null)(NotificationPage);