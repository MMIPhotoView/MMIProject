import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less'

class Login extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
    this.state = {
        pwd : '',
        username : ''
    }
  }
  render() {
    return (
      <div>
        <div id='login-form'>
            <label>登陆标志</label>
            <input type = "text"
                placeholder = '请输入账号'
                onChange = {this.usernameChangeHandle.bind(this)}
                value = {this.state.username}
                />
            <input type = "text"
                placeholder = '请输入密码'
                value = { this.state.pwd }
                onChange = { this.pwdChangeHandle.bind(this) }
                />
            <button style={{color:'white'}} onClick={this.clickHandle.bind(this)}>登陆</button>
        </div>
      </div>
    );
  }


  /**
   * 用户名账号的变化
   * @param {绑定的dom} e
   */
  usernameChangeHandle(e) {
      this.setState({
        username: e.target.value
      });
  }

  /**
   * 用户密码的变化
   * @param {绑定的dom} e
   */
  pwdChangeHandle(e) {
    this.setState({
      pwd: e.target.value
    });
}

  /**
   * 登陆监听
   */
  clickHandle() {
    const username = this.state.username;
    const password = this.state.pwd;
    const loginHandle = this.props.loginHandle;
    loginHandle(username,password);
  
}



}



export default Login;
