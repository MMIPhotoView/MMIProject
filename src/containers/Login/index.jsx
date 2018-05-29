import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getAllPhoto } from "../../fetch/home/home";

import './style.less'

class NotFound extends React.Component {
    constructor(props, context) {
        super(props, context);
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
      this.state = {
        data : []
      }
    }
    render() {
        console.log(12345)
        return (
            <h1>Login</h1>
        )
    }

  componentDidMount() {
    const result = getAllPhoto();
    result.then((res) => {
      return res.json();
    }).then((json) => {
      const data = json;
      this.setState({
        data : data
      })
    })
  }

}


export default NotFound
