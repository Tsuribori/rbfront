import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import PublishIcon from "@material-ui/icons/Publish";
import ImageIcon from "@material-ui/icons/Image";
import BackArrow from "@material-ui/icons/ArrowBackIos";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  textBox: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between"
  }
});

class Send extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: true,
      message: "",
      fileName: "",
      file: null,
      mediaId: null,
      error: false,
      postSent: false
    };
  }

  cleanErrors = () => {
    this.setState({
      error: false,
      helperText: "",
      buttonDisabled: false
    });
  };

  cleanState = () => {
    this.setState({
      message: "",
      fileName: "",
      mediaId: null
    });
  };

  handleMessage = event => {
    this.setState({ message: event.target.value });
    const messageLength = event.target.value.length;
    if (messageLength > 10000) {
      this.setState({
        error: true,
        helperText: "Message too long!",
        buttonDisabled: true
      });
    } else if (messageLength <= 0) {
      this.setState({
        buttonDisabled: true
      });
    } else {
      this.cleanErrors();
    }
  };

  handleFile = event => {
    let fileName = event.target.value.split("\\").pop();
    const fileSize = event.target.files[0].size;
    if (fileSize > 10485760) {
      this.setState({
        error: true,
        helperText: "File size too big, max 10MB allowed!",
        buttonDisabled: true
      });
    } else {
      this.cleanErrors();
      if (fileName.length > 15) {
        let extension = fileName.split(".").pop();
        fileName = fileName.replace(extension, "");
        fileName = fileName.slice(0, 15) + "..." + extension;
      }
      this.setState({
        fileName: fileName,
        file: event.target.files[0]
      });
    }
  };

  messagePost = () => {
    axios
      .post("/api/message/", {
        post: this.state.message,
        thread: this.props.threadId,
        media: this.state.mediaId
      })
      .then(response => {
        this.props.handleMessageDrawer();
        this.props.loadThread();
        this.cleanState();
      })
      .catch(error => {
        const errorData = error.response.data;
        this.setState({
          error: true,
          helperText: errorData.post ? errorData.post : errorData.thread
        });
      });
  };

  handleUpload = () => {
    this.cleanErrors();

    if (this.state.file) {
      this.setState({ postSent: true });
      let formData = new FormData();
      formData.append("image", this.state.file);
      axios
        .post("/api/media/", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          this.setState({ mediaId: response.data.media_id });
          this.messagePost();
        })
        .catch(error => {
          this.setState({
            error: true,
            helperText: error.response.data.image
          });
        })
        .then(() => {
          this.setState({ postSent: false });
        });
    } else {
      this.setState({
        error: true,
        helperText: "File is required for posting.",
        buttonDisabled: true
      });
    }
  };

  render() {
    const classes = this.props.classes;
    return (
      <React.Fragment>
        <FormControl className={classes.textBox}>
          <TextField
            multiline
            error={this.state.error}
            helperText={this.state.helperText}
            label="Message"
            onChange={this.handleMessage}
            value={this.state.message}
          />
          <div className={classes.buttonContainer}>
            <div>
              <IconButton onClick={this.props.handleMessageDrawer}>
                <BackArrow />
              </IconButton>
            </div>
            <div>
              {this.state.fileName}
              <IconButton variant="contained" component="label">
                <input
                  hidden
                  accept="image/png|image/jpg|image/jpeg|image/gif"
                  type="file"
                  onChange={this.handleFile}
                />
                <ImageIcon />
              </IconButton>
              <IconButton
                onClick={this.handleUpload}
                disabled={this.state.buttonDisabled}
              >
                <PublishIcon />
              </IconButton>
            </div>
          </div>
        </FormControl>
        {this.state.postSent && (
          <FormControl>
            <LinearProgress color="secondary" />
          </FormControl>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Send);
