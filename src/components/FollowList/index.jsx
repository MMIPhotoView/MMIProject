import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Item from './Item'

import './style.less'


class FollowList extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
    this.state = {
      data : []
    }
  }
  render() {

    const item = [
                    {name:'name',fans:'12', follow:'13'},
                    {name:'name2',fans:'122', follow:'213'},
                    {name:'name3',fans:'112', follow:'313'}
                ];


    return (
      <div>
        {
          item.map((item, index) => {
            return <Item key={index} data = {item}/>
          })
        }
      </div>
    );
  }
}



export default FollowList;
