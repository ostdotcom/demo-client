import React, { Component } from 'react';
import axios from 'axios/index';
import cookie from 'react-cookies';
import URLPathService from './URLPathService';
import { Redirect } from 'react-router-dom';

class AuthService extends Component {
  constructor(props) {
    super(props);
    this.isAuthorized = cookie.load('fe_logIn') || false;
    this.tokenId = '';
    this.urlId = '';
    this.state = {
      signOut: false
    };
  }

  getAuthStatus() {
    return this.isAuthorized;
  }

  signIn(params, successCallback, tokenId, urlId) {
    let baseURL = URLPathService.getBaseURL(tokenId, urlId);
    this.tokenId = tokenId;
    this.urlId = urlId;
    axios
      .post(`${baseURL}login`, {
        username: params.username,
        password: params.password
      })
      .then((res) => {
        if (res.data.success) {
          this.isAuthorized = true;
          cookie.save('fe_logIn', 'true');
          successCallback();
        } else {
          console.log('Unauthorized user!');
          this.isAuthorized = false;
        }
      })
      .catch((err) => {
        console.log(err);
        this.isAuthorized = false;
      });
  }

  signOut() {
    console.log(this);
    let baseURL = URLPathService.getBaseURL(this.tokenId, this.urlId);
    axios
      .post(`${baseURL}users/logout`)
      .then((res) => {
        if (res.data.success) {
          this.isAuthorized = false;
          cookie.remove('fe_logIn');
          this.setState({
            signOut: true
          });
        } else {
          console.log('Could not sign out!');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.signOut) {
      return <Redirect to={`/${this.tokenId}/${this.urlId}`} />;
    }
  }
}

export default new AuthService();
