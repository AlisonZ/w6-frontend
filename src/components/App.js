import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Header from './shared/Header'
import Navigation from './shared/Navigation/Navigation'
import Login from './auth/Login.Form'
import Signup from './auth/Signup.Form'
import UsersContainer from './users/Container'
import { login, profile } from '../api/auth'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      currentUserId: null
    }

    this.loginUser = this.loginUser.bind(this)
    this.signupUser = this.signupUser.bind(this)
  }

   async loginUser (user) {

   const response = await login(user)
   const userInfo = await profile()


    console.log(response, userInfo);
  }

  signupUser (user) {
    console.log('Signing Up User:', user)
  }

  render () {
    return (
      <Router>
        <Header />
        <Navigation currentUserId={this.state.currentUserId} />
        <Switch>
          <Route path='/login' exact component={() => {
            return <Login onSubmit={this.loginUser} />
          }} />
          <Route path='/signup' exact component={() => {
            return <Signup onSubmit={this.signupUser} />
          }} />

          <Route path='/users' component={UsersContainer} />

          <Redirect to='/login' />
        </Switch>
      </Router>
    )
  }
}

export default App
