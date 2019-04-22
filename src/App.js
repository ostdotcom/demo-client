import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import List from './components/List';
import Header from './components/Header';
import TxDetails from './components/TxDetails';
import CustomData from './components/CustomData';
import Devices from './components/Devices';
import Token from './components/Token';
import AuthService from './services/AuthService';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      AuthService.getAuthStatus() ? (
        <React.Fragment>
          <Header />
          <div className="container">
            <div className="row">
              <div className="col-12">
                <Component {...props} />
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (!AuthService.getAuthStatus() ? <Component {...props} {...rest} /> : <Redirect to="users" />)}
  />
);

const App = () => (
  <HashRouter basename={window.location.pathname}>
    <React.Fragment>
      <PublicRoute exact path="/:tokenId/:urlId/" component={Login} />
      <PrivateRoute path="/:tokenId/:urlId/users" component={List} />
      <PrivateRoute path="/:tokenId/:urlId/user/:userId" component={TxDetails} />
      <PrivateRoute path="/:tokenId/:urlId/devices" component={Devices} />
      <PrivateRoute path="/:tokenId/:urlId/custom-transactions" component={CustomData} />
      <PrivateRoute path="/:tokenId/:urlId/token" component={Token} />
    </React.Fragment>
  </HashRouter>
);

export default App;
