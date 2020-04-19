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
      fileRaw: null,
      fileName: "",
      file: null,
      mediaId: null,
      error: false,
      postSent: false
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.fileRaw !== prevState.fileRaw) {
      this.handleFile();
    }
  };

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
      file: null,
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

  handleFile = () => {
    let fileObject = this.state.fileRaw;
    let fileName = fileObject.name;
    const fileSize = fileObject.size;
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
        file: fileObject
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
        this.setState({
          error: true,
          helperText: Object.values(error.response.data)[0]
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
            helperText: Object.values(error.response.data)[0]
          });
        })
        .then(() => {
          this.setState({ postSent: false });
        });
    } else {
      this.messagePost();
    }
  };

  render() {
    const classes = this.props.classes;
    return (
      <React.Fragment>
        <FormControl
          onDragOver={event => event.preventDefault()}
          onDrop={event => {
            event.preventDefault();
            this.setState({ fileRaw: event.dataTransfer.files[0] });
          }}
          className={classes.textBox}
        >
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
                  onChange={event => {
                    this.setState({ fileRaw: event.target.files[0] });
                  }}
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
