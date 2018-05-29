import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less'


class UserPage extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    
  }
  render() {
    return (
      <div>
        <div>UserPage</div>
      </div>
    );
  }
}



export default UserPage;
