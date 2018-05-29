import React from 'react';
import { NavLink } from 'react-router-dom'
import './style.less'


class Nav extends React.Component {

  render() {
    return (
        <div className={'nav-container'}>
            {/* <div>
                <Link  to='/'> <button className='layui-btn' onClick={this.clickHandle.bind(this)}>主页</button></Link> |&nbsp;
                <Link to='/Login'><button className='layui-btn'>login页</button></Link> |&nbsp;
            </div>
             */}
             <div className='layui-row low'>
                <div className='col-md-3 logo'><i className="layui-icon layui-icon-face-smile" ></i></div>
                <div className='col-md-9 nav-list'>
                    <div className={'main-menu'}>
                        <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                <li><NavLink exact activeClassName='active' className='item' to='/'>主页</NavLink></li>
                                <li><NavLink activeClassName='active' className='item' to='/404'>404</NavLink></li>
                                <li><NavLink activeClassName='active' className='item nav-user' to='/Login'>
                                    <span className='glyphicon glyphicon-user'></span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
             </div>


        </div>
    );
  }
  clickHandle() {


    

  }
}


export default Nav;
