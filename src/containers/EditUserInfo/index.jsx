import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import EditUserInfoPage from '../../components/EditUserInfo'


class EditUserInfo extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
  }
  render() {
    return (
      <div>
        <EditUserInfoPage/>
      </div>
    );
  }
}



export default EditUserInfo;
