import React, { Component } from "react";
// import {Link, Route} from 'react-router-dom';
// import Calendar from '../Calendar/Calendar';

class Login extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    //handle form processing here....
  }

  render() {

    const { email, password, confirmPassword } = this.state;

    return (
      <div className="container">
        <form
          className="form-signin"
          onSubmit={this.onSubmit}
        >
          <h2 className="form-signin-heading">
            Create Account
          </h2>

          <div className="form-group">
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Email address"
              value={email}
              onChange={this.onChange}
              autoFocus
            />
            <span className="help-block"></span>
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={this.onChange}
            />
            <span className="help-block"></span>
          </div>

          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={this.onChange}
            />
            <span className="help-block"></span>
          </div>
        
           
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
          >
            Login

          </button>
        </form>
      </div>
    );
  }
};

export default Login