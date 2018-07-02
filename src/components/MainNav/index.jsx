import React from 'react';
import { NavLink } from 'react-router-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './style.less'
// import SearchComponent from '../Search'
import { Menu, Affix } from 'antd';
// import Upload from '../../components/Upload'
 

class Nav extends React.Component {

    constructor(props, context) {
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        
    }

    render() {
        return (
            <div>
            <Affix offsetTop={0}>
                <Menu mode="horizontal">
                    <Menu.Item key="main">
                        <NavLink to={'/'}>首页</NavLink>
                    </Menu.Item>


                   
                
                    <Menu.Item key="user" style={{float:'right'}}>
                        <NavLink to={'/Login'}>用户</NavLink>
                    </Menu.Item>

                    <Menu.Item key="upload" style={{float:'right'}} >
                        <div onClick={this.clickHandle.bind(this)}>
                            {/* <Upload /> */}
                            上传照片
                        </div>

                    </Menu.Item>
                

                </Menu>
            </Affix>
            </div>
        );

    }

    componentDidMount() {
        this.setState({
            a:'a'
        })
    }


    clickHandle() {
        
        // this.setState({
        //     uploadVisable:!this.state.uploadVisable
        // });
        console.log(this.state.a)
    }
}


export default Nav;
