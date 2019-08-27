import React from 'react'
import { Table } from 'reactstrap'
import { connect } from 'react-redux'
import Axios from 'axios';
import { URLAPI } from '../redux/actions/types';
import numeral from 'numeral'


class shophistory extends React.Component{
    state = {
        data : []
    }

    componentDidMount=()=>{
        this.getShopHistory()

    }
    componentWillReceiveProps=()=>{
        this.getShopHistory()
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

    renderData = () =>{
        if(this.state.data.length !== 0 ){
            var jsx = this.state.data.map((item, i)=>{
                return(
                    <tr className="text-secondary">
                        <td>{i+1}</td>
                        <td>{item.transactiondate.split('T')[0]}</td>
                        <td><img src={URLAPI + item.images.split(',')[0]} height="60px"/></td>
                        <td>{item.name}</td>
                        <td>{'Rp ' +numeral(item.price).format(0,0)}</td>
                        <td>{item.qty}</td>
                        <td>{item.buyer}</td>
                        <td>{item.status}</td>
                        <td className="text-success">{'Rp ' +numeral(item.qty * item.price).format(0,0)}</td>
                        <td>
                            <input type='button' className="btn btn-danger" value="DELETE"/>
                        </td>
                    </tr>
                )
            })
        }
        return jsx
    }

    render(){
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