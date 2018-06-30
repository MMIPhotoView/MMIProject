import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './style.less'


class SearchItem extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
  }

  render() {
    return (
      <div>
        <input type="text" className={'search-input'} placeholder={'搜索'}/>
        <div className={'input-bg'}>
          <i className="layui-icon layui-icon-search" onClick={this.test.bind(this)}></i>
        </div>
      </div>
    );
  }
  test() {
    alert("aaa");
  }

}
export default SearchItem;
