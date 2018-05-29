import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import RouteMap from '../router/routeMap';
import { hashHistory } from 'react-router'
import './style.less'





class App extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate();
    this.state = {
      initDone : false
    }
  }

  render() {

    return (
     <div className='main-container'>
        <div className='header'>
          <RouteMap history={hashHistory}/>


        </div>
     </div>
    )
  }

componentDidMount() {
  this.setState({
    initDone : true
  })
}

}



export default App;
