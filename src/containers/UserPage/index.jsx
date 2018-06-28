import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UserTop from '../../components/UserTop'

import PhotoList from '../../components/PhotoList'

import { getAllPhoto} from '../../fetch/home/home';
import {getUserData} from '../../fetch/User/UserApi'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo.js'

import './style.less'


class UserPage extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      userData : {},
      photoData : [],
      isme:false
    }
  }
  render() {
    console.log()
    return (
      <div>
        <UserTop isme={this.state.isme} userinfo = { this.state.userData }/>
        <div style={{marginTop:'4%'}}></div>
        {
          this.state.photoData.length ? <PhotoList isme={this.state.isme} isMain={false} list = { this.state.photoData }/> : <div>加载中...</div>
        }

      </div>
    );
  }

  componentDidMount() {
    
    this.getUserDataById();
    
    this.isMe();

    const result = getAllPhoto();
      result.then((res) => {
        return res.json();
      }).then((json) => {
        const data = json;
        this.setState({
          photoData : data
        })
      });

  }

  /**
   * 打开的是否自己的首页
   */
  isMe(){
    // 首先获取userinfo
    if (this.props.userinfo.username != null && this.props.userinfo.username!=='') {
      if (this.props.userinfo.username == this.props.match.params.id) {
        // 登陆的帐号和访问的一样
        this.setState({
          isme : true
        });
      }
    } else {
      this.setState({
        isme : false
      });
    }

  }

  /**
   * 根据id字段请求用户信息
   */
  getUserDataById() {
    console.log(this.props.match.params.id != null)
    if (this.props.match.params.id != null) {
      const result = getUserData(this.props.match.params.id);
      if (result != null) {
        // 加载数据
        result.then((res) => {
          return res.json();
        }).then((json) => {
          const resultData = json;
          this.setState({
            userData : resultData
          });
        });
      } else {
        // 跳转登陆页面
      }
    } else {
      // 未登陆，跳转主界面
      this.props.history.push('/');

    }
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
)(UserPage);