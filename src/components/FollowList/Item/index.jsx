import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less'


class FollowItem extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate();
    this.state={
      isFollow : false
    }
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
            {
              this.state.isFollow
                ? <button style={{width:'80%',height:'80%'}} onClick={this.test.bind(this)} >关注</button>
                : <button style={{width:'80%',height:'80%'}} onClick={this.test.bind(this)} >未关注</button>

            }

          </div>
        </div>


        <hr />

      </div>
    );
  }

  test() {
    //alert(document.getElementsByClassName('boder button').innerHTML);
    this.setState({
      isFollow : true
    })


    console.log(123)
  }

}



export default FollowItem;
