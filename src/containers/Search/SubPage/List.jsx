import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';


class SearchList extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
  }
  render() {
    return (
      <div>

        <div>{this.props.keywords}</div>
      </div>
    );
  }
}



export default SearchList;
