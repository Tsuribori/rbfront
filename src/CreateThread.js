import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const styles = (theme) => ({
  formContainer: {
    textAlign: 'center',
    paddingTop: theme.spacing(5),
  },
  submitContainer: {
    paddingTop: theme.spacing(3),
  }
})

class CreateThread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      buttonDisabled: true,
      error: false,
      helperText: '',
    }
  }

  handleChange = (event) => {
    const value = event.target.value;
    const length = value.length;
    this.setState({
      subject: value,
      buttonDisabled: length < 1 || length > 5,
      error: length > 5,
      helperText: length > 5 ? 'Max character limit exceeded.' : this.state.helperText,
    });
  }

  handleSubmit = () => {
    console.log(`Submitted: ${this.state.subject}`);
    axios.post('/api/thread/', {
      'subject': this.state.subject,
    })
    .then((response) => {
      this.props.history.push(`/thread/${response.data.thread_id}`);
    })
    .catch((error) => {
      this.setState({
        error: true,
        helperText: 'Error while creating thread.',
      })
    })
  }


  render() {
    const classes = this.props.classes

    return (
      <Container className={classes.formContainer}>

        <Typography
          variant="h5"
          component="h5"
        >
          Create a new thread.
        </Typography>

        <Container className={classes.formContainer}>
          <TextField
            multiline
            error={this.state.error}
            helperText={this.state.helperText}
            variant="outlined"
            label="Subject"
            onChange={this.handleChange}
          />
        </Container>

        <Container className={classes.submitContainer}>
          <Button
            disabled={this.state.buttonDisabled}
            onClick={this.handleSubmit}
            variant="contained"
            color="secondary"
          >
            Submit
          </Button>
        </Container>

      </Container>
    )
  }
}

export default withStyles(styles)(withRouter(CreateThread));
