import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './style.less'


class Home extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
  }
  render() {
    return (
      <div className='container'>
          <div className="login_m">
            <div className="login_boder" >
              <div className="login_padding">
                <h2 style={{paddingTop:'5%'}}>用户名</h2>
                <label style={{height:'5px'}}>
                  <input type="text" id="username" className="txt_input txt_input2" placeholder = 'Your Username'
                           value = ""/>
                </label>
                <h2 style={{paddingTop:'5%'}}>密码</h2>
                <label style={{height:'5px'}}>
                <input type="password" name="textfield2" id="userpwd" className="txt_input" placeholder = 'Your Password'
                         value = ""/>
                </label>
                <h2 style={{paddingTop:'5%'}}>再次输入</h2>
                <label style={{height:'5px'}}>
                  <input type="password" name="textfield2" id="userpwd" className="txt_input" placeholder = 'Your Password'
                         value = ""/>
                </label>
                <p></p>
                <div className="rem_sub">

                  <label   style={{float:'right', marginRight:'10px', marginTop:'10px'}}>
                    <button className="sub_button">注册</button>
                  </label>
                </div>
              </div>
            </div>
          </div>
      </div>

    );
  }
}



export default Home;
