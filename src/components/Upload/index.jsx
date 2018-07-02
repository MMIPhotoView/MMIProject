import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Button, Icon, Modal, Affix, Upload, message,Tag, Input, Tooltip} from 'antd';
import './style.less'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  // const isJPG2 =  file.type === 'image/png'
  if (!isJPG2) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}
class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
    this.state = {
      visible: false,
      loading: false,
      tags: ['猫咪', '英短'],
      inputVisible: false,
      inputValue: '',
      photoName: '',
      img:''
    }
  }


  showModal = () => {
    this.setState({
      visible: true
    });
  }

  //提交和数据获取的函数
  handleOk = (e) => {
    console.log(e);
    console.log('photoName:',this.state.photoName);
    console.log('TagList:',this.state.tags);
    console.log('Photo:',this.state.img);
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

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false
      }));
    }
    this.setState({ img: info.file.originFileObj });
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
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
    this.setState({
      tags,
      inputVisible: false,
      inputValue: ''
    });
  }

  saveInputRef = input => this.input = input

  emitEmpty = () => {
    this.photoNameInput.focus();
    this.setState({ photoName: '' });
  }

  onChangePhotoName = (e) => {
    this.setState({ photoName: e.target.value });
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传照片</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    const { tags, inputVisible, inputValue } = this.state;
    const { photoName } = this.state;
    const suffix = photoName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;

    return (
      <div>
        <Affix offsetTop={this.state.top} onClick={this.showModal}>
          {/*<Icon type="plus-square-o" style={{fontSize:'80px',float:'left'}}/>*/}
          <span  style={{ float:'left', textAlign:'center', width: '80px'}}>上传照片</span>
        </Affix>

        <Modal
          title="上传照片"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>,
            <Button key="submit" type="primary" size="large"  onClick={this.handleOk.bind(this)}>
              提 交
            </Button>
          ]}>

          <div style={{float:'left'}}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="//jsonplaceholder.typicode.com/posts/"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
          </div>
          <div style={{clear:'left',paddingTop:'10px'}}>
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
          <div  style={{clear:'left',paddingTop:'15px'}}>
            <Input
              placeholder="请给你的照片起一个霸气的名字"
              prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={suffix}
              value={photoName}
              onChange={this.onChangePhotoName}
              ref={node => this.photoNameInput = node}
            />
          </div>

        </Modal>
      </div>
    );

  }
}



export default Home;
