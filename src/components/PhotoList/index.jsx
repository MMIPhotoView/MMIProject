import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PhotoItem from './Item'

import './style.less'


class PhotoList extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
  }
  render() {
    const list = this.props.list
    console.log(list)
    return (
      <div className='container main-block'>
        <div className='list-block'>
          {
            list.map((item, index) => {
              return <PhotoItem key = { index } data= { item } />
            })
          }
        </div>
      </div>
    );
  }
}



export default PhotoList;
