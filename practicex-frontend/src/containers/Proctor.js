import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Navigation from './Navigation';
import ProctorAdmin from './ProctorAdmin';
import ProctorConfig from './ProctorConfig';
import { isLoggedIn } from '../utils/auth';

class Proctor extends Component {
  state = {
    data: { testAttempt: { sectionAttempts: [{ timeRemaining: 0, section: { name: '' } }] } },
  }

  componentDidMount() {
    if (!!this.props.location.search) {
      const attemptId = this.props.location.search.slice(1).split('=')[1];

      fetch(`${process.env.REACT_APP_TEST_ATTEMPTS_PATH}/${attemptId}`, {
        headers: {
          'content-type': 'application/json',
          accepts: 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
        .then(response => response.json())
        .then(json => {
          this.setState({
            data: json,
          });
        });
    }
  }

  startAttempt = (data) => {
    this.setState({
      data: data,
    });
    this.props.history.push(`?attempt=${data.testAttempt.id}`);
  }

  render() {
    const unauthorized = !isLoggedIn();
    const attemptStarted = !!this.props.location.search;

    return unauthorized ? 
      <Redirect to='/' /> : 
      (
        <div style={{ display: 'flex', flexDirection: 'column', height: '98vh' }}>
          <Navigation />
          {attemptStarted ? 
            <ProctorAdmin data={this.state.data} /> : 
            <ProctorConfig startAttempt={this.startAttempt} />}
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Proctor);
