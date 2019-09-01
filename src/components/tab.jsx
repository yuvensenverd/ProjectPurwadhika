import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink,  Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Axios from 'axios'
import { URLAPI } from '../redux/actions/types';
import StarRatings from 'react-star-ratings';

export default class Example extends React.Component {
  
   
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        activeTab: '1',
        data : []

      };
    }
    componentDidMount(){
      console.log(this.props.datatabone)
      Axios.get(URLAPI + '/product/getreview/' + this.props.productid)
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

    renderReview = () =>{
      if(this.state.data.length !== 0){
        var review = false
        var jsx = this.state.data.map((item)=>{
          if(item.description !== 'No Description'){
            review = true
            
            return(
              <div className="d-flex flex-column mb-3 reviewcard border border-secondary p-3">
                <StarRatings
                      rating={item.rating}
                      starRatedColor="orange"
                      // changeRating={this.changeRating}
                      numberOfStars={5}
                      starDimension="15px"
                      name='rating'
                  />
                  <h5 className="mt-2 mb-3">{`By ${item.username}`}</h5>
                  <div>{item.description}</div>
              </div>
            )
          }
        })
        if(review === false){
          return(

            <h5> No Reviews Available From This Product</h5>
          )
        }
        
        return jsx
      }else{
        return (
          <h5> No Reviews Available From This Product</h5>
        )
      }
    }
  
    toggle(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
      }
    }
    render() {
      return (
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                Product Description
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                Product Reviews 
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12" className="pt-4">
                  <h4>{!this.props.datatabone ? "No  Description Available for this Product" : this.props.datatabone}</h4>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12" className="pt-4">
                  {/* {this.state.message === true ? <h5>Latest 5 Reviews from this Product</h5> : null} */}
                  {this.renderReview()}
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      );
    }
  }

  