import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from '../containers/Home'
import NotFound from '../containers/404'
import Nav from '../components/MainNav'
import Login from '../containers/Login'
import UserPage from '../containers/UserPage'
import EditUserInfoPage from '../containers/EditUserInfo'
import FollowList from '../containers/FollowList'
import Register from '../containers/Register'

class RouterMap extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Nav />
                    <Switch >
                        <Route  exact path='/' component={Home}/>
                        <Route path='/Login' component={Login}/>
                        <Route path='/User' component={UserPage}/>
                        <Route path='/FollowList' component={FollowList}/>
                        <Route path='/EditUserInfo' component={EditUserInfoPage}/>
                        <Route path='/Register' component={Register}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>

            </Router>
        )
    }
}

export default RouterMap;
