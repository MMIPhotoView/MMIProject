import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less'


class FollowList extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
  }
  render() {
    return (
      <div>
        <div>FollowList</div>
      </div>
    );
  }
}



export default FollowList;
