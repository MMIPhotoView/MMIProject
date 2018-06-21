import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LoginComponent from '../../components/Login'
import UserMain from '../UserPage'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userInfoActionsFromOtherFile from '../../actions/userinfo.js'

import './style.less'

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
      this.state = {
        data : [],
        isLogin:false
      }
    }
    render() {
        return (
          <div>
            {
              this.state.isLogin
              ? <UserMain/>
              : <LoginComponent loginHandle={this.loginHandle.bind(this)}/>

            }
          </div>
        )
    }

  componentDidMount() {
    this.isLogin();
  }

  isLogin() {
    const userinfo = this.props.userinfo;
    if (userinfo.username) {
      // 已经登陆
      this.setState({
        isLogin : true
      });
    } else {
      // 未登陆
      this.setState({
        isLogin : false
      });
    }
  }

  /**
   * 登陆的方法
   * @param {账户名} username
   * @param {密码} password
   */
  loginHandle(username,password) {
    // alert(username,password);
    const actions = this.props.userInfoActions;
    let userinfo = this.props.userinfo;
    userinfo.username = username;
    actions.update(userinfo);
    this.setState ({
      isLogin:true
    })

  
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
)(Login);


