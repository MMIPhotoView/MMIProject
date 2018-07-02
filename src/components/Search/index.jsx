import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './style.less'
import { Input,Icon } from 'antd';


class SearchItem extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()

  }

  render() {

    return (
      <div>

        <Icon type="search" style={{float:'left',marginTop:'13px',paddingLeft:'35%',marginRight:'5px',fontSize:'17px'}} onClick={this.test.bind(this)}/>
        <Input placeholder="搜索" style={{width:'15%',float:'left'}}/>

        {/*<div className={'input-bg'}>*/}
          {/*<input type="text" className={'search-input'} placeholder={'搜索'}/>*/}

          {/*<i className="layui-icon layui-icon-search" onClick={this.test.bind(this)}></i>*/}
        {/*</div>*/}
      </div>
    );
  }
  test() {
    alert("aaa");
  }

}
export default SearchItem;
