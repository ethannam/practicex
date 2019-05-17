import React, { Component, Fragment } from 'react';
import { 
  Button,
  Grid,
  Icon,
  Segment,
  Step, 
} from 'semantic-ui-react';

class ProctorAdmin extends Component {
  state = {
    testAttempt: {},
    sectionAttempts: [],
    currentSectionAttempt: { timeRemaining: 0 },
    timer: {
      timeRemaining: 0,
      isTicking: false,
      interval: null,
    },
    buttonText: 'Start',
  }

  componentDidMount() {
    const sectionAttempts = this.props.data.testAttempt.sectionAttempts;
    const currentSection = sectionAttempts[0];

    this.setState({
      testAttempt: this.props.data.testAttempt,
      sectionAttempts: sectionAttempts,
      currentSectionAttempt: currentSection,
      timer: { ...this.state.timer, timeRemaining: currentSection.timeRemaining },
    });
  }

  componentDidUpdate() {
    if (this.state.testAttempt.sectionAttempts[0].section.name === '' && this.props.data.testAttempt.sectionAttempts[0].section.name !== '') {

      const sectionAttempts = this.props.data.testAttempt.sectionAttempts;
      const remainingTimes = sectionAttempts.map(sa => sa.timeRemaining);
      const lastCompleteSectionIndex = remainingTimes.lastIndexOf(0);
      let currentSection;

      if (lastCompleteSectionIndex < 0) {
        currentSection = sectionAttempts[lastCompleteSectionIndex + 1];
      } else if (lastCompleteSectionIndex + 1 <= sectionAttempts.length - 1) {
        currentSection = sectionAttempts[lastCompleteSectionIndex + 1];
      } else if (lastCompleteSectionIndex + 1 === sectionAttempts.length) {
        currentSection = sectionAttempts[lastCompleteSectionIndex];
      } else { }

      this.setState({
        testAttempt: this.props.data.testAttempt,
        sectionAttempts: sectionAttempts,
        currentSectionAttempt: currentSection,
        timer: { ...this.state.timer, timeRemaining: currentSection.timeRemaining },
      });
    }
  }

  renderSteps = () => {
    return this.state.sectionAttempts.map(sectionAttempt => 
      <Step active={sectionAttempt.id === this.state.currentSectionAttempt.id ? true : false} key={sectionAttempt.id}>
        <Step.Content>
          <Step.Title>{sectionAttempt.section.name}</Step.Title>
        </Step.Content>
      </Step>
    );
  }

  handleTimerClick = () => {
    if (this.state.timer.isTicking === false && this.state.timer.interval === null) {
      this.setState({
        timer: {
          ...this.state.timer,
          isTicking: true,
          interval: setInterval(() => {
            if (this.state.timer.timeRemaining === 0) {
              this.clearTimerInterval();
              this.handleNextSection();
            } else if (this.state.timer.isTicking) {
              this.saveTimeRemaining();
              this.setState({
                timer: {
                  ...this.state.timer,
                  timeRemaining: this.state.timer.timeRemaining - 1,
                },
              });
            } else { }
          }, 1000),
        },
        buttonText: 'Pause',
      });
    } else if (this.state.timer.isTicking === false && this.state.timer.interval !== null) {
      this.setState({
        timer: {
          ...this.state.timer,
          isTicking: true,
        },
        buttonText: 'Pause',
      });
    } else {
      this.setState({
        timer: {
          ...this.state.timer,
          isTicking: false,
        },
        buttonText: 'Resume',
      });
    }
  }

  handlePreviousSection = () => {
    this.saveTimeRemaining();
    const index = this.state.sectionAttempts.indexOf(this.state.currentSectionAttempt);
    if (index > 0) {
      this.clearTimerInterval();
      const previousSectionAttempt = this.state.sectionAttempts[index - 1];

      this.setState({
        currentSectionAttempt: previousSectionAttempt,
        timer: {
          timeRemaining: previousSectionAttempt.timeRemaining,
          isTicking: false,
          interval: null,
        },
        buttonText: 'Start',
      });
    }
  }

  handleNextSection = () => {
    this.saveTimeRemaining();
    const index = this.state.sectionAttempts.indexOf(this.state.currentSectionAttempt);
    if (index < this.state.sectionAttempts.length - 1) {
      this.clearTimerInterval();
      const nextSectionAttempt = this.state.sectionAttempts[index + 1];

      this.setState({
        currentSectionAttempt: nextSectionAttempt,
        timer: {
          timeRemaining: nextSectionAttempt.timeRemaining,
          isTicking: false,
          interval: null,
        },
        buttonText: 'Start',
      });
    }
  }

  displayTimerTimeRemaining = (initialSeconds) => {
    const minutes = Math.floor(initialSeconds / 60);
    let seconds = initialSeconds - (minutes * 60);
    if (seconds < 10 ) {
      seconds = `0${seconds.toString()}`;
    }
    return `${minutes}:${seconds}`;
  }

  saveTimeRemaining = () => {
    const id = this.state.currentSectionAttempt.id;
    const timeRemaining = this.state.timer.timeRemaining;

    fetch(`${process.env.REACT_APP_SECTION_ATTEMPTS_PATH}/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ section_attempt: { id: id, time_remaining: timeRemaining } }),
    });
  }

  clearTimerInterval() {
    clearInterval(this.state.timer.interval);
  }

  componentWillUnmount() {
    this.clearTimerInterval();
  }

  render() {
    return (
      <Fragment>
        <main style={{ paddingTop: '5rem', margin: '0 1rem', flex: 1 }}>
          <Grid divided='vertically'>
            <Grid.Row columns={1}>
              <Grid.Column textAlign='center'>
                <Step.Group ordered>
                  {this.renderSteps()}
                </Step.Group>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column textAlign='center'>
                <div className='timer'>
                  {this.displayTimerTimeRemaining(this.state.timer.timeRemaining)}
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </main>
        <footer>
          <Grid style={{ margin: 'auto' }}>
            <Grid.Row centered>
                <Segment style={{ textAlign: 'center' }}>
                <h5>Demo Controls</h5>
                <Button.Group size='tiny' basic>
                  <Button
                    onClick={() => {
                      this.setState({
                        timer: {
                          ...this.state.timer,
                          timeRemaining: this.state.timer.timeRemaining - 600,
                        },
                      });
                    }}
                  >-10 minutes</Button>
                  <Button
                    onClick={() => {
                      this.setState({
                        timer: {
                          ...this.state.timer,
                          timeRemaining: this.state.timer.timeRemaining - 300,
                        },
                      });
                    }}
                  >-5 minutes</Button>
                  <Button
                    onClick={() => { 
                      this.setState({
                        timer: {
                          ...this.state.timer,
                          timeRemaining: this.state.timer.timeRemaining - 60,
                        },
                      });
                    }}
                  >-1 minute</Button>
                  <Button
                    onClick={() => { 
                      this.setState({
                        timer: {
                          ...this.state.timer,
                          timeRemaining: this.state.timer.timeRemaining - 15,
                        },
                      });
                    }}
                  >-15 seconds</Button>
                  <Button
                    onClick={() => { 
                      this.setState({
                        timer: {
                          ...this.state.timer,
                          timeRemaining: this.state.timer.timeRemaining - 1,
                        },
                      });
                    }}
                  >-1 second</Button>
                  <Button
                    onClick={() => { 
                      this.setState({
                        timer: {
                          ...this.state.timer,
                          timeRemaining: this.state.timer.timeRemaining + 1,
                        },
                      });
                    }}
                  >+1 second</Button>
                  <Button
                    onClick={() => {
                      this.setState({
                        timer: {
                          ...this.state.timer,
                          timeRemaining: this.state.timer.timeRemaining + 15,
                        },
                      });
                    }}
                  >+15 seconds</Button>
                </Button.Group>
                </Segment>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Button icon labelPosition='left' fluid onClick={this.handlePreviousSection} size='huge'>
                  Previous Section
                  <Icon name='left arrow' />
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button fluid onClick={this.handleTimerClick} size='huge'>
                  {this.state.buttonText}
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button icon labelPosition='right' fluid onClick={this.handleNextSection} size='huge'>
                  Next Section
                  <Icon name='right arrow' />
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </footer>
      </Fragment>
    );
  }
}

export default ProctorAdmin;
