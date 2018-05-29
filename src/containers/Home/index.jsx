import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Welcome from '../../components/Jumbotron'
import PhotoList from '../../components/PhotoList'

import { getAllPhoto} from '../../fetch/home/home';


class Home extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate();
    this.state = {
      data : []

    }
  }
  render() {

    return (
      <div className="index">

        <div style={{marginTop :'5%'}}></div>
        <Welcome />
        <div style={{marginTop :'10%'}}></div>
        {
          this.state.data.length ? <PhotoList list = { this.state.data }/> : <div>加载中...</div>
        }


      </div>
    );
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



export default Home;
