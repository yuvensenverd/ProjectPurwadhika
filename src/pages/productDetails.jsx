import React from 'react'
import numeral from 'numeral'

class productDetails extends React.Component{
    state={
        jumlah : 0,
        price : 10000,
        totalprice : 0
    }

    addQty = () => {
        this.setState({
            jumlah : this.state.jumlah + 1,
            
        })
        this.calculateTotal()
    }

    minQty = () => {
        if(this.state.jumlah !== 0){
            this.setState({
                jumlah : this.state.jumlah - 1,
                
            })
            this.calculateTotal()
        }
        
    }

    calculateTotal = () => {
        this.setState((state) => ({
            totalprice : state.jumlah *  state.price
        }));
    }
    render(){
        return(
            <div>
                <div className="storecontainer">
                    <div className="row">
                        <div className="col-md-5">
                            <img src="http://images.thenorthface.com/is/image/TheNorthFace/236x204_CLR/womens-better-than-naked-jacket-AVKL_NN4_hero.png" height="500px"></img>
                        </div>
                        <div className="col-md-7">
                            <h1 className="mb-4">Product Name</h1>
                            <div className="badge badge-pill badge-danger mb-3" style={{fontSize : "20px"}}> Product Genre</div>
                            <h3 className="mb-3">Quantity</h3>
                            <div className="mb-5">
                            <input type="button" className="btn btn-success rounded-circle mr-3" value="+" onClick={() => this.addQty()}/>
                            <input type="text" className="form-control d-inline text-center" style={{width :"100px", fontWeight : "bolder", fontSize : "23px"}} value={this.state.jumlah}  readOnly/>
                            <input type="button" className="btn btn-success rounded-circle ml-3 " value="-" onClick={() => this.minQty()}/>
                            </div>
                            <h3 className="mb-3">Total Price</h3>
                            <input type="text"  className="form-control d-inline mb-5" style={{width :"250px", fontWeight : "bolder", fontSize : "23px"}} value={"Rp. " + numeral(this.state.totalprice).format(0,0)} readOnly/>
                            <div><input type="button" value="PROCEED" className="btn btn-dark btn-lg navbartext" style={{width : "350px"}}></input></div>
                            

                        </div>
                    </div>
                    <div className=" p-5">
                        <div className="mb-4"><h1>Product Description</h1></div>
                        <div className="subtitletext" style={{fontSize : "17px"}}>  ayayayayasdfasdf</div>
                    </div>

                </div>
            </div>
        )
    }
}

export default productDetails;