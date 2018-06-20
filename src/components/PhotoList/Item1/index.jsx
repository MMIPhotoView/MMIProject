import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less'


class Item extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
  }
  render() {
    const data =this.props.data;
    return (
        <div className='tile'>
          <img src='../../../images/banner.jpg' />
          <div className='text'>

            <h3 className='animate-text'>{data.desc}</h3>
            <p className='animate-text'>{ `by:${ data.user_name }` }</p>
            <span className='animate-text glyphicon glyphicon-heart like' onClick={this.like.bind(this)}></span>
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
    layer.msg('点赞');
  }
}



export default Item;
