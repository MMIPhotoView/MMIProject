import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less'


class EditUserInfo extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
  }
  render() {
    return (
      <div>
        <div>编辑界面</div>
      </div>
    );
  }
}



export default EditUserInfo;
