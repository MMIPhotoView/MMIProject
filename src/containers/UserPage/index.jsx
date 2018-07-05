import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UserTop from '../../components/UserTop'

import PhotoList from '../../components/PhotoList'

import { getPhotoByUserId, updatePhotoData} from '../../fetch/Photo/PhotoApi';
import {Link} from 'react-router-dom'
import {getUserData,getUserFollowList, getUserFansList, follow, unFollow, updateUserInfo} from '../../fetch/User/UserApi'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo.js'
import TweenOne from 'rc-tween-one'
import {notification} from 'antd';

import './style.less'


class UserPage extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      userData : {},
      photoData : [],
      isme:false,
      followList:[],
      fansList:[],
      loginFollowList:[]
    }
  }
  render() {
    return (
      <TweenOne animation={[
        {x : '-1200px',duration:0},
        {x : '0px',duration:500 }
      ]}>
      <div>
        <UserTop
          style={{marginTop:'50px'}}
          toOtherUser = {this.toOtherUser.bind(this)}
          isme={this.state.isme}
          userinfo = { this.state.userData }
          followList = { this.state.followList}
          loginFollowList = {this.state.loginFollowList}
          fansList = { this.state.fansList }
          photoCount = { this.state.photoData.length }

          followHandle = {this.followHandle.bind(this)}
          cancelFollowHandle = {this.cancelFollowHandle.bind(this)}

          />
        
        <div style={{marginTop:'4%'}}></div>

        {

          this.state.photoData.length
          ? <PhotoList
            isme={this.state.isme}
            isMain={false}
            list = { this.state.photoData }
            delete = {this.deletePhoto.bind(this)}
            updatePhoto = {this.updatePhotoData.bind(this)}
            />
          : (<div style={{textAlign:'center'}}>
              <h3>还没有照片，快上传吧～！</h3>
              <p>
                
                前往<Link to='/'>首页</Link>查看更多人气图片~
              </p>

            </div>)


        }

      </div>
      </TweenOne>
    );
  }

  componentDidMount() {
    
    this.getUserDataById();
    
    this.isMe();

    this.getFollowList();

    this.getFansList();

    this.getUserPhotoList();
  }



  /**
   * 更新个人资料
   * @param {*} aid
   * @param {*} username
   * @param {*} userdesc
   */
  updateUserinfo(aid, username, userdesc) {
    const result = updateUserInfo(aid, username, userdesc);
    result.then((res)=>{
      return  res.json();
    }).then((json) => {
      if (json === '修改成功') {
        return true;
      } else {
        return false;
      }
    });
  }

  /**
   * 更新照片信息
   * @param {*} pid
   * @param {*} pname
   * @param {*} pdesc
   * @param {*} plabel
   */
  updatePhotoData(pid, pname, pdesc, plabel) {
    console.log(pid, pname, pdesc, plabel)
    const result = updatePhotoData(pid, pname, pdesc, plabel);
    result.then((res) => {
      return res.json();
    }).then(() => {
      this.getUserPhotoList()
    });
  }

  /**
   * 删除照片
   */
  deletePhoto(pid) {
    console.log(`pid:${pid}`)

    // 写调用服务器
    this.setState({
      photoData : this.state.photoData.filter((item)=>item.pid != pid)
    });

    return true;
  }



  followHandle(id) {
    // console.log(`处理关注的,${id}`)
    console.log(this.state.isme)
    if (this.props.userinfo.username != null && this.props.userinfo.username!=='') {
      // 登陆成功
      const fromid = this.props.userinfo.username;
      const result = follow(fromid, id);
      result.then((res) => {
        return res.json();
      }).then((json) => {
        const temp = json;
        this.state.loginFollowList.push(temp);
        notification['success']({
          message: '关注成功',
          description: `关注用户${json.name}成功`,
          duration: 1.5,
          top:300
        });
      });


    } else {
      notification['error']({
        message: '尚未登陆',
        description: '请登陆后再尝试',
        duration: 1.5,
        top:300
      });
    }
  }

  cancelFollowHandle(id) {
    console.log(`处理取消关注的,${id}`)
    if (this.props.userinfo.username != null && this.props.userinfo.username!=='') {
      // 登陆成功
      const fromid = this.props.userinfo.username;
      const result = unFollow(fromid, id);
      result.then((res) => {
        return res.json();
      }).then(() => {
        
        if (this.state.isme) {
          const tempList = this.state.followList.filter((item)=>{
            return item.aid !== id;
          });
          this.setState({
            followList : tempList
          });
        } else {
          const tempList = this.state.loginFollowList.filter((item)=>{
            return item.aid !== id;
          });
          this.setState({
            loginFollowList : tempList
          });
        }
        notification['success']({
          message: '取消成功',
          description: '取消关注成功',
          duration: 1.5,
          top:300
        });
      });
    } else {
      notification['error']({
        message: '尚未登陆',
        description: '请登陆后再尝试',
        duration: 1.5,
        top:300
      });
    }
  }



  /**
   * 获取用户的照片列表
   */
  getUserPhotoList() {
    const id = this.props.match.params.id;
    if (id != null) {
      const photoList = getPhotoByUserId(id);
      photoList.then((res)=> {
        return res.json();
      }).then((json)=> {
        const result = json;
        
        this.setState({
          photoData:result
        });
      });
    }
  }



  /**
   * 获取关注列表
   */
  getFollowList() {
    const id = this.props.match.params.id;
    if (id != null) {
      const followList = getUserFollowList(id);
      followList.then((res)=>{
        return res.json();
      }).then((json)=>{
        const result = json;
        this.setState({
          followList:result
        })
      })
    } else {
      this.props.history.push('/404')
    }

    const loginId = this.props.userinfo.username;
    if (loginId != null) {
      const loginFollowList = getUserFollowList(loginId);
      loginFollowList.then((res)=>{
        return res.json();
      }).then((json)=>{
        const result = json;
        this.setState({
          loginFollowList:result
        })
      })
    }
  }


  /**
   * 获取粉丝列表
   */
  getFansList() {
    const id = this.props.match.params.id;
    if (id != null) {
      const fansList = getUserFansList(id);
      fansList.then((res) => {
        return res.json();
      }).then((json) => {
        const result = json;
        this.setState({
          fansList : result
        });
      });
    } else {
      this.props.history.push('/404');
    }
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

  /**
   * 根据id访问其他User
   * @param {用户} id
   */
  toOtherUser(id) {
    this.props.history.push(`/User/${id}`);
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