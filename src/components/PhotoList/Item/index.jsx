import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Modify from './Modify';
import {Tag,Tooltip,Icon,message} from 'antd';

import './style.less'

class Home extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
    this.state = {
      visible: false,
      tags: '',
      isLike: true,
      liker: ['渣渣辉、', '狗天乐'],
    }


  }

  render() {
    const data =this.props.data;
    const like = this.props.like;
    return (
      <div className='photo-block left'>
          <div className='pic'>
            <img src={data.photoUrl} alt="图片" />
          </div>

          <div className='cont'>

            {/* <div className='user-icon'><img src="../../../images/yeoman.png" alt="头像"/></div> */}
            <div className={'user-like'} onClick={this.handleLike.bind(this)}>
              {
                this.state.isLike ?
                  <Icon type="heart-o" style={{fontSize:'22px'}}/>
                  :<Icon type="heart" style={{fontSize:'22px',color:'#ff0000'}}/>

              }
            </div>
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
            <br/>
            <hr style={{marginTop:'25px',marginBottom:'10px'}}/>
            <div className={'user-liker'}>
              <div><span>{this.state.liker}点赞了</span></div>
            </div>


          </div>

        </div>

    );
  }



  picClickHandle() {
    this.setState({
      visible:!this.state.visible
    });
  }
  handleLike(){

    if(this.state.isLike){
      this.setState({
        isLike: false,
      });
      var aa = this.state.liker;
      aa[aa.length] = '、李爸爸';
      this.setState({
        liker: aa,
      });
      message.info("您已赞")
    }else {
      this.setState({
        isLike: true,
      });
      var aa = this.state.liker;
      for(var i = 0;i < aa.length;i++){
        if(aa[i]=='、李爸爸'){
          aa.splice(i,1);
        }
      }
      this.setState({
        liker: aa,
      });
      message.info("您已取消赞")
    }
  }

}



export default Home;
