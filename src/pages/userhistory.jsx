import React from 'react'
import { Table } from 'reactstrap'
import Axios from 'axios';
import { connect } from 'react-redux'
import { Redirect} from 'react-router'
import { URLAPI } from '../redux/actions/types';
import numeral from 'numeral'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import header from '../components/header';



class userhistory extends React.Component{
    state = {
        data : [],
        detailTransaction : [],
        showdetails : null, // modal index data
        modalopen : false
    }

    componentWillReceiveProps(){
       this.getTransactionData()
    }
    componentDidMount(){
       this.getTransactionData()
    }

    getTransactionData = () =>{
        console.log(this.props.userdata.userid)
        const token = localStorage.getItem('token')
        const headers = {
            headers: {
                'Authorization' : `${token}`
            }
        }
        Axios.get(URLAPI + '/transaction/usertransaction/' + this.props.userdata.userid, headers)
        .then((res)=>{
            console.log(res.data)
            this.setState({
                data : res.data
            })
            console.log(this.state.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    getDetailTransaction = (id) =>{
        const token = localStorage.getItem('token')
        const headers = {
            headers: {
                'Authorization' : `${token}`
            }
        }
        Axios.get(URLAPI + `/transaction/detailtransaction/${this.props.userdata.userid}/${id}`, headers)
        .then((res)=>{
            console.log(res.data)
            this.setState({
                detailTransaction : res.data,
                modalopen : true
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    deleteTransaction =(id) =>{
        var confirm = window.confirm("Are you sure you want to delete this transaction ?")
        if(confirm){

            const token = localStorage.getItem('token')
            const headers = {
                headers: {
                    'Authorization' : `${token}`
                }
            }
            Axios.get(URLAPI + `/transaction/deletetransaction/${id}`, headers)
            .then((res)=>{
                console.log(res.data)
                console.log("Berhasil status delete")
                this.getTransactionData()
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    renderData = () =>{
 
        if(this.state.data.length !== 0){
        
            return this.state.data.map((trx, i)=>{
                return(
                    <tr>
                        <th scope="row">{i+1}</th>
                        <td>{trx.transactiondate.split('T')[0]}</td>
                        <td>{'Rp ' +numeral(trx.totalprice).format(0,0)}</td>
                        <td>
                            {trx.paymentstatus === 1 ? <p className="text text-danger">Rejected</p> : <p className="text text-success">Success</p>}
                        </td>
                        <td>
                            <input type="button" className="btn btn-info mr-3" value="DETAILS" onClick={()=>this.getDetailTransaction(trx.transid)}/>
                            <input type="button" className="btn btn-danger" value="DELETE" onClick={()=>this.deleteTransaction(trx.transid)}/>
                        </td>
                    </tr>
                )
            })
            
        }
    }

    printDetails = () =>{
        if(this.state.detailTransaction.length !== 0){
            var jsx = this.state.detailTransaction.map((trx, i)=>{
                return (
                    <div className="row mb-2">
                        <div className="col-md-2 d-flex flex-row justify-content-center">
                        
                            <img src={URLAPI + trx.images.split(',')[0]}  height="75px" />
                        </div>
                        <div className="col-md-2">
                            <div>{trx.name}</div>
                        </div>
                        
                        <div className="col-md-2">
                            <div>{trx.productname}</div>
                        </div>
                        <div className="col-md-1">
                            <div>{trx.qty + "pcs"}</div>
                        </div>
                        <div className="col-md-1">
                            <div>{`@Rp ${trx.price}`}</div>
                        </div>
                        <div className="col-md-1">
                            <div className="text-danger">{`Rp ${trx.price * trx.qty}`}</div>
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" value={trx.status}/>
                        </div>

                    </div>
                )
            })
            return jsx
        }
    }


    render(){
        // if(this.props.userdata.USERNAME === ""){
        //     window.alert("please login first before proceed !")
        //     return (
        //         <Redirect to="/login"> </Redirect> 
        //     )
        // }
        return(
            <div className="p-t-65" >
                 <Modal isOpen={this.state.modalopen} toggle={()=>this.setState({modalopen : false})} size="lg" style={{maxWidth: '1500px'}}>
                        <ModalHeader>
                            <div className="subtitletext text-center " style={{fontSize : "26px"}}>Transaction Details</div>
                        </ModalHeader>
                        <ModalBody >
                        <div className="row mb-4">
                            <div className="col-md-2 d-flex flex-row justify-content-center">
                                <h5>Image</h5>
                            </div>
                            <div className="col-md-2">
                                <h5>Shop</h5>
                            </div>
                            
                            <div className="col-md-2">
                                <h5>Product Name</h5>
                            </div>
                            <div className="col-md-1">
                                <h5>Qty</h5>
                            </div>
                            <div className="col-md-1">
                                <h5>Price</h5>
                            </div>
                            <div className="col-md-1">
                                <h5>Total Price</h5>
                            </div>
                            <div className="col-md-3">
                                <h5>Status</h5>
                            </div>

                         </div>
                                {this.printDetails()}
                        </ModalBody>
                       
                </Modal>
                <div className="storecontainer navbartext mt-5">
                    <Table hover>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Transaction Date</th>
                                <th>Total Price</th>
                                <th>Payment Status</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderData()}
                        </tbody>
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

export default connect(mapStateToProps, null)(userhistory);