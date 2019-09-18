import React from 'react'
import { Table } from 'reactstrap'
import { connect } from 'react-redux'
import Axios from 'axios';
import { URLAPI } from '../redux/actions/types';
import {  Redirect } from 'react-router'
import numeral from 'numeral'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class shophistory extends React.Component{
    state = {
        data : [],
        modalOpen : false,
        totalprice : 0,
        productcancel : 0,
        productconfirm : 0,
        productsuccess : 0
    }

    componentDidMount=()=>{
        this.getShopHistory()

    }
    componentWillReceiveProps=()=>{
        if(this.props.userdata.userid){

            this.getShopHistory()
        }
    }

    getShopHistory = () =>{
        const token = localStorage.getItem('token')
        const headers = {
            headers: {
                'Authorization' : `${token}`
            }
        }
        Axios.get(URLAPI + '/transaction/shophistory/' + this.props.userdata.userid, headers)
        .then((res)=>{
            console.log(res.data)
            this.setState({
                data : res.data
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    shopHistoryDelete = (id) =>{
        var confirm = window.confirm("Are you sure you want to delete this transaction?")
        if(confirm){
            const token = localStorage.getItem('token')
            const headers = {
                headers: {
                    'Authorization' : `${token}`
                }
            }
            Axios.get(URLAPI + `/transaction/tidelete/${id}`, headers)
            .then((res)=>{
                window.alert("Delete Transaction Success")
                this.getShopHistory()
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    renderData = () =>{
        var totalprice = 0
        var cancel = 0
        var success = 0
        var confirm = 0
        if(this.state.data.length !== 0 ){
            
            var jsx = this.state.data.map((item, i)=>{
                if(item.status === 'Success' || item.status === 'Confirmed'){
                    totalprice = totalprice + (item.price * item.qty)
                }

                if(item.status === 'Success'){
                    success++
                }
                else if(item.status === 'Confirmed'){
                    confirm++ 
                }
                else if(item.status === 'Cancelled'){
                    cancel++
                }

                return(
                    <tr className="text-secondary">
                        <td>{i+1}</td>
                        <td>{item.transactiondate.split('T')[0]}</td>
                        <td><img src={URLAPI + item.images.split(',')[0]} height="60px" alt='item'/></td>
                        <td>{item.name}</td>
                        <td>{'Rp ' +numeral(item.price).format(0,0)}</td>
                        <td>{item.qty}</td>
                        <td>{item.buyer}</td>
                        <td className={item.status}>{item.status}</td>
                        <td className="text-success">{'Rp ' +numeral(item.qty * item.price).format(0,0)}</td>
                        <td>
                            <input type='button' className="btn btn-danger" value="DELETE" onClick={()=>this.shopHistoryDelete(item.transid)}/>
                        </td>
                    </tr>
                )
            })
            if(totalprice !== this.state.totalprice ){
                this.setState({
                    totalprice,
                    productcancel : cancel,
                    productconfirm : confirm,
                    productsuccess : success
                })
            }
        }
        return jsx
    }

    printTableSummary = () =>{
       if(this.state.data.length !== 0){
           return (
            <div>
                <div className="navbartext mb-3" style={{color : 'black', fontSize : '18px'}}>Product Success : {this.state.productsuccess}</div>
                <div className="navbartext mb-3" style={{color : 'black', fontSize : '18px'}}>Product Confirmed : {this.state.productconfirm}</div>
                <div className="navbartext mb-3" style={{color : 'black', fontSize : '18px'}}>Product Cancelled : {this.state.productcancel}</div>
                <div className="navbartext mb-3" style={{color : 'black', fontSize : '18px'}}>Total Earning : {'Rp ' +numeral(this.state.totalprice).format(0,0)}</div>
            </div>
           )
        
       }
    }

    render(){
        if(this.props.userdata.CHECK && (this.props.userdata.USERNAME === '' || !this.props.userdata.HAVESHOP)){
            return(
                <Redirect to="/"/>
            )
        }
        return(
            <div className="p-t-65" >
                <div className="storecontainer navbartext mt-5">
                    <Table hover>
                        <thead>
                            <tr className="subtitletext mb-3">
                                <th>No</th>
                                <th>Date</th>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Buyer</th>
                                <th>Status</th>
                                <th>Total Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderData()}
                        </tbody>
                    </Table>
                
                <div className='d-flex flex-row justify-content-center'>
                    <input type="button" className="btn btn-info btn-lg mb-5" value="VIEW SUMMARY" onClick={()=>this.setState({ modalOpen : true})}/>
                </div>

                <Modal isOpen={this.state.modalOpen} toggle={()=>this.setState({modalOpen : false})} size="lg" style={{width: '1200px', position : 'absolute', top : '20%', left : '30%'}}>
                    <ModalHeader>
                        <h1>Summary</h1>
                    </ModalHeader>
                    <ModalBody >
                        
                        {this.printTableSummary()}
                    </ModalBody>
                    <ModalFooter className="d-flex flex-row justify-content-center">
                        <input type="button" className="btn btn-danger btn-lg mb-5 navbartext" value="CLOSE SUMMARY" onClick={()=>this.setState({ modalOpen : false})} />
                    </ModalFooter>
                </Modal>
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

export default connect(mapStateToProps, null)(shophistory);