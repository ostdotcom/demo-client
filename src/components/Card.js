import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jdenticon from 'jdenticon';

class Card extends Component {
  constructor(props) {
    super(props);
    this.colClass = this.props.colClass || 'col-lg-3 col-sm-6';
  }

  componentDidMount() {
    jdenticon();
  }

  render() {
    return (
      <div className={`${this.colClass} py-2`}>
        <div className="card shadow">
          <svg className="card-img-top" data-jdenticon-value={this.props.user.app_user_id} />
          <div className="card-body">
            <h5 className="card-title text-truncate">{this.props.user.fullname}</h5>
            {this.props.user.token_holder_address ? (
              <React.Fragment>
                <Link className="btn btn-light mr-2" to={`/user/${this.props.user.app_user_id}`}>
                  Tx QR
                </Link>
                <Link className="btn btn-light" to={`/devices`}>
                  Devices QR
                </Link>
              </React.Fragment>
            ) : (
              <span className="text-black-50">User not setup</span>
            )}
          </div>
          <div className="card-footer text-muted small">{new Date(this.props.user.created_at).toLocaleString()}</div>
        </div>
      </div>
    );
  }
}

export default Card;
