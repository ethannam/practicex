import React, { Component, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { login } from '../actions/userActions';
import { isLoggedIn } from '../utils/auth';
import Navigation from './Navigation';
import { 
  Button, 
  Form, 
  Grid, 
  Message, 
  Segment ,
} from 'semantic-ui-react';

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return isLoggedIn() ? 
      <Redirect to='/' /> :
      (
        <Fragment>
          <Navigation />
          <div className="login-form">
            <style>{`
              body > div,
              body > div > div,
              body > div > div > div.login-form {
                height: 101%;
              }
            `}
            </style>
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle' className="login-background">
            <Grid.Column style={{ maxWidth: 450 }}>
              <h2 className="logo" style={{ color: 'white'}}>
                <i className='fa fa-sync-alt' />&nbsp;<span>PracticeX</span>
              </h2>
              <Form size='large' onSubmit={this.handleSubmit} autocomplete='off'>
                  <Segment stacked>
                    <Form.Input 
                      fluid icon='mail' 
                      iconPosition='left' 
                      placeholder='Email' 
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      name="password"
                      type='password'
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                    <Button color="blue" fluid size='large'>
                      Sign In
                    </Button>
                  </Segment>
                </Form>
                <Message>
                  <a href='/'>I forgot my username or password</a>
                </Message>
                <Message>
                  New to us? <a href='/register'>Create an account.</a>
                </Message>
              </Grid.Column>
            </Grid>
          </div>
        </Fragment>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, { login })(LoginPage);
