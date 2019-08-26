import React from 'react'
import numeral from 'numeral'
import Axios from 'axios';
import { URLAPI } from '../redux/actions/types';
import { connect } from 'react-redux'



class NotificationPage extends React.Component{
    state = {
        data : [],
        status : ''
    }
    // <div className="m-t-100">
    //     <div className="storecard p-3 " style={{height : "100px"}}>
    //         <div className="row">
    //             <div className="col-md-3 p-0" >
    //                 <img src="" alt="userprofile" className="storeimage"/>
    //             </div>
    //             <div className="col-md-5 pt-3">
    //                 <h3>Your Product has been sold</h3>
    //             </div>
    //             <div className="col-md-2">
    //                 <div className="pt-3">
    //                     {/* <div>{item.name}</div> */}
    //                     <div className="itempricecart">{'Rp ' +numeral(50000).format(0,0)}</div>
    //                 </div>
    //             </div>
    //             <div className="col-md-1 subtitletext  text-center pt-3 "style={{fontSize : "17px"}}>
    //                 <input type="button" className="btn btn-dark" value="Cancel"/>
    //             </div>
    //             <div className="col-md-1 subtitletext  text-center pt-3 "style={{fontSize : "17px"}}>
    //                 <input type="button" className="btn btn-info" value="Accept"/>
    //             </div>
    //         </div>
    //     </div>
    //     <div className="storecard p-3 " style={{height : "100px"}}>
    //         <div className="row">
    //             <div className="col-md-3 p-0" >
    //                 <img src="" alt="userprofile" className="storeimage"/>
    //             </div>
    //             <div className="col-md-5 pt-3">
    //                 <h3>Your Product has been sold</h3>
    //             </div>
    //             <div className="col-md-2">
    //                 <div className="pt-3">
    //                     {/* <div>{item.name}</div> */}
    //                     <div className="itempricecart">{'Rp ' +numeral(50000).format(0,0)}</div>
    //                 </div>
    //             </div>
    //             <div className="col-md-1 subtitletext  text-center pt-3 "style={{fontSize : "17px"}}>
    //                 <input type="button" className="btn btn-dark" value="Cancel"/>
    //             </div>
    //             <div className="col-md-1 subtitletext  text-center pt-3 "style={{fontSize : "17px"}}>
    //                 <input type="button" className="btn btn-info" value="Accept"/>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    renderWaitingConfirmation = () =>{
        // axios from transaction 
        const token = localStorage.getItem('token')
        const headers = {
            headers: {
                'Authorization' : `${token}`
            }
        }
        console.log(this.props.userdata.userid)
        Axios.get(URLAPI + '/transaction/getunconfirmed/' + this.props.userdata.userid, headers)
        .then((res)=>{
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render(){
        return(
            <div className="mycontainer p-t-100">
               <div className="row mb-5 p-0 m-0">
                    <div className="col-md-3 text-center p-0 m-0 ">
                        <input type="button" className="btn btn-info navbartext form-control" value="Waiting Confirmation" onClick={()=>this.renderWaitingConfirmation()} />
                    </div>
                    <div className="col-md-3 text-center p-0 m-0 ">
                        <input type="button" className="btn btn-danger navbartext form-control" value="" />
                    </div>
                    <div className="col-md-3 text-center p-0 m-0 ">
                        <input type="button" className="btn btn-primary navbartext form-control" value="CATEGORIES"  />
                    </div>
                    <div className="col-md-3 text-center p-0 m-0 ">
                        <input type="button" className="btn btn-success navbartext form-control" value="USER"  />
                    </div>
                </div>
                <div>
                
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