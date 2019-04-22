/*
 * External dependencies
 */
import React, { Component } from 'react';
import axios from 'axios';

/*
 * Internal dependencies
 */
import Card from './Card';
import { Loader, Error } from './Loader';
import SearchBox from './SearchBox';
import URLPathService from '../services/URLPathService';

/*
 * Module constants
 */
const USER_COUNT = 25;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: [],
      hasNext: false,
      hasPrevious: false,
      searchText: ''
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = (page = 1, searchCriteria = '') => {
    this.setState({
      isLoaded: false
    });
    let baseURL = URLPathService.getBaseURL(this.props.match.params.tokenId, this.props.match.params.urlId);
    axios
      .get(`${baseURL}users?page=${page}&q=${searchCriteria}`)
      .then((res) => {
        const users = res.data.data[res.data.data.result_type];
        this.page = page;
        this.setState({
          isLoaded: true,
          hasPrevious: page > 1
        });
        if (users.length > 0) {
          this.setState({
            users,
            hasNext: !(users.length < USER_COUNT || users.length === 0)
          });
        } else {
          this.setState({
            users: [],
            hasNext: false
          });
        }
      })
      .catch((err) => {
        this.setState({
          error: err,
          isLoaded: true
        });
      });
  };

  next = () => {
    if (this.state.hasNext) {
      this.getData(this.page + 1, this.state.searchText);
    }
  };

  previous = () => {
    if (this.state.hasPrevious) {
      this.getData(this.page - 1, this.state.searchText);
    }
  };

  updateSearchCriteria = (event) => {
    let value = event.target.value;
    this.setState({
      searchText: value
    });
    if (event.key === 'Enter') {
      this.getData(1, value);
    }
  };

  render() {
    if (this.state.error) return <Error class="alert-danger" message={this.state.error.message} />;
    if (!this.state.isLoaded)
      return (
        <React.Fragment>
          <SearchBox updateSearchCriteria={this.updateSearchCriteria} />
          <div className="p-5">
            <Loader />
          </div>
        </React.Fragment>
      );
    if (this.searchText && this.state.isLoaded && this.state.users.length === 0)
      return (
        <React.Fragment>
          <SearchBox updateSearchCriteria={this.updateSearchCriteria} />
          <Error class="alert-light" message="No users found!" />
        </React.Fragment>
      );
    return (
      <React.Fragment>
        <SearchBox updateSearchCriteria={this.updateSearchCriteria} />
        <div className="p-4">
          <div className="row">
            {this.state.users.map((user) => (
              <Card key={user.app_user_id} user={user} />
            ))}
          </div>
          <nav aria-label="User navigation">
            <ul className="pagination justify-content-end pt-3">
              <li className={`page-item ${!this.state.hasPrevious ? 'disabled' : ''}`}>
                <span className="page-link" onClick={this.previous}>
                  &laquo;
                </span>
              </li>
              <li className={`page-item ${!this.state.hasNext ? 'disabled' : ''}`}>
                <span className="page-link" onClick={this.next}>
                  &raquo;
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default List;
