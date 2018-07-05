import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PhotoList from '../../../components/PhotoList'
import {searchPhoto} from '../../../fetch/Photo/PhotoApi.js'

import TweenOne from 'rc-tween-one'

const initialState = {
  photoList : []
}

class SearchList extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate();
    this.state = initialState
  }
  render() {
    return (
      <TweenOne animation={
        [
          {x : '-1200px',duration:0},
          {x : '0px',duration:400 }
        ]
      }>
      <div >
        <div style={{marginTop:'10%',marginLeft:'20%'}}>
          <h1>#{this.props.keywords}</h1>
        </div>

        <div style={{marginTop:'10%'}}>
          {
            this.state.photoList.length
            ? <PhotoList
              isme={false}
              isMain={false}
              list = { this.state.photoList }
              delete = {null}
              updatePhoto = {null}
              />
            : (<div style={{textAlign:'center'}}>
                <h2>没有此类型的照片</h2>

              </div>)
            }

        </div>
      </div>
      </TweenOne>
    );
  }

  componentDidMount() {
    
    this.searchPhoto();
    
  }

  searchPhoto() {
    // const result = searchPhoto()
    const label = this.props.keywords;

    const result = searchPhoto(label);
    result.then((res)=>{
      return res.json();
    }).then((json) => {
      this.setState({
        photoList:json
      });
    })
    
  }

  componentDidUpdate(prevProps) {
    const keyword = this.props.keywords;
    if (keyword === prevProps.keywords) {
      return ;
    }
    this.setState(initialState)

    this.searchPhoto();
  }
}



export default SearchList;
