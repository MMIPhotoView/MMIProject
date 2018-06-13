import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less'

class UserTop extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
  }
  render() {
    return (
      <div className='container'>
        <div className='user-top'>
          <div className={'icon'}>
            <div className="icon-img">
              <img alt="更改头像" className="be6sR" src="https://instagram.fhkg3-1.fna.fbcdn.net/vp/cad3042055d5dbed9baf5fb61da87da3/5BB51A8F/t51.2885-19/s320x320/23734310_1758883371081152_1640210429378560000_n.jpg"/>
            </div>
          </div>
          <div className={'user-data'}>

            <div className={'username'}>
                {this.props.userData.username}
                <a href="/EditUserInfo">
                  <span>
                  <button className={'edit-btn'} >编辑个人资料</button>
                  </span>
                </a>
            </div>


            <ul className={'count-list'}>
              <li className="list-item" onClick={this.editMyData}>
                <span>{this.props.userData.photoNums}</span>
                 照片

              </li>
              <li className="list-item">
                <span>{this.props.userData.follow}</span>
                关注
              </li>
              <li className="list-item">
                <span>{this.props.userData.fans}</span>
                粉丝
              </li>
            </ul>

            <div className="user-desc">
              <span>{this.props.userData.desc}</span>
            </div>

          </div>

        </div>

      </div>
    );
  }

  /**
   * 修改我的资料的跳转
   */
  editMyData() {
    // layer.msg('123')
  }






}



export default UserTop;
