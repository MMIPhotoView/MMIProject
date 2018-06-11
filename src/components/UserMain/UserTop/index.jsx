import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './style.less'

class UserTop extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
  }
  render() {
    return (
      <div className='container'>
        <div className='user-top'>
          <div className={`icon`}>
            <img alt="更改头像" class="be6sR" src="https://instagram.fhkg3-1.fna.fbcdn.net/vp/cad3042055d5dbed9baf5fb61da87da3/5BB51A8F/t51.2885-19/s320x320/23734310_1758883371081152_1640210429378560000_n.jpg"/>
          </div>
          <div className={'user-data'}>
            <div className={`username`}>
              UserName
            </div>
            <ul className={`count-list`}>
              <li className="list-item">
                18 照片
              </li>
              <li className="list-item">
                18 关注
              </li>
              <li className="list-item">
                18 粉丝
              </li>
            </ul>
          </div>

        </div>

      </div>
    );
  }
}



export default UserTop;
