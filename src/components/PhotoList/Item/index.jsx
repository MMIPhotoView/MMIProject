import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Modify from './Modify';
import {Icon,Tag,Tooltip} from 'antd';

import './style.less'

class Home extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
    this.state = {
      visible: false,
      tags: '',
    }


  }
  render() {
    const data =this.props.data
    return (
      <div className='photo-block left'>



          <div className='pic' onClick={this.picClickHandle.bind(this)}>
            <img src="../../../images/banner.jpg" alt="图片" />
          </div>

          <div className='cont'>

            {/* <div className='user-icon'><img src="../../../images/yeoman.png" alt="头像"/></div> */}
            <div className='user-name'><span>{`相片：${data.name}`}</span></div>
            <div className={'user-operate'}>
              <Modify/>
            </div>
            <div style={{float:'right',paddingTop:'12px'}}>
              {data.label.split('#').map((tag, index) => {
                const isLongTag = tag.length > 20;
                const tagElem = (
                  <Tag key={tag} closable={index < 0} afterClose={() => this.handleClose(tag)}>
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </Tag>
                );
                if(tag.length !== 0){
                  return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                }
              })}
            </div>
            <span className='store'>{`标签：`}</span>
          </div>

        </div>

    );
  }

  picClickHandle() {
    this.setState({
      visible:true
    })



  }


}



export default Home;
