import React, { Component, Fragment } from 'react';
import {
  Feed,
} from 'semantic-ui-react';

const imgs = [
  'helen',
  'elliot',
  'christian',
  'matt',
  'tom',
  'daniel',
  'stevie',
  'tom',
  'jenny',
  'elliot',
  'christian',
  'matt',
  'veronika',
];

class StudentActivityFeed extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_TEST_ATTEMPTS_PATH}/recent`, {
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

  renderListItems = () => {
    if (this.state.data[0] !== undefined && this.state.data[0].username !== '') {
      return this.state.data.map(ta_details => {
        const index = Math.floor(Math.random() * imgs.length);

        return (
          <Feed.Event key={ta_details.id}>
            <Feed.Label image={`https://react.semantic-ui.com/images/avatar/small/${imgs[index]}.jpg`} />
            <Feed.Content style={{ marginTop: 0 }}>
              <Feed.Summary>
                {ta_details.username}
              </Feed.Summary>
              started {ta_details.test} mock
              <Feed.Date content={ta_details.timeDistance} style={{ marginTop: '0.1rem' }} />
            </Feed.Content>
          </Feed.Event>
        );
      });
    } else {
      return (
        <Feed.Event>
          <Feed.Content style={{ marginTop: 0 }}>
            No activity! Be the first!
          </Feed.Content>
        </Feed.Event>

      );
    }
  }

  render() {
    return <Fragment>{this.renderListItems()}</Fragment>;
  }
}

export default StudentActivityFeed;
