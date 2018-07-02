import React from 'react';
import { NavLink } from 'react-router-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './style.less'
import SearchComponent from '../Search'
import { Menu, Affix, Avatar, Icon } from 'antd';
import Upload from '../../components/Upload'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class Nav extends React.Component {

    constructor(props, context) {
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
          current: 'mail',
        }


    }
    render() {

        return (
            <div>
            <Affix offsetTop={0}>
                <Menu mode="horizontal">
                    <Menu.Item key="main">
                        <NavLink to={'/'}>首页</NavLink>
                    </Menu.Item>
                  <div >
                    <SearchComponent/>
                  </div>
                    <SubMenu style={{float:'right'}} title={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}>
                        <Menu.Item key="setting:1"><Icon type="user" />用户主页</Menu.Item>
                        <Menu.Item key="setting:2"><Icon type="logout" />注销</Menu.Item>

                    </SubMenu>

                    <Menu.Item key="user" style={{float:'right'}}>
                        <NavLink to={'/Login'}>登录</NavLink>
                    </Menu.Item>

                    <Menu.Item key="upload" style={{float:'right'}} >
                        {/*<div onClick={this.clickHandle.bind(this)}>*/}
                             {/*<Upload />*/}
                            {/*上传照片*/}
                        {/*</div>*/}
                        <div style={{height:'100%'}}>
                          <Upload />
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
