import React from 'react';
import { NavLink } from 'react-router-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './style.less'
import SearchComponent from '../Search'
import { Menu, Affix, Avatar, Icon } from 'antd';
import Upload from '../../components/Upload'


const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
class Nav extends React.Component {

    constructor(props, context) {
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
          current: 'index'
        }


    }
    handleClick= (e) => {
        this.setState({
            current: e.key
        });
        if (e.key === 'logout') {
            this.logoutHandle()
        }

        if (e.key === 'userMain') {
            this.toMain();
            // this.props.history.push(`/User/${this.props.username}`)
        }

    }
    render() {
        const data = this.props.userData;
        return (
            <div>
            <Affix offsetTop={0}>
                <Menu
                    mode="horizontal"
                    onClick={this.handleClick.bind(this)}
                    selectedKeys={[this.state.current]}
                >
                    <Menu.Item key="index">
                        <NavLink to={'/'}>首页</NavLink>
                    </Menu.Item>
                  <div >
                    <SearchComponent history={this.context.router.history}/>

                  </div>

                    {
                        (data.username!=null && data.username!=='')
                        ? (<SubMenu style={{float:'right'}} title={<span><Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'/>用户 - {data.userinfo.name} </span>}>
                        {/* ? (<SubMenu style={{float:'right'}} title={<span><Icon type="setting" />Navigation Three - Submenu</span>}> */}
                            <Menu.Item key="userMain"><Icon type="user" />
                                主页<NavLink to={`/User/${data.username}`}>  </NavLink>
                            </Menu.Item>
                            <Menu.Item key="logout"><Icon type="logout" />注销 </Menu.Item>
                          </SubMenu>)
                        : (<Menu.Item key="user" style={{float:'right'}}>
                            <NavLink to={'/Login'}>登录</NavLink>
                          </Menu.Item>)
                    }


                    

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



    /**
     * 注销
     */
    logoutHandle() {
        const logout = this.props.logoutHandle;
        logout();
    }

    toMain() {
        const toMain = this.props.toMain;
        toMain();
    }
}

Nav.contextTypes = {
    router : React.PropTypes.object
}

export default Nav;
