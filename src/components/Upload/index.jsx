import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Button, Radio, Icon, Modal, Affix} from 'antd';
import './style.less'

class Home extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
    this.state = {
      top:  150,
      visible: false,
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
        <Affix className={'affix-position'} offsetTop={this.state.top} onClick={this.showModal}>
          <Icon type="plus-square-o" style={{fontSize:'80px',float:'left'}}/>
          <span className={'affix-span'}>上传照片</span>
        </Affix>

        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >

          <div className={'modify-icon'}>
            <Icon type="edit" style={{fontSize:'32px',paddingRight:'12px'}}/>
            修改照片
          </div>
          <div className={'modify-icon'}>
            <Icon type="delete" style={{fontSize:'32px',paddingRight:'12px'}}/>
            删除照片
          </div>

        </Modal>
      </div>
    );
  }
}



export default Home;
