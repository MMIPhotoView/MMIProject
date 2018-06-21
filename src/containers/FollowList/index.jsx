import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
// import FollwoListComponent from '../../components/FollowList'



class FollowList extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
  }
  render() {
    return (
      <div>
        {/* <FollwoListComponent/> */}
      </div>
    );
  }
}



export default FollowList;
