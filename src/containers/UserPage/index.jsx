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
      userId : ''
    }
  }
  render() {
    return (
      <div>
        <UserTop userinfo = { this.state.userData }/>
        <div style={{marginTop:'4%'}}></div>
        {
          this.state.photoData.length ? <PhotoList list = { this.state.photoData }/> : <div>加载中...</div>
        }

      </div>
    );
  }

  componentDidMount() {
    
    this.getUserDataById();
    
    // this.setState({
    //   userDate:userData
    // });

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
   * 根据id字段请求用户信息
   */
  getUserDataById() {
    if (this.props.userinfo.username != null) {
      const result = getUserData(this.props.userinfo.username);
      if (result != null) {
        // 加载数据
        result.then((res) => {
          return res.json();
        }).then((json) => {
          const resultData = json;
          this.setState({
            userData : resultData,
            text : '3'
          });
        });
      } else {
        // 跳转登陆页面
      }
    } else {
      // 未登陆，跳转登陆界面
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