import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less'


class FollowItem extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
  }
  render() {
    return (
      <div>
        <button style={{height:'30px'}} onClick={this.test} >sdsdsdsdsdsdsds</button>
      </div>
    );
  }

  test() {
    alert('123')
  }

}



export default FollowItem;
