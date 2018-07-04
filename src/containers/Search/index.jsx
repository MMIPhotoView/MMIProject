import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SearchList from './SubPage/List'


class Home extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
  }
  render() {
    return (
      <div>
        <SearchList keywords={this.props.match.params.keyword} />
      </div>
    );
  }
}



export default Home;
