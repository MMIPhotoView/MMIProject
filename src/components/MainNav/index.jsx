import React from 'react';
import { NavLink } from 'react-router-dom'
import './style.less'
// import SearchComponent from '../Search'
import { Menu, Affix } from 'antd';


class Nav extends React.Component {

//   render() {
//     return (
//         <div className={'nav-container'}>
//             {/* <div>
//                 <Link  to='/'> <button className='layui-btn' onClick={this.clickHandle.bind(this)}>主页</button></Link> |&nbsp;
//                 <Link to='/Login'><button className='layui-btn'>login页</button></Link> |&nbsp;
//             </div>
//              */}
//              <div className='layui-row low'>
//                 <div className='col-md-1 logo'>
//                   <NavLink exact activeClassName='active' className='item' to='/'>
//                     <i className="layui-icon layui-icon-face-smile" ></i>
//                   </NavLink>
//                 </div>
//                 <div className={'col-md-3'}></div>
//                <div className={'col-md-4 search-bar'}>
//                  <SearchComponent/>
//                </div>

//                 <div className={'col-md-3'}></div>


//                 <div className='col-md-1 nav-list'>
//                     <div className={'main-menu'}>
//                         <div className="collapse navbar-collapse">
//                             <ul className="nav navbar-nav navbar-right">
//                                 {/*<li><NavLink exact activeClassName='active' className='item' to='/'>主页</NavLink></li>*/}
//                                 {/*<li><NavLink activeClassName='active' className='item' to='/404'>404</NavLink></li>*/}
//                                 <li><NavLink className='item nav-user' to='/Login'>
//                                     <span className='glyphicon glyphicon-user'></span>
//                                     </NavLink>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>

//              </div>


//         </div>
//     );
//   }

    render() {
        return (
            <Affix offsetTop={0}>
                <Menu mode="horizontal">
                    <Menu.Item key="main">
                    <NavLink to={'/'}>首页</NavLink>
                    </Menu.Item>
                
                    <Menu.Item key="user">
                    <NavLink to={'/Login'}>用户</NavLink>
                    </Menu.Item>
                

                </Menu>
            </Affix>
        );

    }
  clickHandle() {




  }
}


export default Nav;
