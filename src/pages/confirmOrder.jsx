import React from 'react'
import numeral from 'numeral'
import Axios from 'axios';
import { URLAPI } from '../redux/actions/types';
import { connect } from 'react-redux'



class confirmOrder extends React.Component{
    state = {
        data : [],
        finishload : false,
        status : ''
    }

    componentDidMount(){
        this.getWaitingConfirmation()
    }

    componentWillReceiveProps(){
    
        this.getWaitingConfirmation()
        
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
        Axios.get(URLAPI + '/transaction/getunconfirmedshop/' + this.props.userdata.userid, headers)
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

    onConfirmProductClick = (id) =>{
        console.log(id)
        const token = localStorage.getItem('token')
        const headers = {
            headers: {
                'Authorization' : `${token}`
            }
        }
        Axios.get(URLAPI + '/transaction/confirmproduct/' + id, headers)
        .then((res)=>{
            window.alert("Confirm Product Success")
            this.setState({
                finishload : false,
                datatype : 'Unconfirmed'
            })
            this.getWaitingConfirmation()
        })
        .catch((err)=>{
            console.log(err)
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
                                <div className="col-md-2 pt-3 pl-5 d-flex flex-column">
                                  
                                    <h5>{item.productname + ` x ${item.qty} pcs`}</h5>
                                </div>
                                <div className="col-md-2 pt-3 d-flex flex-column pl-5">
                                   
                                        {/* <div>{item.name}</div> */}
                                        <h5 className="font-weight-bold  text-secondary">{"Total Price :"}</h5>
                                        <div className="itempricecart">{'Rp ' +numeral(item.qty * item.price).format(0,0)}</div>
                        
                                </div>
                                <div className="col-md-2 subtitletext   pt-3 d-flex flex-column">
                                    <p>{"Buyer"}</p>
                                    <div className="pr-5 ">{item.buyer}</div>
                                </div>
                                <div className="col-md-2 subtitletext  text-center pt-3 d-flex flex-column ">
                                    <p>{"transaction date"}</p>
                                    <h5>{item.transactiondate.split('T')[0]}</h5>
                                </div>
                                <div className="col-md-3 subtitletext  text-center pt-4 d-flex flex-row  ">
                                    <input type="button" className="btn btn-dark mr-3" value="CONFIRM" onClick={()=>this.onConfirmProductClick(item.transactionid)}/>
                                    <input type="button" className="btn btn-danger " value="CANCEL"/>

                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
            return jsx
        }
    }



    render(){
        return(
            <div className="mycontainer p-t-100">
               <div className="row mb-5 p-0 m-0">
                    <div className="col-md-3 text-center p-0 m-0 ">
                        <input type="button" className="btn btn-dark navbartext form-control" value="Unconfirmed Orders" onClick={()=>this.getWaitingConfirmation()} />
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

export default connect(mapStateToProps, null)(confirmOrder);