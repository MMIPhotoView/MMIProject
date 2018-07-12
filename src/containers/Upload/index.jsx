import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UploadComponent from '../../components/Upload'

import {uploadImage} from '../../fetch/Photo/PhotoApi.js'


class Home extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
  }
  render() {
    return (
      <div>
        <UploadComponent upload = {this.uoload.bind(this)}/>
      </div>
    );
  }

  

}





export default Home;
