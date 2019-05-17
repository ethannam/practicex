import React, { Component } from 'react';
import { 
  Button, 
  Dimmer,
  Form,
  Header, 
  Icon,
  Loader,
  Modal,
  Segment,
} from 'semantic-ui-react';

const FormData = require('form-data');
const base64Img = require('base64-img');

class BubbleSheetModal extends Component {
  state = { 
    open: false,
    file: null,
    image: null,
    isLoading: false,
    scoreReport: null,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('img_name', this.state.file.name);
    form.append('buffer', new Buffer(10));
    form.append('file', this.state.file);

    // fetch(`${process.env.REACT_APP_TEST_ATTEMPTS_PATH}/grade`, {
    //   method: 'POST',
    //   body: form,
    // })
    //   .then(response => response.blob())
    //   .then(imageBlob => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(imageBlob);
    //     base64Img.img(`${reader.result}`, '', 'result', function(err, filepath) {
    //       debugger;
    //     });
    //     this.setState({
    //       image: reader.result,
    //     });
    //   });

    fetch(`${process.env.REACT_APP_TEST_ATTEMPTS_PATH}/grade`, {
      method: 'POST',
      body: form,
    })
      .then(response => response.json())
      .then(json => this.setState({ scoreReport: json, isLoading: false }));

    this.setState({ isLoading: true });
  }

  // arrayBufferToBase64 = (buffer) => {
  //   let binary = '';
  //   const bytes = [].slice.call(new Uint8Array(buffer));
  //   bytes.forEach((b) => binary += String.fromCharCode(b));

  //   return window.btoa(binary);
  // };

  handleChange = (e) => {
    this.setState({
      file: e.target.files[0],
    });
  }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state
    let modalLeftBox;

    if (this.state.isLoading === false && this.state.scoreReport === null) {
      modalLeftBox = (<Header icon>
        <Icon name='search' />
        Choose a file and press "Grade Bubble Sheet"
      </Header>);
    } else if (this.state.isLoading === true && this.state.scoreReport === null) {
      modalLeftBox = (<Dimmer active>
      <Loader />
    </Dimmer>);
    } else {
      modalLeftBox = (
        <div style={{ textAlign: 'center' }}>
          <p>Raw score: {this.state.scoreReport.rawScore}</p>
          <p>Scaled score: {this.state.scoreReport.scaledScore}</p>
          <p>Incorrect questions: {this.state.scoreReport.incorrectQuestions }</p>
        </div>
      );
    }

    return (
      <div>
        <Button onClick={this.show('inverted')} color='green' fluid>Grade</Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content image>
            <Segment placeholder style={{ width: '20rem', height: 'auto', marginRight: '1rem' }}>
            {modalLeftBox}
            </Segment>
            <Modal.Description>
              <Form onSubmit={this.handleSubmit}>
                <input
                  ref={this.fileInputRef}
                  type="file"
                  name="bsFile"
                  onChange={this.handleChange}
                />
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Cancel
            </Button>
            <Button
              positive
              type='submit'
              icon='checkmark'
              labelPosition='right'
              content="Grade Bubble Sheet"
              onClick={this.handleSubmit}
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default BubbleSheetModal;