import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import RouteMap from '../router/routeMap';



import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userInfoActionsFromOtherFile from '../actions/userinfo.js'

import 'antd/dist/antd.css'
import './style.less'





class App extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate();
    this.state = {
      initDone : false,
      isLogin : false
    }
  }

  render() {
    return (
     <div className='main-container'>
        <div className='header'>
          <RouteMap
            userData={this.props.userinfo}
            logoutHandle = {this.logoutHandle.bind(this)}
            toMain = {this.toMain.bind(this)}
          />

          
        </div>


     </div>
    )
  }

  componentDidMount() {
    this.setState({
      initDone : true
    });

  }

  toMain () {

  }

  logoutHandle() {
    const actions = this.props.userInfoActions;
    let userinfo = this.props.userinfo;

    actions.rm(userinfo);
  }

}


// -----------------------------redux-react绑定-----------------------------------
function mapStateToProps(state) {
  return {
      userinfo: state.userinfo
  }
}
function mapDispatchToProps(dispatch) {
  return {
      userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);