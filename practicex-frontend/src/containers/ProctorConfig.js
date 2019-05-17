import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchTests } from '../actions/testActions';
import { 
  Button,
  Checkbox,
  Form,
  Grid,
  Select,
  Step, 
} from 'semantic-ui-react';

class ProctorConfig extends Component {
  state = {
    test: { sections: [] },
    sections: [],
  }

  componentDidMount() {
    this.props.fetchTests();
  }

  handleTestChange = (e, {value}) => {
    const selectedTest = this.props.tests.find(test => test.id === value);

    this.setState({ 
      test: selectedTest,
      sections: selectedTest.sections.map(section => section.id),
    });
  }

  handleSectionChange = (e, {value}) => {
    if (this.state.sections.includes(value)) {
      const index = this.state.sections.indexOf(value);
      const newArr = [...this.state.sections];
      newArr.splice(index, 1);

      this.setState({ sections: newArr });
    } else {
      this.setState({ sections: [...this.state.sections, value].sort() });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const params = {
      test_attempt: {
        test_id: this.state.test.id,
        new_section_ids: this.state.sections,
        user_id: this.props.userId,
      }
    }

    fetch(process.env.REACT_APP_TEST_ATTEMPTS_PATH, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(params)
    })
      .then(response => response.json())
      .then(json => this.props.startAttempt(json));
  }

  renderSections = () => {
    return this.state.test.sections.map(section => 
      <Form.Field control={Checkbox}
        key={section.id}
        label={section.name}
        value={section.id}
        checked={this.state.sections.includes(section.id)}
        onChange={this.handleSectionChange}
      />
    );
  }

  render() {
    return (
      <Fragment>
        <main style={{ paddingTop: '5rem', margin: '0 1rem', flex: 1 }}>
          <Grid divided='vertically'>
            <Grid.Row columns={1}>
              <Grid.Column textAlign='center'>
                <Step.Group ordered>
                  <Step>
                    <Step.Content>
                      <Step.Title>Test</Step.Title>
                      <Step.Description>Choose a test</Step.Description>
                    </Step.Content>
                  </Step>
                  <Step>
                    <Step.Content>
                      <Step.Title>Sections</Step.Title>
                      <Step.Description>Choose sections</Step.Description>
                    </Step.Content>
                  </Step>
                  <Step>
                    <Step.Content>
                      <Step.Title>Options</Step.Title>
                      <Step.Description>Choose options</Step.Description>
                    </Step.Content>
                  </Step>
                  <Step>
                    <Step.Content>
                      <Step.Title>Press Start</Step.Title>
                    </Step.Content>
                  </Step>
                </Step.Group>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Form onSubmit={this.handleSubmit} style={{ width: '100%' }}>
                <Grid columns='equal' divided padded>
                  <Grid.Row>
                    <Grid.Column>
                      <Form.Field control={Select} label='Test' placeholder='Choose Test'
                        className='myForm'
                        onChange={this.handleTestChange}
                        options={this.props.tests.map(test => ({ key: test.id, text: test.name, value: test.id }))}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Group>
                        <label><h2>Sections</h2></label>
                        {this.renderSections()}
                      </Form.Group>
                    </Grid.Column>
                    <Grid.Column>
                      <h2>Options</h2>
                      <Form.Field control={Checkbox} label='Section Instructions' toggle />
                      <Form.Field control={Checkbox} label='Test Day Instructions' toggle />
                      <Form.Field control={Checkbox} label='Ambient Noise' toggle />
                      <Form.Field control={Checkbox} label='Random Noise' toggle />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form>
            </Grid.Row>
          </Grid>
        </main>
        <footer>
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column textAlign='center'>
                <Button 
                  style={{ width: '90%', marginBottom: '1rem', display: 'inline' }}
                  type='Submit'
                  onClick={this.handleSubmit}
                  fluid 
                  primary 
                  size='huge'>Start</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </footer>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tests: state.tests.all,
    userId: state.user.id
  };
}

export default connect(mapStateToProps, { fetchTests })(ProctorConfig);
