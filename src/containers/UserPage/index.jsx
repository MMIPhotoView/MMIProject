import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import UserTop from '../../components/UserTop'

import PhotoList from '../../components/PhotoList'

import { getAllPhoto} from '../../fetch/home/home';

import './style.less'


class UserPage extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      userDate : {},
      photoData : []
    }
  }
  render() {
    return (
      <div>
        <UserTop userData={this.state.userDate}/>
        <div style={{marginTop:'4%'}}></div>
        {
          this.state.photoData.length ? <PhotoList list = { this.state.photoData }/> : <div>加载中...</div>
        }

      </div>
    );
  }

  componentDidMount() {
    const userData = {};
    userData.username = '步步高';
    userData.photoNums = 10;
    userData.follow = 5;
    userData.fans = 8;
    userData.desc = '生活不局限吃饭';
    this.setState({
      userDate:userData
    });

    const result = getAllPhoto();
    result.then((res) => {
      return res.json();
    }).then((json) => {
      const data = json;
      console.log(data)
      this.setState({
        photoData : data
      })
    });

  }

}



export default UserPage;
