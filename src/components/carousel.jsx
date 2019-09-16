import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import { URLAPI, PATHDEFAULTPRD } from '../redux/actions/types';


class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeIndex: 0 ,
      items : []
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  componentDidMount = () => {
    console.log("Masuk Carousel")
    console.log(this.props.items)
    if(this.props.items){
      var array = this.props.items.split(',')

    }else{
      var array = [PATHDEFAULTPRD]
    }
    console.log(array)
    for(var i = 0; i<array.length; i++){
      array[i] = URLAPI+array[i]
    }
    this.setState({
      items : array
    })
    console.log(this.state.items)
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    if(this.state.items.length !== 0){
    
 
      const slides = this.state.items.map((val, index) => {
        return (
         
          <CarouselItem
            onExiting={this.onExiting}
            onExited={this.onExited}
            key={index}
            style={{padding : '0px', margin : '0px', height : '100%', width : '100%'}}
          >
          
            <img src={val} alt={val} width="100%" height={this.props.slideheight}/> 
            {/* FFULL HEIGHT DI PR PAGE JJADI 600px */}
            {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
          </CarouselItem>
          
          
        );
      });
  
      return (
        <div style={{zIndex : '0'}}>
        <Carousel style={{zIndex : '0'}}
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators style={{zIndex : '0'}} items={this.state.items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          {this.state.items.length === 1 ?
          null 
        :
        this.state.items.length > 1
        ?
        <div>
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </div>
        :
        null
        }
          
        </Carousel>
        </div>
      );
    }
    else {
        return (
          <div></div>
        )
    }

  }
}


export default Slider;

