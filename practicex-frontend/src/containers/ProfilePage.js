import React, { Component ,Fragment } from 'react';
import { connect } from 'react-redux';
import Navigation from './Navigation';

class ProfilePage extends Component {
  render() {
    return (
      <Fragment>
        <Navigation />
        <main>
          <p>Id: {this.props.user.id}</p>
          <p>Username: {this.props.user.username}</p>
          <p>Email: {this.props.user.email}</p>
        </main>        
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ProfilePage);