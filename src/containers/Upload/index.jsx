import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UploadComponent from '../../components/Upload'


class Home extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
  }
  render() {
    return (
      <div>
        <UploadComponent/>
      </div>
    );
  }
}



export default Home;
