import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PhotoItem from './Item1'
import UserPhotoItem from './Item'

import './style.less'


class PhotoList extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
  }
  render() {
    const list = this.props.list;
    // const tempStroeList = this.props.storeList;
    // console.log(list)
    return (
      <div style={{margin:'0% 4% 0% 4%'}} className='main-block'>
        <div className='list-block'>
          {
            
            this.props.isMain
            ? (list.map((item, index) => {

              const isLikeFlag = this.props.storeList.indexOf(item.pid);
              if (isLikeFlag < 0) {
                // 没点赞
                return <PhotoItem storeHandle={this.props.storeHandle} isLike={false} key = { index } data= { item } />
              } else {
                // 点赞了
                return <PhotoItem storeHandle={this.props.storeHandle} isLike={true} key = { index } data= { item } />
              }
            }))
            : (list.map((item, index) => {
              return <UserPhotoItem
                updatePhoto = {this.props.updatePhoto}
                delete = {this.props.delete}
                isme = {this.props.isme}
                key={index}
                data = {item}/>
            }))


          }
        </div>
      </div>
    );
  }
}



export default PhotoList;
