import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import axios from "axios";
import DocumentTitle from "react-document-title";

const styles = theme => ({
  formContainer: {
    textAlign: "center",
    paddingTop: theme.spacing(5)
  },
  submitContainer: {
    paddingTop: theme.spacing(3)
  }
});

class CreateThread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      checked: true,
      buttonDisabled: true,
      error: false,
      helperText: ""
    };
  }

  handleChange = event => {
    const value = event.target.value;
    const length = value.length;
    this.setState({
      subject: value,
      buttonDisabled: length < 1 || length > 100,
      error: length > 100,
      helperText:
        length > 100 ? "Max character limit exceeded." : this.state.helperText
    });
  };

  handleCheckbox = () => {
    this.setState({ checked: !this.state.checked });
  };

  handleSubmit = () => {
    axios
      .post("/api/thread/", {
        subject: this.state.subject,
        public: this.state.checked
      })
      .then(response => {
        this.props.history.push(`/thread/${response.data.thread_id}`);
      })
      .catch(error => {
        this.setState({
          error: true,
          helperText: "Error while creating thread."
        });
      });
  };

  render() {
    const classes = this.props.classes;

    return (
      <DocumentTitle title="Create Thread">
        <Container className={classes.formContainer}>
          <Typography variant="h5" component="h5">
            Create a new thread.
          </Typography>
          <Container className={classes.formContainer}>
            <FormGroup>
              <TextField
                multiline
                error={this.state.error}
                helperText={this.state.helperText}
                variant="outlined"
                label="Subject"
                onChange={this.handleChange}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.checked}
                    onChange={this.handleCheckbox}
                  />
                }
                label="Public"
              />
            </FormGroup>
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
      </DocumentTitle>
    );
  }
}

export default withStyles(styles)(withRouter(CreateThread));
