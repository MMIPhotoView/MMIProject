import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Modal,List,Avatar,Button  } from 'antd';
import {Link} from 'react-router-dom';

import './style.less'

class FansList extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate();
    this.state = {
        visible : false
    }
  }

  /**
   * 判断是否关注
   * @param {检查的id} id
   */
  isFollow(id) {
    const followList = this.props.followList;
    const result = followList.indexOf(id);
    console.log(followList)

    if (result == -1) {
        return <Button type='primary' size='small'>关注</Button>
    } else {
        return <Button  size='small'>已关注</Button>
    }

  }


  render() {

    const follow  = (
        <Button  size='small'>已关注</Button>
    )
    const unFollow  = (
        <Button type='primary' size='small'>关注</Button>
    )
    
    
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
                    <List.Item actions={ [this.isFollow(item.aid)]}>
                        <List.Item.Meta

                            avatar = {<Link to = {`/User/${item.aid}`} ><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></Link>}
                            title = {item.name}
                            description = {item.desc}
                        
                        />
                    </List.Item>


                )}

            />







        </Modal>


      </div>
    );
  }


}



export default FansList;
