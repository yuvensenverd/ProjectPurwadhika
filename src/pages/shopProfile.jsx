import React from 'react'
import queryString from 'query-string'
import Axios from 'axios'
import { URLAPI } from '../redux/actions/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faStoreAlt, faLuggageCart, faHourglassHalf, faQuoteLeft, faQuoteRight, faProjectDiagram } from '@fortawesome/free-solid-svg-icons'

class shopProfile extends React.Component{
    state = {
        shopinfo : [],
        data : []
    }

    componentDidMount(){
       
        const values = queryString.parse(this.props.location.search)
        if(values.shopid){

            const token = localStorage.getItem('token')
            const headers = {
                headers: {
                    'Authorization' : `${token}`
                }
            }
            //-----------------------------------------------------------------
            Axios.get(URLAPI + `/shop/getshopinfo/${values.shopid}`, headers)
            .then((res)=>{
                this.setState({
                    shopinfo : res.data
                })
                console.log(this.state)
            })
            .catch((err)=>{
                console.log(err)
            })

            Axios.get(URLAPI + `/shop/getproductshop/${values.shopid}`, headers)
            .then((res)=>{
                this.setState({
                    data : res.data
                })
                console.log(this.state)
            })
            .catch((err)=>{
                console.log(err)
            })

            
        }
    }

    renderShop = () =>{
        if(this.state.shopinfo.length !== 0){
            return(
                <div className="storecard p-3 mb-5">
                    <div className="row">
                        <div className="col-md-2 subtitletext  p-3">
                         
                        </div>
                        <div className="col-md-1 p-0" >
                            <img src={URLAPI + this.state.shopinfo[0].shopimage} alt="userprofile" className="storeimage"/>
                        </div>
                        <div className="col-md-3 subtitletext text-center" style={{paddingTop : "28px"}}>
                            <div className="mb-2">{this.state.shopinfo[0].name}</div>
                            <div style={{fontSize : "14px"}}>
                                <FontAwesomeIcon size="1x"  icon={faQuoteLeft} />
                                &nbsp;&nbsp; {this.state.shopinfo[0].description} &nbsp;&nbsp;
                                <FontAwesomeIcon size="1x"  icon={faQuoteRight}/>
                            </div>
                        </div>
                        <div className="col-md-2 subtitletext  p-4 text-center" style={{fontSize : '15px'}}>
                            <div className="mb-4">Products</div>
                            <div>Shop Rating</div>
                        </div>
                       
                        <div className="col-md-2 subtitletext  text-center p-3" style={{fontSize : '15px'}}>
                         
                        </div>
                        <div className="col-md-2 subtitletext  text-center p-3" style={{fontSize : '15px'}}>
                        </div>
                      
                    </div>
                </div>
            )
        }
    }


    render(){
        return(
            <div>
                <div className="p-t-57  pl-3 pr-3">
                   {this.renderShop()}
                </div>
                <div className="row pl-3 pr-3 mt-4">
                    <div className="col-md-1">

                    </div>
                    <div className="col-md-2">
                        <h5>Category</h5>
                    </div>
                    <div className="col-md-9">
                        <h5>Product List</h5>
                    </div>
                </div>
            </div>
        )
    }
}

export default shopProfile