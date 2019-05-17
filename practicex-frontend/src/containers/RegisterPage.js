import React, { Component, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { createAccount } from '../actions/userActions';
import { isLoggedIn } from '../utils/auth';
import Navigation from './Navigation';
import { 
  Button, 
  Form, 
  Grid, 
  Icon,
  Segment, 
  Step,
} from 'semantic-ui-react';

const checkmark = () => {
  return (
    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" style={{ marginRight: '10px' }}>
      <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
    </svg>
  );
};

class RegisterPage extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createAccount(this.state);
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
          <div className='login-form'>
            {/*
              Heads up! The styles below are necessary for the correct render of this example.
              You can do same with CSS, the main idea is that all the elements up to the `Grid`
              below must have a height of 100%.
            */}
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
                      placeholder='E-mail address'
                      name="email"
                      value={this.state.email} 
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      fluid
                      icon='check circle outline'
                      iconPosition='left'
                      placeholder='Confirm password'
                      type='password'
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={this.handleChange} 
                    />
                    <Button color='blue' fluid size='large'>Create Account</Button>
                  </Segment>
                </Form>
                  <Step.Group size='mini'>
                    <Step>
                      {
                        this.state.email ? 
                          checkmark() :
                          <Icon name='mail' style={{ fontSize: '2.2em' }} />
                      }
                      <Step.Content>
                        <Step.Description>Email</Step.Description>
                      </Step.Content>
                    </Step>
                    <Step>
                      {
                        this.state.password ? checkmark() : <Icon name='lock' style={{ fontSize: '2.2em' }} />
                      } 
                      <Step.Content>
                        <Step.Description>Password</Step.Description>
                      </Step.Content>
                    </Step>
                    <Step>
                      {
                        this.state.password !== '' && (this.state.confirmPassword === this.state.password) ? checkmark() : <Icon name='check circle outline' style={{ fontSize: '2.2em' }} />
                      } 
                      <Step.Content>
                        <Step.Description>Confirm password</Step.Description>
                      </Step.Content>
                    </Step>
                  </Step.Group>
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

export default connect(mapStateToProps, { createAccount })(RegisterPage);
