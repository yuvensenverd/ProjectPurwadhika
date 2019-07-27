import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faVrCardboard} from '@fortawesome/free-solid-svg-icons'


class promoDetails extends React.Component{
    render(){
        return (
            <div>
                
                {/* <div className="cardcp d-inline-block mr-3 mb-4" >
                    <img  src='https://photovouchershop.co.uk/wp-content/uploads/2017/11/PhotoVoucherSmall.png' alt='IMAGE' width="100%" height="100%"/>
                    <div className="cardcptext" style={{height : "67px"}}>PROMO DETAILS</div>
                    <div style={{height : '100px'}}>
                        <div><FontAwesomeIcon size="1x"  icon={faCalendar}></FontAwesomeIcon><span> &nbsp;&nbsp;&nbsp;  Available Period</span></div>
                        <div>Some Text</div>
                    </div>
                    <div style={{height : '60px'}}>
                        <div><FontAwesomeIcon size="1x"  icon={faVrCardboard}></FontAwesomeIcon><span> &nbsp;&nbsp;&nbsp;  Coupon Code</span></div>
                        <div>Some Text</div>
                    </div>
            
                
                    <div className="form-control bg-success text-light text-bolder">Add to Cart</div >

                
                </div> */}

                <div className="container pl-5">
                    <div className="text-center mb-3"><h1> Coupon Available</h1></div>

                    {/* LIST GOES HERE */}
                    <div class="card d-inline-block  mr-5 mb-3"  >
                        <img class="card-img-top"   style={{width : '300px'}} src="https://photovouchershop.co.uk/wp-content/uploads/2017/11/PhotoVoucherSmall.png" alt="Card image cap"/>
                        <div class="card-body"  style={{width : '300px'}}>
                            <h5 class="card-title">Card title</h5>
                            <div style={{height : '100px'}}>Some quick example text to build on the card title and make up the bulk of the card's content.</div>
                        <div>
                            <div><FontAwesomeIcon size="1x"  icon={faCalendar}></FontAwesomeIcon><span> &nbsp;&nbsp;&nbsp;  Available Period</span></div>
                            <div className="pricepr">Some Text</div>
                        </div>
                        <div >
                            <div><FontAwesomeIcon size="1x"  icon={faVrCardboard}></FontAwesomeIcon><span> &nbsp;&nbsp;&nbsp;  Coupon Code</span></div>
                            <div className="pricepr">Some Text</div>
                        </div>
                            <button  class="btn btn-primary mt-4 bg-success">Go somewhere</button>
                        </div>
                    </div>

                    <div class="card d-inline-block mr-5 mb-3"  >
                        <img class="card-img-top"   style={{width : '300px'}} src="https://photovouchershop.co.uk/wp-content/uploads/2017/11/PhotoVoucherSmall.png" alt="Card image cap"/>
                        <div class="card-body"  style={{width : '300px'}}>
                            <h5 class="card-title">Card title</h5>
                            <div style={{height : '100px'}}>Some quick example text to build on the card title and make up the bulk of the card's content.</div>
                        <div>
                            <div><FontAwesomeIcon size="1x"  icon={faCalendar}></FontAwesomeIcon><span> &nbsp;&nbsp;&nbsp;  Available Period</span></div>
                            <div className="pricepr">Some Text</div>
                        </div>
                        <div >
                            <div><FontAwesomeIcon size="1x"  icon={faVrCardboard}></FontAwesomeIcon><span> &nbsp;&nbsp;&nbsp;  Coupon Code</span></div>
                            <div className="pricepr">Some Text</div>
                        </div>
                            <button  class="btn btn-primary mt-4 bg-success">Go somewhere</button>
                        </div>
                    </div>

                    <div class="card d-inline-block mr-5 mb-3"  >
                        <img class="card-img-top"   style={{width : '300px'}} src="https://photovouchershop.co.uk/wp-content/uploads/2017/11/PhotoVoucherSmall.png" alt="Card image cap"/>
                        <div class="card-body"  style={{width : '300px'}}>
                            <h5 class="card-title">Card title</h5>
                            <div style={{height : '100px'}}>Some quick example text to build on the card title and make up the bulk of the card's content.</div>
                        <div>
                            <div><FontAwesomeIcon size="1x"  icon={faCalendar}></FontAwesomeIcon><span> &nbsp;&nbsp;&nbsp;  Available Period</span></div>
                            <div className="pricepr">Some Text</div>
                        </div>
                        <div >
                            <div><FontAwesomeIcon size="1x"  icon={faVrCardboard}></FontAwesomeIcon><span> &nbsp;&nbsp;&nbsp;  Coupon Code</span></div>
                            <div className="pricepr">Some Text</div>
                        </div>
                            <button  class="btn btn-primary mt-4 bg-success">Go somewhere</button>
                        </div>
                    </div>

                    
                    <div class="card d-inline-block mr-5 mb-3"  >
                        <img class="card-img-top"   style={{width : '300px'}} src="https://photovouchershop.co.uk/wp-content/uploads/2017/11/PhotoVoucherSmall.png" alt="Card image cap"/>
                        <div class="card-body"  style={{width : '300px'}}>
                            <h5 class="card-title">Card title</h5>
                            <div style={{height : '100px'}}>Some quick example text to build on the card title and make up the bulk of the card's content.</div>
                        <div>
                            <div><FontAwesomeIcon size="1x"  icon={faCalendar}></FontAwesomeIcon><span> &nbsp;&nbsp;&nbsp;  Available Period</span></div>
                            <div className="pricepr">Some Text</div>
                        </div>
                        <div >
                            <div><FontAwesomeIcon size="1x"  icon={faVrCardboard}></FontAwesomeIcon><span> &nbsp;&nbsp;&nbsp;  Coupon Code</span></div>
                            <div className="pricepr">Some Text</div>
                        </div>
                            <button  class="btn btn-primary mt-4 bg-success">Go somewhere</button>
                        </div>
                    </div>

                    <div class="card d-inline-block mr-5 mb-3"  >
                        <img class="card-img-top"   style={{width : '300px'}} src="https://photovouchershop.co.uk/wp-content/uploads/2017/11/PhotoVoucherSmall.png" alt="Card image cap"/>
                        <div class="card-body"  style={{width : '300px'}}>
                            <h5 class="card-title">Card title</h5>
                            <div style={{height : '100px'}}>Some quick example text to build on the card title and make up the bulk of the card's content.</div>
                        <div>
                            <div><FontAwesomeIcon size="1x"  icon={faCalendar}></FontAwesomeIcon><span> &nbsp;&nbsp;&nbsp;  Available Period</span></div>
                            <div className='pricepr' >Some Text</div>
                        </div>
                        <div >
                            <div><FontAwesomeIcon size="1x"  icon={faVrCardboard}></FontAwesomeIcon><span> &nbsp;&nbsp;&nbsp;  Coupon Code</span></div>
                            <div className='pricepr' >Some Text</div>
                        </div>
                            <button  class="btn btn-primary mt-4 bg-success">Go somewhere</button>
                        </div>
                    </div>

                    <div class="card d-inline-block mr-5 mb-3"  >
                        <img class="card-img-top"   style={{width : '300px'}} src="https://photovouchershop.co.uk/wp-content/uploads/2017/11/PhotoVoucherSmall.png" alt="Card image cap"/>
                        <div class="card-body"  style={{width : '300px'}}>
                            <h5 class="card-title">Card title</h5>
                            <div style={{height : '100px'}}>Some quick example text to build on the card title and make up the bulk of the card's content.</div>
                        <div>
                            <div><FontAwesomeIcon size="1x"  icon={faCalendar}></FontAwesomeIcon><span> &nbsp;&nbsp;&nbsp;  Available Period</span></div>
                            <div className="pricepr">Some Text</div>
                        </div>
                        <div >
                            <div><FontAwesomeIcon size="1x"  icon={faVrCardboard}></FontAwesomeIcon><span> &nbsp;&nbsp;&nbsp;  Coupon Code</span></div>
                            <div className="pricepr">Some Text</div>
                        </div>
                            <button  class="btn btn-primary mt-4 bg-success">Go somewhere</button>
                        </div>
                    </div>

                   
                    
                </div>

                
    
            </div>
        )
    }
}

export default promoDetails;