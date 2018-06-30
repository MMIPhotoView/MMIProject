import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Link} from 'react-router-dom'
import FollowListComponent from '../FollowList'


import './style.less'

class UserTop extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate();
    this.state = {
      followOpen:false,
      fansOpen:false
    }
  }
  render() {
    return (
      <div>
      <div className='container'>
        <div className='user-top'>
          <div className={'icon'}>
            <div className="icon-img">
              <img alt="更改头像" className="be6sR" src="https://instagram.fhkg3-1.fna.fbcdn.net/vp/cad3042055d5dbed9baf5fb61da87da3/5BB51A8F/t51.2885-19/s320x320/23734310_1758883371081152_1640210429378560000_n.jpg"/>
            </div>
          </div>
          <div className={'user-data'}>

            <div className={'username'}>
                {this.props.userinfo.name}
                <Link to="/EditUserInfo">
                  <span>
                  <button className={'edit-btn'} >编辑个人资料</button>
                  </span>
                </Link>
            </div>
            <ul className={'count-list'}>
              <li className="list-item" onClick={this.editMyData}>
                <span>{this.props.photoCount}</span>
                 照片
              </li>
              {/* <Link to='/FollowList'> */}
              {/* <a href= '#'> */}
                <li className="list-item" onClick={this.onCloseListHandle.bind(this)}>
                    <span>{this.props.followList.length}</span>
                    关注
                </li>
              {/* </a> */}
                {/* </Link> */}

              <li className="list-item" onClick={this.onCloseFansListHandle.bind(this)}>
                  <span>{this.props.fansList.length}</span>
                  粉丝
              </li>
            </ul>

            <div className="user-desc">
              <span>{this.props.userinfo.desc}</span>
            </div>

          </div>
        </div>
        </div>
        <FollowListComponent
          toOtherUser = {this.toOtherUser.bind(this)}
          list = {this.props.followList}
          visible={this.state.followOpen}
          onClose={this.onCloseListHandle.bind(this)}
        />
        <FollowListComponent
          toOtherUser = {this.toOtherUser.bind(this)}
          list = {this.props.fansList}
          visible={this.state.fansOpen}
          onClose={this.onCloseFansListHandle.bind(this)}
        />
      </div>
    );
  }


  

  /**
   * 修改我的资料的跳转
   */
  editMyData() {
    // layer.msg('123')
  }

  /**
   * 关注列表弹出层
   */
  onCloseListHandle() {
    this.setState({
      followOpen : !this.state.followOpen
    });
  }

  onCloseFansListHandle() {
    this.setState({
      fansOpen : !this.state.fansOpen
    })
  }

  /**
   * 访问其他用户
   * @param {用户id} id
   */
  toOtherUser(id) {
    const toOU = this.props.toOtherUser;
    toOU(id);
  }

}



export default UserTop;
