import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './style.less'


class Home extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
  }
  render() {
    return (
      <div className='container'>
        <div>注册</div>
      </div>
    );
  }
}



export default Home;
