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
    const data = this.props.data;
    return (
      <div className='boder'>

        <div className='boder selection'>
          <div className='boder img_wrap'>

            <img
              alt="更改头像"
              className='img_icon'
              src={'https://instagram.fhkg3-1.fna.fbcdn.net/vp/cad3042055d5dbed9baf5fb61da87da3/5BB51A8F/t51.2885-19/s320x320/23734310_1758883371081152_1640210429378560000_n.jpg'}
            />

          </div>
          <div className='boder ifo_wrap'>
            <div className='ifo_1' >{data.name}</div>
            <div className='ifo_2'>{data.desc}</div>
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
    });
  }

  enterPage() {
    const to = this.props.toOtherUser
    to(this.props.data.aid)
  }

}



export default FollowItem;
