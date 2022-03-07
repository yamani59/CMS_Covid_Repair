import React from 'react'
import auth from './auth.svg'
import './auth.css'

class Auth extends React.Component {

  handleSubmit(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div className="form">
        <h1 className="form-title" >Authenticate</h1>
        <div className="form-header">
          <img src={auth} className="form-image" alt={auth} />
        </div>
        <div className="form-body">
          <Login />
        </div>
      </div>
    )
  }
}

class Login extends React.Component {
  render() {
    return (
      <div className="form-bind">
        <input type="text" name="username" placeholder="Username"/>
        <input type="password" name="password" placeholder="Password" />
        <input type="submit" value="submit" />
      </div>
    )
  }
}

export default Auth