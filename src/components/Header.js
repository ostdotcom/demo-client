import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Header = (props) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link className="navbar-brand" to={`/${AuthService.tokenId}/${AuthService.urlId}/users`}>
      OST Mappy Client
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#menu"
      aria-controls="menu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>

    <div className="collapse navbar-collapse" id="menu">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to={`/${AuthService.tokenId}/${AuthService.urlId}/users`}>
            Users
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`/${AuthService.tokenId}/${AuthService.urlId}/custom-transactions`}>
            Custom Transactions
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`/${AuthService.tokenId}/${AuthService.urlId}/token`}>
            Token
          </Link>
        </li>
      </ul>
      <div className="my-2">
        {/*<span*/}
        {/*className="badge badge-primary font-weight-light text-monospace"*/}
        {/*onClick={() => {*/}
        {/*window.apiRoot = prompt('Enter API root URL:') || window.apiRoot || apiRoot;*/}
        {/*}}*/}
        {/*>*/}
        {/*{window.apiRoot || apiRoot}*/}
        {/*</span>*/}
        <span className="btn btn-light btn-sm ml-2" onClick={AuthService.signOut.bind(AuthService, props.history)}>
          Sign out
        </span>
      </div>
    </div>
  </nav>
);

export default Header;
