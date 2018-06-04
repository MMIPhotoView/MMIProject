import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getAllPhoto } from '../../fetch/home/home';
import LoginComponent from '../../components/Login'

import './style.less'

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
      this.state = {
        data : []
      }
    }
    render() {
        return (
          <div>
              <LoginComponent loginHandle = {this.loginHandle.bind(this)}/>
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
    console.log(username,password);
  }

}


export default Login
