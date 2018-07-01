import { Button, Radio, Icon, Modal, Affix, Upload, message,Tag, Input, Tooltip} from 'antd';
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
      tags:['猫咪', '英短'],
      inputVisible: false,
      inputValue: '',
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
  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
      photoName: '',
    });
  }

  saveInputRef = input => this.input = input

  render() {
    const data = this.props.data;
    const { tags,inputVisible, inputValue } = this.state;
    const { photoName } = this.state;
    const suffix = photoName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;

    return (
      <div>
        <Icon type="setting" onClick={this.showModal} style={{fontSize:'30px'}}/>
        <Modal
          title="照片操作"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <div style={{float:'left'}}>
              <Icon type="delete" style={{fontSize:'32px',paddingRight:'12px',paddingTop:'4px'}}/>
              删除照片
            </div>,
            <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>,
            <Button key="submit" type="primary" size="large"  onClick={this.handleOk.bind(this)}>
              提 交
            </Button>
          ]}
        >

          <div>
            <Icon type="edit" style={{fontSize:'32px',paddingRight:'12px',paddingBottom:'15px'}}/>
            修改照片
          </div>
          <div style={{paddingBottom:'15px'}}>
            名称：原照片名字，蒋建聪你来改吧
            <Input style={{paddingTop:'8px'}}
              placeholder="请给你的照片重起一个霸气的名字"
              prefix={<Icon type="copy" style={{ color: 'rgba(0,0,0,.25)',marginTop:'10px' }} />}
              suffix={suffix}
              value={photoName}
              onChange={this.onChangePhotoName}
              ref={node => this.photoNameInput = node}
            />
          </div>
          <div style={{clear:'left',paddingTop:'10px'}}>
            标签：
            {tags.map((tag, index) => {
              const isLongTag = tag.length > 20;
              const tagElem = (
                <Tag key={tag} closable={index >= 0} afterClose={() => this.handleClose(tag)}>
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </Tag>
              );
              return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
            })}
            {inputVisible && (
              <Input
                ref={this.saveInputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Tag
                onClick={this.showInput}
                style={{ background: '#fff', borderStyle: 'dashed' }}
              >
                <Icon type="plus" /> New Tag
              </Tag>
            )}
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
