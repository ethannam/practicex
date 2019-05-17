import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';
import RecentAttempts from '../components/RecentAttempts';
import Navigation from './Navigation';
import {
  Header,
  Table,
} from 'semantic-ui-react';

class Progress extends Component {
  fileInputRef = React.createRef();

  render() {
    const unauthorized = !isLoggedIn();

    return unauthorized ? 
      <Redirect to='/' /> : 
      (
        <main style={{ padding: '0 2rem', paddingTop: '4rem' }}>
          <Navigation />
          <Header as='h3' dividing style={{ paddingBottom: '0.73rem' }}>
            Scores
          </Header>
          <Table sortable celled size='small' compact color='black'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>English</Table.HeaderCell>
                <Table.HeaderCell>Math</Table.HeaderCell>
                <Table.HeaderCell>Reading</Table.HeaderCell>
                <Table.HeaderCell>Science</Table.HeaderCell>
                <Table.HeaderCell>Sum</Table.HeaderCell>
                <Table.HeaderCell>Composite Unrounded</Table.HeaderCell>
                <Table.HeaderCell>Composite Final</Table.HeaderCell>
                <Table.HeaderCell>National Ranking</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>May 8, 2018</Table.Cell>
                <Table.Cell>Form 67C</Table.Cell>
                <Table.Cell>24</Table.Cell>
                <Table.Cell>25</Table.Cell>
                <Table.Cell>23</Table.Cell>
                <Table.Cell>21</Table.Cell>
                <Table.Cell>93</Table.Cell>
                <Table.Cell>23.25</Table.Cell>
                <Table.Cell>23</Table.Cell>
                <Table.Cell>69</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>December 12, 2018</Table.Cell>
                <Table.Cell>Form 71E</Table.Cell>
                <Table.Cell>30</Table.Cell>
                <Table.Cell>31</Table.Cell>
                <Table.Cell>32</Table.Cell>
                <Table.Cell>27</Table.Cell>
                <Table.Cell>120</Table.Cell>
                <Table.Cell>30.00</Table.Cell>
                <Table.Cell>30</Table.Cell>
                <Table.Cell>93</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>May 8, 2019</Table.Cell>
                <Table.Cell>Form 72C</Table.Cell>
                <Table.Cell>36</Table.Cell>
                <Table.Cell>36</Table.Cell>
                <Table.Cell>34</Table.Cell>
                <Table.Cell>31</Table.Cell>
                <Table.Cell>137</Table.Cell>
                <Table.Cell>34.25</Table.Cell>
                <Table.Cell>35</Table.Cell>
                <Table.Cell>99</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <RecentAttempts max={-1} content={'Mock Attempts'} />
        </main>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Progress);
