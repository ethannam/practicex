import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Navigation from './Navigation';
import StudentActivityFeed from '../components/StudentActivityFeed';
import RecentAttempts from '../components/RecentAttempts';
import { ResponsiveCalendar } from 'nivo';
import { rollDateDice } from '../utils/helpers';
import {
  Button,
  Card,
  Container,
  Divider,
  Feed,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Segment,
} from 'semantic-ui-react';

class HomePage extends Component {
  state = {
    historyData: [{ day: '', value: 0 }],
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_TEST_ATTEMPTS_PATH}/history`, {
        headers: {
          'content-type': 'application/json',
          accepts: 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
        .then(response => response.json())
        .then(json => {
          this.setState({
            historyData: json,
          });
        });
  }

  loggedInLanding = () => (
    <main style={{ padding: '5rem 1rem' }}>
      <Grid columns={2}>
        <Grid.Row stretched>
          <Grid.Column width={12}>
            <Segment>
              <Header as='h3' dividing style={{ paddingBottom: '0.75rem' }}>
                Dashboard
              </Header>
              <p>Welcome, {this.props.username}!</p>
              <RecentAttempts max={4} content={'Recent Mocks'} />
              <Header as='h3' dividing style={{ paddingBottom: '0.73rem', marginTop: '3rem' }}>
                Practice History
                <span style={{ float: 'right' }}>
                  <Button content='Time Travel' 
                    style={{ fontSize: '0.75rem', padding: '0.4rem 1rem 0.5rem 1rem' }}
                    onClick={() => {
                      this.setState({ historyData: rollDateDice(), });
                    }}
                  />
                </span>
              </Header>
              <div style={{ height: '190px' }}>
                <ResponsiveCalendar
                  data={this.state.historyData}
                  from="2019-05-01"
                  to="2019-05-31"
                  emptyColor="#eeeeee"
                  colors={[
                      "#61cdbb",
                      "#97e3d5",
                      "#e8c1a0",
                      "#f47560"
                  ]}
                  margin={{
                      "top": 40,
                      "right": 40,
                      "bottom": 40,
                      "left": 40
                  }}
                  yearSpacing={40}
                  monthBorderColor="#ffffff"
                  dayBorderWidth={2}
                  dayBorderColor="#ffffff"
                  legends={[
                      {
                          "anchor": "bottom-right",
                          "direction": "row",
                          "translateY": 36,
                          "itemCount": 4,
                          "itemWidth": 42,
                          "itemHeight": 36,
                          "itemsSpacing": 14,
                          "itemDirection": "right-to-left"
                      }
                  ]}
              />
              </div>
            </Segment>
          </Grid.Column>
          <Grid.Column width={4}>
            <Card>
              <Card.Content>
                <Card.Header>Recent Activity</Card.Header>
              </Card.Content>
              <Card.Content style={{ height: '97%' }}>
                <Feed>
                  <StudentActivityFeed />
                </Feed>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </main>
  )

  render() {
    const { authenticated } = this.props;
    const main = authenticated ? this.loggedInLanding() : loggedOutLanding();

    return (
      <Fragment>
        <Navigation />
        {main}
      </Fragment>
    );
  }
}

const HomepageHeading = () => (
  <Segment
    inverted
    vertical
    className='masthead'
  >
    <Container text>
      <Header
        as='h1'
        inverted
        style={{
          fontSize: '4em',
          marginBottom: 0,
          marginTop: '3em',
        }}
      ><span className='logo'>PracticeX</span></Header>
      <Header
        as='h2'
        content='Affordable Mock Testing'
        inverted
        style={{
          fontSize: '1.7em',
          fontWeight: 'normal',
          marginTop: '1.5em',
        }}
      />
      <Button primary size='huge' href='/register'>
        Get Started
        <Icon name='right arrow' />
      </Button>
    </Container>
  </Segment>
);

const loggedOutLanding = () => {
  return (
    <main style={{ padding: 0 }}>
      {HomepageHeading()}
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                We Help Companies and Companions
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                We can give your company superpowers to do things that they never thought possible.
                Let us delight your customers and empower your needs... through pure data analytics.
              </p>
              <Header as='h3' style={{ fontSize: '2em' }}>
                We Make Bananas That Can Dance
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Yes that's right, you thought it was the stuff of dreams, but even bananas can be
                bioengineered.
              </p>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <Image bordered rounded size='large' src='/images/wireframe/white-image.png' />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Button size='huge'>Check Them Out</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment style={{ padding: '0em' }} vertical>
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                "What a Company"
              </Header>
              <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                "I shouldn't have gone with their competitor."
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                <Image avatar src='/images/avatar/large/nan.jpg' />
                <b>Nan</b> Chief Fun Officer Acme Toys
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header as='h3' style={{ fontSize: '2em' }}>
            Breaking The Grid, Grabs Your Attention
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            Instead of focusing on content creation and hard work, we have learned how to master the
            art of doing nothing by providing massive amounts of whitespace and generic content that
            can seem massive, monolithic and worth your attention.
          </p>
          <Button as='a' size='large'>
            Read More
          </Button>
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
          >
            <a href='/'>Case Studies</a>
          </Divider>
          <Header as='h3' style={{ fontSize: '2em' }}>
            Did We Tell You About Our Bananas?
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
            it's really true. It took years of gene splicing and combinatory DNA research, but our
            bananas can really dance.
          </p>
          <Button as='a' size='large'>
            I'm Still Quite Interested
          </Button>
        </Container>
      </Segment>
      <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as='h4' content='About' />
                <List link inverted>
                  <List.Item as='a'>Sitemap</List.Item>
                  <List.Item as='a'>Contact Us</List.Item>
                  <List.Item as='a'>Religious Ceremonies</List.Item>
                  <List.Item as='a'>Gazebo Plans</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as='h4' content='Services' />
                <List link inverted>
                  <List.Item as='a'>Banana Pre-Order</List.Item>
                  <List.Item as='a'>DNA FAQ</List.Item>
                  <List.Item as='a'>How To Access</List.Item>
                  <List.Item as='a'>Favorite X-Men</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as='h4' inverted>
                  Footer Header
                </Header>
                <p>
                  Extra space for a call to action inside the footer that could help re-engage users.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </main>
  );
}


const mapStateToProps = (state) => ({
  username: state.user.username,
  authenticated: state.user.authenticated,
})

export default connect(mapStateToProps)(HomePage);
