import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/userActions';
import {
  Button,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  List,
  Menu,
  Popup,
} from 'semantic-ui-react';

class Navigation extends Component {
  render() {
    const { authenticated } = this.props;
    const items = authenticated ? menuItems.loggedIn(this.props) : menuItems.loggedOut();

    return (
      <nav>
        <Menu fixed='top' inverted>
          {logo()}
          {items}
        </Menu>
      </nav>
    );
  }
}

const logo = () => (
  <Menu.Item as='a' className='logo' href='/'>
    <i className='fa fa-sync-alt' />&nbsp;<span>PracticeX</span>
  </Menu.Item>
);

const menuItems = {
  loggedIn: (props) => (
    <Fragment>
      {leftDropdown()}
      <Menu.Item as='a' content='Assignments' key='assignments' href='/assignments' />
      <Menu.Item as='a' content='Review' key='review' href='/review' />
      <Menu.Item as='a' content='Progress' key='progress' href='/progress' />
      <Menu.Menu position='right'>
        <Menu.Item>
          <Button inverted href='proctor' icon='plus' labelPosition='left' content='Mock' />
        </Menu.Item>
        {rightDropdown(props)}
      </Menu.Menu>
    </Fragment>
  ),
  loggedOut: () => (
    <Fragment>
      <Menu.Item as='a' content='About' key='about' href='/about' />
      <Menu.Menu position='right'>
        <Menu.Item as='a' content='Register' key='register' href='/register' />
        <Menu.Item as='a' content='Login' key='login' href='/login' />
      </Menu.Menu>
    </Fragment>
  ),
}

const leftDropdown = () => (
  <Popup
    flowing
    inverted
    on='click'
    position='bottom left'
    trigger={<Dropdown item text='Tests' />}
    content={
      <Grid columns={2} divided style={{ width: '25rem' }}>
        <Grid.Row>
          <Grid.Column>
            <Header as='h4'>ACT</Header>
            <List link inverted>
              <List.Item as='a'>English</List.Item>
              <List.Item as='a'>Math</List.Item>
              <List.Item as='a'>Reading</List.Item>
              <List.Item as='a'>Science</List.Item>
              <List.Item as='a'>Essay</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column>
            <Header as='h4'>SAT</Header>
            <List link inverted>
              <List.Item as='a'>Reading</List.Item>
              <List.Item as='a'>Writing & Language</List.Item>
              <List.Item as='a'>Math - No Calculator</List.Item>
              <List.Item as='a'>Math - Calculator</List.Item>
              <List.Item as='a'>Essay</List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    }
  />
);

const rightDropdown = ({ username, logout}) => {
  const dropdownHeading = (
    <span><Icon name='user' />&nbsp;Account</span>
  );

  return (
    <Popup
      flowing
      inverted
      on='click'
      position='bottom center'
      horizontalOffset={-10}
      trigger={<Dropdown item trigger={dropdownHeading} />}
      content={
        <Grid columns={1} divided style={{ width: '12rem' }}>
          <Grid.Row>
            <Grid.Column>
              <h4>{username}</h4>
              <Divider inverted />
              <List link inverted>
                <List.Item as='a' href='/profile'>Profile</List.Item>
                <List.Item as='a' href='/settings'>Settings</List.Item>
                <List.Item as='a' href='/help'>Help</List.Item>
              </List>
              <Divider inverted />
              <List link inverted>
                <List.Item as='a' onClick={logout}>Sign Out</List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      }
    />
  );
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
    username: state.user.username,
  };
}

export default connect(mapStateToProps, { logout })(Navigation);
