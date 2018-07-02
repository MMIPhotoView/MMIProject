import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Modal,List  } from 'antd';
// import {Link} from 'react-router-dom';
import Item from './Item'

import './style.less'

class FansList extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate();
    this.state = {
        visible : false
    }
  }


  followClickHandle(e) {
      console.log(e)

  }

  /**
   * 判断是否关注
   * @param {检查的id} id
   */
//   isFollow(id) {
//     const followList = this.props.followList;
//     const result = followList.indexOf(id);
//     console.log(followList)

//     if (result == -1) {
//         return <Button onClick={this.followClickHandle.bind(this)} type='primary' size='small'>关注</Button>
//     } else {
//         return <Button onClick={this.followClickHandle.bind(this)} size='small'>已关注</Button>
//     }

//   }


  render() {
    
    
    return (
      <div>
        <Modal
            title={this.props.title}
            visible = { this.props.visible }
            onCancel = {this.props.onClose}
            footer = {
                [
                    null,
                    null
                ]
            }
        >
            <List
                size = 'small'
                itemLayout='horizaontal'
                dataSource = {this.props.list}
                renderItem={item => (
                    // <List.Item actions={ [this.isFollow(item.aid)]}>
                    //     <List.Item.Meta

                    //         avatar = {<Link to = {`/User/${item.aid}`} ><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></Link>}
                    //         title = {item.name}
                    //         description = {item.desc}
                        
                    //     />
                    // </List.Item>
                    <Item
                        followHandle={this.followHandle.bind(this)}
                        cancelFollowHandle={this.cancelFollowHandle.bind(this)}

                        item={item}
                        isFollow={this.props.followList.indexOf(item.aid)===-1?false:true}
                    
                    />
                )}

            />
        </Modal>


      </div>
    );
  }

    followHandle(id) {
        const follow =  this.props.followHandle;
        follow(id);

    }

    cancelFollowHandle(id) {
        const cancel = this.props.cancelFollowHandle;
        cancel(id);
    }


}



export default FansList;
