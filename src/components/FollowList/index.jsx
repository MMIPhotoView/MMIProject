import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Item from './Item'

import './style.less'


class FollowList extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate()
    this.state = {
      isFixed : true
    }
  }
  // render() {

  //   const item = [
  //                   {name:'name',fans:'12', follow:'13'},
  //                   {name:'name2',fans:'122', follow:'213'},
  //                   {name:'name3',fans:'112', follow:'313'}
  //               ];
  //   return (
  //     <div onClick={this.props.onClose} className='model fade-in'>
  //       {
  //         item.map((item, index) => {
  //           return <Item key={index} data = {item}/>
  //         })
  //       }
  //     </div>
  //   );
  // }

  /**
   * 初始化
   */
  componentDidMount() {
    if (this.props.visible) {
      this.setState({
        isFixed : true
      });
      this.render = this.renderCurrent;
    }
  
    
  }

  componentWillReceiveProps(np){
    /*
    * magic
    */
    if( this.props.visible !== np.visible ){
        if( !this.isFixed ){
            this.render    = this.renderCurrent;
            this.isFixed = true;
        }
    }
  }


  renderCurrent(){
    const { visible,onClose } = this.props;
    return (

    <div>
    <div onClick={onClose} style={{display:visible?'inline':'none'}} className={visible ? 'modal fade-in' : 'modal fade-out'}>
        
    </div>
    <div className='followList' style={{display:visible?'inline':'none'}}>
          {
            this.props.list.map((item, index) => {
              return <Item toOtherUser={this.props.toOtherUser.bind(this)} key={index} data = {item}/>
            })
          }
        </div>
    </div>
    

    )
  }
  render(){
      return <div/>
  }

}



export default FollowList;
