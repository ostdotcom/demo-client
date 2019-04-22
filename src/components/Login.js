import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      redirect: false
    };
    this.auth = AuthService;
  }

  handleUsernameChange = (event) => {
    let value = event.target.value;
    this.setState({
      username: value
    });
  };

  handlePasswordChange = (event) => {
    let value = event.target.value;
    this.setState({
      password: value
    });
  };

  submitForm = () => {
    let params = {
      username: this.state.username,
      password: this.state.password
    };
    this.auth.signIn(params, this.successCallback, this.props.match.params.tokenId, this.props.match.params.urlId);
  };

  successCallback = () => {
    this.setState({
      redirect: true
    });
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to={`/${this.props.match.params.tokenId}/${this.props.match.params.urlId}/users`} />;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-4 mx-auto">
            <h2 className="my-4 text-center">Login</h2>
            <form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                  id="username"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  id="password"
                  className="form-control"
                />
              </div>
              <button type="button" onClick={this.submitForm} className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
