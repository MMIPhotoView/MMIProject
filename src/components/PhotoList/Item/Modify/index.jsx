import {Button, Icon, Modal,Tag, Input, Tooltip, Popconfirm, message} from 'antd';
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './style.less'

class App extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
    this.state = {
      top: 150,
      visible: false,
      loading: false,
      tags: ['猫咪', '英短'],
      inputVisible: false,
      inputValue: '',
      photoName: '',
      img:'',
      loadinng : true
    }


  }

  showModal = () => {
    this.setState({
      visible: true,
      photoName:this.props.data.name
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false
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
      photoName: ''
    });
  }
  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  }
  onChangePhotoName = (e) => {
    this.setState({ photoName: e.target.value });
  }
  saveInputRef = input => this.input = input

  emitEmpty = () => {
    this.photoNameInput.focus();
    this.setState({ photoName: '' });
  }
  render() {
    const data = this.props.data;
    const { tags,inputVisible, inputValue } = this.state;
    const { photoName } = this.state;
    const suffix = photoName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;

    return (
      <div>
        
        <Icon type="setting" onClick={this.showModal.bind(this)} style={{fontSize:'30px'}}/>
        <Modal
          title="照片操作"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <div style={{float:'left',height:'30px'}}>

              <Popconfirm title='你确定要删除这个图片吗' onConfirm={this.confirm.bind(this)} onCancel={this.cancel.bind(this)} okText="确认删除" cancelText="取消">
                <Button type='danger' size='small'><Icon type="delete" />删除</Button>
              </Popconfirm>
            </div>,
            <Button key="submit" type="primary" size="large" style={{backgroundColor:'#FFFFFF',borderColor:'#FFFFFF'}}>

            </Button>,
            <div style={{float:'right'}} size="large" >
              <Button onClick={this.save.bind(this)} size='small' type='primary'><Icon type="save" />保存</Button>
            </div>
          ]}
        >

          <div>
            <Icon type="edit" style={{fontSize:'32px',paddingRight:'12px',paddingBottom:'15px'}}/>
            修改照片
          </div>
          <div style={{paddingBottom:'15px',paddingTop:'10px'}}>
            名称：{data.name}
            <Input style={{paddingTop:'0px'}}
              placeholder="请给你的照片重起一个霸气的名字"
              prefix={<Icon type="copy" style={{ color: 'rgba(0,0,0,.25)',fontSize:'16px',marginTop:'5px' }} />}
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
                <Tag key={`Tag${index}`} closable={index >= 0} afterClose={() => this.handleClose(tag)}>
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </Tag>
              );
              return isLongTag ? <Tooltip title={tag} key={index}>{tagElem}</Tooltip> : tagElem;
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
        {/* <Spin size='large' className='loading' spinning={!this.state.loading}/> */}
        
      </div>
    );
  }

  save(){
    const saveFn = this.props.updatePhoto;
    const data = this.props.data;
    const pid = data.pid;
    const name = this.state.photoName;
    let label = '';
    this.state.tags.forEach((item) => {
      label = `${label}#${item}`;
    });

    saveFn(pid, name, 'desc',label);
    this.setState({
      visible: false
    
    });
    message.success('修改成功');
    
    
  }

  confirm() {
    // loading
    const deletePhoto = this.props.delete;
    message.success('删除成功');
    const result = deletePhoto(this.props.data.pid);
    this.setState({
      visible: result?false:true
    });

    // endLoading
  }
  cancel() {
    message.success('留作纪念嘛~');
  }

  /**
   * 删除
   */
  delete(){
    // const deletePhoto = this.props.delete;
    // const result = deletePhoto(this.props.data.pid);
    // this.setState({
    //   visible: result?false:true
    // })

  }
}


export default App;
