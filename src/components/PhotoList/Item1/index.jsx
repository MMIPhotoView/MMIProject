import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router-dom'

import './style.less'


class Item extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
    this.state = {
      isLike : this.props.isLike
    }
  }
  render() {
    const data =this.props.data;
    return (
        <div className='tile'>
          <img src={data.photoUrl} />
          <div className='text'>

            <h3 className='animate-text'>{data.desc}</h3>
            <Link to={`User/${data.aid}`}>
              <p className='animate-text'>{ `by:${ data.name }` }</p>
            </Link>
            <span className='animate-text glyphicon glyphicon-heart like'  style={{color:this.state.isLike?'red':'white'}} onClick={this.like.bind(this)}></span>
            <div className='dots'>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
    );
  }

  like() {
    const islike = this.state.isLike;
    const id = this.props.data.pid
    
    const result = this.storeClickHandle(id,islike);

    if (result) {
      this.setState({
        isLike : !this.state.isLike
      });
    }
  }

  // 收藏调用
  storeClickHandle(id,islike) {
    const storeHandle = this.props.storeHandle;
    return storeHandle(id,islike);
  }
}



export default Item;
