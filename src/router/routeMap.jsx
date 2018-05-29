import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from '../containers/Home'
import NotFound from '../containers/404'
import Nav from '../components/MainNav'
import Login from '../containers/Login'
import UserPage from '../containers/UserPage'

class RouterMap extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Nav />
                    <Switch>
                        <Route  exact path='/' component={Home}/>
                        <Route path='/Login' component={Login}/>
                        <Route path='/User' component={UserPage}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>

            </Router>
        )
    }
}

export default RouterMap;