/*
 * External dependencies
 */
import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';

/*
 * Internal dependencies
 */
import { deviceMap } from '../constants';
import { Loader, Error } from './Loader';
import URLPathService from '../services/URLPathService';

class Devices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAddress: '',
      addresses: null,
      error: null,
      isLoaded: false
    };
  }

  componentDidMount() {
    this.setState({
      isLoaded: false
    });
    let baseURL = URLPathService.getBaseURL(this.props.params.match.tokenId, this.props.params.match.urlId);
    axios
      .get(`${baseURL}devices`)
      .then((res) => {
        this.setState({
          addresses: res.data.data.devices,
          currentAddress: res.data.data.devices[0].address,
          isLoaded: true
        });
      })
      .catch((err) => {
        this.setState({
          error: err,
          isLoaded: true
        });
      });
  }

  handleActionChange = (event) => {
    let id = event.target.id,
      QRSeed = JSON.parse(JSON.stringify(deviceMap[id]));
    QRSeed.d['da'] = this.state.currentAddress;
    delete QRSeed['_label'];
    this.setState({
      QRSeed
    });
  };

  handleDeviceChange = (event) => {
    this.setState({
      currentAddress: event.target.value
    });
  };

  render() {
    if (this.state.error) return <Error class="alert-danger" message={this.state.error.message} />;
    if (!this.state.isLoaded)
      return (
        <div className="p-4">
          <Loader />
        </div>
      );
    this.state.QRSeed && console.log('QRSeed data:', this.state.QRSeed);
    return (
      <React.Fragment>
        <div className="row">
          <div className="text-center w-100" style={{ height: '350px' }}>
            {this.state.QRSeed ? (
              <QRCode className="p-4" size={350} value={JSON.stringify(this.state.QRSeed)} />
            ) : (
              <p className="p-4 display-4 text-muted" style={{ height: '350px' }}>
                Select a device to get QR code
              </p>
            )}
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="text-center w-50">
            <select
              className="form-control mb-3"
              id="deviceSelect"
              value={this.state.currentAddress}
              onChange={this.handleDeviceChange}
            >
              {this.state.addresses.map((device) => (
                <option value={device.address} key={device.user_id}>
                  {device.address}
                </option>
              ))}
            </select>
            {deviceMap.map((action, index) => (
              <button key={`k-${index}`} className="btn btn-primary mx-2" id={index} onClick={this.handleActionChange}>
                {action._label}
              </button>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Devices;
