import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LoginComponent from '../../components/Login'
import UserMain from '../UserPage'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userLoginIn } from '../../fetch/User/UserApi'

import * as userInfoActionsFromOtherFile from '../../actions/userinfo.js'

import './style.less'

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
      this.state = {
        data : [],
        isLogin:false,
        userId : ''
      }
    }
    render() {
        return (
          <div>
            {
              this.state.isLogin
              ? <UserMain userId = {this.state.userId}/>
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
    const actions = this.props.userInfoActions;
    let userinfo = this.props.userinfo;

    const result = userLoginIn(username, password);
    result.then(res => {
      return res.json();
    }).then(json => {
      if(json.isLogin) {
        // 登陆成功
        userinfo.username = json.account.id;
        actions.update(userinfo);
        // userinfo.userid = json.id 没写到里面
        this.setState ({
          isLogin:true,
          userid : json.account.id
        });
      } else {
        layer.msg('帐号密码错误', {icon: 5});
      }
    });
    
    // userinfo.username = username;
    // actions.update(userinfo);

    

  
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


