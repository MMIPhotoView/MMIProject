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
        <div>item</div>
      </div>
    );
  }
}



export default FollowItem;
