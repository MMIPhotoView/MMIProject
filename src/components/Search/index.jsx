import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './style.less'
import { Input,message } from 'antd';


class SearchItem extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
    // this.state = {
    //   value : ''
    // }
  }

  render() {
    const Search = Input.Search
    return (
      <div>
        <Search
          placeholder = '输入你感兴趣的！'
          onSearch={value => this.search(value)}
          style={{width:'20%',float:'left',marginTop:'5px',marginLeft:'35%'}}
        />

        {/* <Icon
          type="search"
          style={{float:'left',marginTop:'13px',paddingLeft:'35%',marginRight:'5px',fontSize:'17px'}}
          onClick={this.search.bind(this)}
        />
        <Input
          placeholder='输入你感兴趣的事物'
          // value={this.state.value}
          style={{width:'15%',float:'left'}}
          // onChange = {this.changeHandle.bind(this)}
          // onKeyUp = {this.keyUpHandle.bind(this)}
        /> */}

        
      </div>
    );
  }
  
  // changeHandle(e) {
  //   this.setState({
  //     value: e.target.value
  //   });
  // }



  

  search(value) {
    if (value === '') {
      message.warn('请输入搜索内容')
      return ;
    }
    const history = this.props.history;
    history.push(/search/+encodeURIComponent(value))
  }

}

SearchItem.contextTypes = {
  router : React.PropTypes.object
}
export default SearchItem;
