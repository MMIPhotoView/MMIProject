import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less'


class FollowItem extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
  }
  render() {
    return (
      <div className='boder'>

        <div className='boder selection'>
          <div className='boder img_wrap'>
            <img alt="更改头像" className='img_icon' src=""/>
          </div>
          <div className='boder ifo_wrap'>
            <div className='ifo_1'>aaaaaaaaa</div>
            <div className='ifo_2'>bbbbsadsafsafsabbbbbbbb</div>
          </div>
          <div className='boder button'>
            <button style={{width:'80%'}} onClick={this.test} >关注</button>
          </div>
        </div>


        <hr />

      </div>
    );
  }

  test() {
    alert('123')
    //alert(document.getElementsByClassName('boder button').innerHTML);
  }

}



export default FollowItem;
