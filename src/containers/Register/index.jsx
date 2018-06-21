import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import RegisterComponent from '../../components/Register'

import './style.less'


class Home extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
  }
  render() {
    return (
      <div>
        <RegisterComponent/>
      </div>
    );
  }


  componentDidMount () {

  }

}



export default Home;
