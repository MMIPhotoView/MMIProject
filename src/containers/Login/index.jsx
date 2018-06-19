import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LoginComponent from '../../components/Login'
import UserMain from '../UserPage'

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
              ? <LoginComponent loginHandle={this.loginHandle.bind(this)}/>
              : <UserMain/>

            }
          </div>
        )
    }

  componentDidMount() {

  }

  /**
   * 登陆的方法
   * @param {账户名} username
   * @param {密码} password
   */
  loginHandle(username,password) {
    // console.log(username,password);
    alert(username,password);
  }

}


export default Login
