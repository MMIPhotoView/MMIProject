import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less'


class Home extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()

  }
  render() {
    const data =this.props.data
    return (
      <div className='photo-block left'>

          <div className='pic' onClick={this.picClickHandle.bind(this)}>
            <img src="../../../images/banner.jpg" alt="图片"/>
          </div>

          <div className='cont'>
            <span className='store'>{`用户：${data.user_name}`}</span>
            <div className='user-icon'><img src="../../../images/yeoman.png" alt="头像"/></div>
            <div className='user-name'><span>{`相片：${data.photo_name}`}</span></div>
          </div>

        </div>

    );
  }

  picClickHandle() {



  }


}



export default Home;
