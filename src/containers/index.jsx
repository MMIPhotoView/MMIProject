import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import RouteMap from '../router/routeMap';
import Upload from './Upload'



import 'antd/dist/antd.css'
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


          
          
          <RouteMap/>


        </div>
       <Upload/>
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
