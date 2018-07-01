import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { List,Avatar,Button  } from 'antd';
import {Link} from 'react-router-dom'

import './style.less'


class FollowItem extends React.Component {

  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate();

    
    this.state = {
      visible : false
    }
  }
  render() {
    const item = this.props.item
    const followBtn = <Button onClick={this.cancelFollowHandle.bind(this)} type='primary' size='small'>已关注</Button>
    const unFollow = <Button onClick={this.followHandle.bind(this)} size='small'>关注</Button>
    return (
      <List.Item actions={[ this.props.isFollow?followBtn:unFollow]}>
      <List.Item.Meta

          avatar = {<Link to = {`/User/${item.aid}`} ><Avatar src="http://localhost:8888/images/kiwi1.jpeg" /></Link>}
          title = {item.name}
          description = {item.desc}
      />
      </List.Item>
    );
  }

  followHandle() {
    
    this.props.followHandle(this.props.item.aid);
  }
  cancelFollowHandle() {
    this.props.cancelFollowHandle(this.props.item.aid);
  }

 

  

}



export default FollowItem;
