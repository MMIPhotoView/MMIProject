import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UserTop from './UserTop'

class UserMain extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
  }
  render() {
    return (
      <div>
        <UserTop/>

      </div>
    );
  }
}



export default UserMain;
