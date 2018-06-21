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
        <div className="login_m">
          <div className="login_boder" >
            <div className="login_padding">
              <h2>用户名</h2>

              <label style={{height:'45px'}}>
                <input type="text" id="username" className="txt_input txt_input2" placeholder = 'Your Username'
                       onChange = {this.usernameChangeHandle.bind(this)}  value = {this.state.username}/>
              </label>
              <h2>密码</h2>
              <label>
                <input type="password" name="textfield2" id="userpwd" className="txt_input" placeholder = 'Your Password'
                       onChange = { this.pwdChangeHandle.bind(this) } value = { this.state.pwd }/>
              </label>
              <p></p>
              <div className="rem_sub">
                <div className="rem_sub_l" style={{float:'left'}}>
                  <p>没有账号？<a href="javascript:void(0);">立即注册</a></p>

                </div>
                <label   style={{float:'right', marginRight:'10px'}}>
                  <button className="sub_button" onClick={this.clickHandle.bind(this)}>登陆</button>
                </label>
              </div>
            </div>
          </div>
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
