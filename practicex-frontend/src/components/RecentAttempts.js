import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import BubbleSheetModal from './BubbleSheetModal';
import {
  Button,
  Card,
  Header,
  Label,
} from 'semantic-ui-react';

// const temp = <Button fluid onClick={() => this.props.history.push(`proctor?attempt=${testAttempt.id}`)} disabled>
//                 All Sections Complete
//               </Button>

class RecentAttempts extends Component {
  state = {
    testAttempts: [{ sections: [] }],
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_USERS_PATH}/${this.props.user.id}/test_attempts`, {
        headers: {
          'content-type': 'application/json',
          accepts: 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
        .then(response => response.json())
        .then(json => {
          this.setState({
            testAttempts: json,
          });
        });
  }

  renderTestAttempts = () => {
    const isLimit = this.props.max === -1 ? false : true;

    if (this.state.testAttempts[0].sections.length !== 0) {
      const arr = isLimit ? this.state.testAttempts.slice(0, this.props.max) : this.state.testAttempts;

      return arr.map(testAttempt => {
        const testComplete = !testAttempt.sections.map(section => section.completed).includes(false);

        return (<Card style={{ width: '23%', }}>
          <Card.Content>
            <Card.Header>{testAttempt.testName}</Card.Header>
            <Card.Meta>{testAttempt.startDate}</Card.Meta>
            <Card.Description>
              {this.renderSections(testAttempt.sections)}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {testComplete ? 
              <BubbleSheetModal /> : 
              <Button color='yellow' fluid onClick={() => this.props.history.push(`proctor?attempt=${testAttempt.id}`)}>
                Resume
              </Button>}
          </Card.Content>
        </Card>);
      });
    }
  }

  renderSections = (sections) => {
    return sections.map(section => 
      section.completed ?
        <Label content={section.name} style={{ marginBottom: '2px' }} size='tiny' icon='check' color='black' /> :
        <Label content={section.name} style={{ marginBottom: '2px' }} size='tiny' icon='circle outline' />
    );
  }

  render() {
    return (
      <Fragment>
        <Header as='h3' dividing style={{ paddingBottom: '0.73rem', marginTop: '3rem' }}>
          {this.props.content}
        </Header>
        <Card.Group>
          {this.renderTestAttempts()}
        </Card.Group>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
}

export default withRouter(connect(mapStateToProps)(RecentAttempts));
