import React from 'react'
import numeral from 'numeral'
import Axios from 'axios';
import { URLAPI } from '../redux/actions/types';
import { connect } from 'react-redux'



class NotificationPage extends React.Component{
    state = {
        data : [],
        finishload : false,
        status : ''
    }

    componentWillReceiveProps(){
    
        this.getWaitingConfirmation()
        
    }
    
    componentDidMount(){
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
    }



    render(){
        return(
            <div className="mycontainer p-t-100">
               <div className="row mb-5 p-0 m-0">
                    <div className="col-md-6 text-center p-0 m-0 ">
                        <input type="button" className="btn btn-info navbartext form-control" value="Waiting Confirmation" onClick={()=>this.getWaitingConfirmation()} />
                    </div>
                    <div className="col-md-6 text-center p-0 m-0 ">
                        <input type="button" className="btn btn-success navbartext form-control" value="Confirmed Orders" />
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