import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Modify from './Modify';

import './style.less'

class Home extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()

    this.state = { visible: false }

  }
  render() {
    const data =this.props.data
    return (
      <div className='photo-block left'>
        <div>
          <Modify/>
        </div>

          <div className='pic' onClick={this.picClickHandle.bind(this)}>
            <img src="../../../images/banner.jpg" alt="图片"/>
          </div>

          <div className='cont'>
            <span className='store'>{`标签：${data.label}`}</span>
            {/* <div className='user-icon'><img src="../../../images/yeoman.png" alt="头像"/></div> */}
            <div className='user-name'><span>{`相片：${data.name}`}</span></div>
          </div>

        </div>

    );
  }

  picClickHandle() {



  }


}



export default Home;
