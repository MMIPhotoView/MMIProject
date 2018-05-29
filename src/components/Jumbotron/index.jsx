import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less'


class Jumbotron extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
  }
  render() {
    return (
        <div className="jumbotron">
            <div className='container'>
                <h1>欢迎来到照片墙</h1>
                <p>此照片墙欢迎大家上传照片</p>
            </div>
      </div>
    );
  }
}



export default Jumbotron;
