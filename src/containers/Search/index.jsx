import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SearchList from './SubPage/List'

import TweenOne from 'rc-tween-one'


class Home extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
  }
  render() {
    return (
      <TweenOne animation={
        [
          {x : '-1200px',duration:0},
          {x : '0px',duration:400 }
        ]
      }>
      <div>
        
        <SearchList keywords={this.props.match.params.keyword} />
      </div>
      </TweenOne>
    );
  }
}



export default Home;
