import axios from 'axios/index';
import cookie from 'react-cookies';
import URLPathService from './URLPathService';

class AuthService {
  constructor() {
    this.isAuthorized = cookie.load('fe_logIn') || false;
    this.tokenId = cookie.load('token_id') || '';
    this.urlId = cookie.load('url_id') || '';
  }

  getAuthStatus() {
    return this.isAuthorized;
  }

  signIn(params, successCallback, errorCallback, tokenId, urlId) {
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
          cookie.save('token_id', tokenId);
          cookie.save('url_id', urlId);
          successCallback();
        } else {
          console.log('Unauthorized user!');
          this.isAuthorized = false;
          errorCallback(res);
        }
      })
      .catch((err) => {
        console.log(err);
        this.isAuthorized = false;
        errorCallback(err);
      });
  }

  signOut(historyParam) {
    let baseURL = URLPathService.getBaseURL(this.tokenId, this.urlId);
    axios
      .post(`${baseURL}users/logout`)
      .then((res) => {
        if (res.data.success) {
          this.isAuthorized = false;
          cookie.remove('fe_logIn');
          cookie.remove('token_id');
          cookie.remove('url_id');
          historyParam.push(`/${this.tokenId}/${this.urlId}/`);
        } else {
          console.log('Could not sign out!');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default new AuthService();
