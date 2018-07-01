
import { Button, Radio, Icon, Modal } from 'antd';
import React from 'react';
import PureRenderMixin from "react-addons-pure-render-mixin";
import './style.less'

class App extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
    this.state = {
      visible: false,
      size: 'large',
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
        <Icon type="setting" onClick={this.showModal} style={{fontSize:'30px'}}/>
        <Modal
          title="图片操作"
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

  componentDidMount(){

  }

  test(){
    alert("aaa");
  }

}


export default App;
