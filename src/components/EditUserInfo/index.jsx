import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less'


class EditUserInfo extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
  }
  render() {
    return (
      <div>

        <div id={'outAll'}>
          <div id={'outAll1'}>
            <div id={'clipArea'}></div>
            <div id={'outAll3'}>
              <button id="clipBtn">上传头像</button>
            </div>
          </div>
        </div>

        <div>
          <div id={'view'} title={'请上传 428*321 的图片'}></div>
          <div id={'blank'}></div>
          <div id={'outAll4'}>
            编辑头像
          </div>
        </div>
      </div>
    );
  }


}



export default EditUserInfo;
