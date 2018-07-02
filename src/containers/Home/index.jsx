import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Welcome from '../../components/Jumbotron'
import PhotoList from '../../components/PhotoList'

import { message} from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as storeActionFromFile from '../../actions/store.js'

import { getAllPhoto} from '../../fetch/home/home';

import TweenOne from 'rc-tween-one';


class Home extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate();
    this.state = {
      data : [],
      storeList : []

    }
  }
  render() {

    return (
      <TweenOne animation={[
        {x : '-1300px',duration:0},
        {x : '0px',duration:400 }
      ]}>
        <div className="index">
          <Welcome />
          <div style={{marginTop :'5%'}}></div>
          {
            this.state.data.length ? <PhotoList storeHandle={this.storeHandle.bind(this)} storeList={this.state.storeList} isMain={true} list = { this.state.data }/> : <div>加载中...</div>
          }
        </div>
      </TweenOne>
    );
  }

  componentDidMount() {

    // 判断是否登陆来初始化
    this.isLogin();

    // 获取所有的图片
    const result = getAllPhoto();
    result.then((res) => {
      return res.json();
    }).then((json) => {
      const data = json;
      this.setState({
        data : data
      })
    })
  }

  // 判断用户是否登陆
  isLogin() {
    const userid = this.props.userinfo.username;
    const storeList = this.props.store
    if (userid != null && userid !=='') {
      // 登陆了，初始化点赞列表
      this.setState({
        storeList: storeList
      });
      
      return true;
    } else {
      // 没登陆，不用初始化
      return false;
      
    }
  }

  /**
   * 收藏事件
   */
  storeHandle(id,isStore) {
    const loginFlag = this.isLogin();
    if (!loginFlag) {
      message.info('您还没登陆呢,请登陆再来吧~')
      return false;
    } else {
      const storeActions = this.props.storeActions;
      if (!isStore) {
        // 收藏

        message.success('点赞成功');
        storeActions.add(id);
        return true;
        
      } else {
        // 取消收藏
        message.info('取消点赞')
        storeActions.rm(id);
        return true;

      }
    }
  }
  
}






// -----------------------------redux-react绑定-----------------------------------
function mapStateToProps(state) {
  return {
      userinfo: state.userinfo,
      store: state.store

  }
}
function mapDispatchToProps(dispatch) {
  return {
      // userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
    storeActions: bindActionCreators(storeActionFromFile, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);