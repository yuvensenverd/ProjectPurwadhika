import React from 'react'
import numeral from 'numeral'
import Axios from 'axios';
import { URLAPI, PATHDEFAULTCARTEMPTY } from '../redux/actions/types';
import { loading, loadingFalse} from '../redux/actions/index'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading'




class confirmOrder extends React.Component{
    state = {
        data : [],
        finishload : false,
        status : '',
        datatype : '',
        transid : null
    }

    componentDidMount(){
        if(this.props.userdata.userid){

            this.getWaitingConfirmation()
        }
    }

    componentWillReceiveProps(){
        if(this.props.userdata.userid){
            this.getWaitingConfirmation()
        }
        
    }
    
       
    getWaitingConfirmation = () =>{
        // axios from transaction 
        const token = localStorage.getItem('token')
        const headers = {
            headers: {
                'Authorization' : `${token}`
            }
        }
        Axios.get(URLAPI + '/transaction/getunconfirmedshop/' + this.props.userdata.userid, headers)
        .then((res)=>{
            this.setState({
                data : res.data,
                finishload : true,
                datatype : 'Unconfirmed'
            })
            console.log('selesai')
            console.log(this.state.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    onConfirmProductClick = (id, price) =>{
        this.props.loading()
        this.setState({
            transid : id
        })
        console.log(id)
        console.log(price)
        const token = localStorage.getItem('token')
        const headers = {
            headers: {
                'Authorization' : `${token}`
            }
        }

        Axios.get(URLAPI + `/transaction/confirmproduct/${id}/${price}/${this.props.userdata.userid}`, headers) // set status product to confirmed
        .then((res)=>{
            this.props.loadingFalse()
            window.alert("Confirm Product Success")
            this.setState({
                finishload : false,
                datatype : 'Unconfirmed',
                transid : null
            })

            this.getWaitingConfirmation()
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    onCancelProductClick = (id, price, buyerid) =>{
     
        this.props.loading()
        this.setState({
            transid : id
        })
        var confirm = window.confirm('Are you sure to cancel this order ?')
        if(confirm){

            const token = localStorage.getItem('token')
            const headers = {
                headers: {
                    'Authorization' : `${token}`
                }
            }
            Axios.get(URLAPI + `/transaction/cancelproduct/${id}/${price}/${buyerid}`, headers)
            .then((res)=>{
                this.props.loadingFalse()
                window.alert("Product Has Been Cancelled")
                this.setState({
                    finishload : false,
                    datatype : 'Unconfirmed',
                    transid : null
                })

                this.getWaitingConfirmation()
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    renderData = () =>{
        console.log("renderdatafunc")
        console.log(this.state)
        if(this.state.finishload === true && this.state.datatype === 'Unconfirmed' && this.state.data.length !== 0){
            console.log('1')
           

                var jsx = this.state.data.map((item, i)=>{
                    return (
                        <div>
                            <div className="storecard p-3 mb-0 " style={{height : "130px"}}>
                                <div className="row">
                                    
                                    <div className="col-md-1  pr-5 pb-2" >
                                        <img src={URLAPI + item.images.split(',')[0]} alt="userprofile" className="" width="80px" height="80px"/>
                                    </div>
                                    <div className="col-md-2  d-flex flex-column">
                                      
                                        <h5>{item.productname + ` x ${item.qty} pcs`}</h5>
                                    </div>
                                    <div className="col-md-2 d-flex flex-column pl-5">
                                       
                                            {/* <div>{item.name}</div> */}
                                            <h5 className="font-weight-bold  text-secondary">{"Total Price :"}</h5>
                                            <div className="itempricecart">{'Rp ' +numeral(item.qty * item.price).format(0,0)}</div>
                            
                                    </div>
                                    <div className="col-md-2 subtitletext    d-flex flex-column">
                                        <p>{"Buyer"}</p>
                                        <div className="pr-5 ">{item.buyer}</div>
                                    </div>
                                    <div className="col-md-2 subtitletext  text-center  d-flex flex-column ">
                                        <p>{"transaction date"}</p>
                                        <h5>{item.transactiondate.split('T')[0]}</h5>
                                    </div>
                                    <div className="col-md-3 subtitletext  text-center d-flex flex-row  ">
                                        {this.props.userdata.LOADING && (item.transactionid === this.state.transid)
                                        ?
                                        <div className="d-flex flex-column align-items-center" >
                                            <p className="mb-1">Loading...</p>
                                            <ReactLoading type="spin" color="#afb9c9" height='15px' />
                                        </div>
                                    :
                                    <div className="pt-4">
                                        <input type="button" className="btn btn-dark mr-3" value="CONFIRM" onClick={()=>this.onConfirmProductClick(item.transactionid, item.qty*item.price)}/>
                                        <input type="button" className="btn btn-danger " value="CANCEL" onClick={()=>this.onCancelProductClick(item.transactionid, item.qty*item.price, item.userid)} />
                                        </div>
                                    }
                                        
    
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                return jsx
            
        }
      
        if(this.state.finishload === true && this.state.datatype === 'Unconfirmed' && this.state.data.length === 0){
            console.log('2')
            return (
                <center>
                    <div>
                        <h1 className="m-t-120">No Product to Confirm </h1>
                        <img src={URLAPI + PATHDEFAULTCARTEMPTY} width="200px" height="200px"/>
                    </div>
                </center>
            )
        }
      
        
    }



    render(){
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
               <div className="row mb-5 p-0 m-0">
                    <div className="col-md-6 text-center p-0 ">
                        <input type="button" className="btn btn-dark navbartext form-control" value="Unconfirmed Orders" onClick={()=>this.getWaitingConfirmation()} />
                    </div>
                    <div className="col-md-6 text-center p-0 m-0 ">
                        <Link to='/userstore'>
                        <input type="button" className="btn btn-info navbartext form-control" value="View Your Store"  />
                        </Link>
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
      userdata : state.userdata
    }
}

export default connect(mapStateToProps, {loading, loadingFalse})(confirmOrder);