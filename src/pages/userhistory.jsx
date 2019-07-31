import React from 'react'
import { Table } from 'reactstrap'


class userHistory extends React.Component{
    state = {

    }

    componentDidMount=()=>{
        console.log(this.props.location.search)
    }
    //min-height: 100%;
  
//   width: 100%;
//   height: auto;
//   position: absolute;
    render(){
        return(
            <div className="p-t-65" >
                <div className="storecontainer navbartext mt-5">
                    <Table dark>
                        <thead >
                            <td>No</td>
                            <td>Transaction Id</td>
                            <td>Date</td>
                            <td>Total Price</td>
                            <td>Username</td>
                            <td>Actions</td>
                        </thead>
                        <tbody > 
                            {/* // style={{backgroundColor : "#f1f1f1"}} */}
                     
                            <tr>
                                <td>1</td>
                                <td>001</td>
                                <td>17/8/2019</td>
                                <td>Rp 50.000</td>
                                <td>asdasdasdas</td>
                                <td>test</td>
                            </tr>
                        </tbody>

                    </Table>


                </div>

            </div>
        )
    }
}

export default userHistory;