import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Modify from './Modify';
import {Tag,Tooltip} from 'antd';

import './style.less'

class Home extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
    this.state = {
      visible: false,
      tags: ''
    }


  }
  render() {
    const data =this.props.data
    return (
      <div className='photo-block left'>
          <div className='pic'>
            <img src={data.photoUrl} alt="图片" />
          </div>

          <div className='cont'>

            {/* <div className='user-icon'><img src="../../../images/yeoman.png" alt="头像"/></div> */}
            <div className='user-name'><span>{`相片：${data.name}`}</span></div>
            <div className={'user-operate'}>
              {
                this.props.isme
                ? <Modify
                  delete={this.props.delete}
                  data = {data}
                  updatePhoto = {this.props.updatePhoto}
                  />
                  
                : ''
              }
              
              
            </div>
            <div style={{float:'right',paddingTop:'12px'}}>
              {data.label.split('#').map((tag, index) => {
                const isLongTag = tag.length > 20;
                const tagElem = (
                  <Tag key={index} closable={index < 0} afterClose={() => this.handleClose(tag)}>
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </Tag>
                );
                if(tag.length !== 0){
                  return isLongTag ? <Tooltip title={tag} key={index}>{tagElem}</Tooltip> : tagElem;
                }
              })}
            </div>
            <span className='store'>{'标签：'}</span>
          </div>

        </div>

    );
  }

  

  picClickHandle() {
    this.setState({
      visible:!this.state.visible
    });
  }


}



export default Home;
