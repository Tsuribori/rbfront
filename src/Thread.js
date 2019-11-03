import React, { Component } from "react";
import Fab from "@material-ui/core/Fab";
import CreateIcon from "@material-ui/icons/Create";
import Drawer from "@material-ui/core/Drawer";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import PublishIcon from "@material-ui/icons/Publish";
import ImageIcon from "@material-ui/icons/Image";
import BackArrow from "@material-ui/icons/ArrowBackIos";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";

import ThreadFormat from "./ThreadFormat.js";

const styles = theme => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
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

class Thread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threadId: this.props.match.params.threadId,
      thread: [],
      loaded: false,
      drawerOpen: false,
      message: "",
      fileName: "",
      file: null,
      mediaId: null,
      error: false,
      buttonDisabled: true,
      postSent: false
    };
  }

  loadThread = () => {
    axios
      .get(`/api/thread/${this.state.threadId}/`)
      .then(response => {
        this.setState({ thread: response.data, loaded: true });
      })
      .catch(error => {
        if (error.response.status === 404) {
          this.props.history.push("/404");
        }
      });
  };

  componentDidMount() {
    this.loadThread();
  }

  cleanErrors = () => {
    this.setState({
      error: false,
      helperText: "",
      buttonDisabled: false
    });
  };

  handleMessageDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  handleMessage = event => {
    this.setState({ message: event.target.value });
    const messageLength = event.target.value.length;
    if (messageLength > 2000) {
      this.setState({
        error: true,
        helperText: "Message too long!",
        buttonDisabled: true
      });
    } else if (messageLength === 0) {
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
        helperText: "File size too big, max 10MB allowed!"
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
        thread: this.state.threadId,
        media: this.state.mediaId
      })
      .then(response => {
        this.handleMessageDrawer();
        this.loadThread();
      })
      .catch(error => {
        this.setState({
          error: true,
          helperText: "Error while posting."
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
        helperText: "File is required for posting."
      });
    }
  };

  render() {
    const classes = this.props.classes;
    return (
      <div>
        {this.state.loaded && <ThreadFormat thread={this.state.thread} />}
        <Drawer
          anchor="bottom"
          variant="persistent"
          open={this.state.drawerOpen}
        >
          {this.state.postSent && <LinearProgress color="secondary" />}
          <FormControl className={classes.textBox}>
            <TextField
              multiline
              error={this.state.error}
              helperText={this.state.helperText}
              label="Message"
              onChange={this.handleMessage}
            />
            <div className={classes.buttonContainer}>
              <div>
                <IconButton onClick={this.handleMessageDrawer}>
                  <BackArrow />
                </IconButton>
              </div>
              <div>
                {this.state.fileName}
                <input
                  hidden
                  accept="image/png|image/jpg|image/jpeg|image/gif"
                  type="file"
                  id="file-input"
                  onChange={this.handleFile}
                />
                <label htmlFor="file-input">
                  <IconButton component="span">
                    <ImageIcon />
                  </IconButton>
                </label>
                <IconButton
                  disabled={this.state.buttonDisabled}
                  onClick={this.handleUpload}
                >
                  <PublishIcon />
                </IconButton>
              </div>
            </div>
          </FormControl>
        </Drawer>
        {!this.state.drawerOpen && (
          <Fab
            className={classes.fab}
            color="secondary"
            onClick={this.handleMessageDrawer}
          >
            <CreateIcon />
          </Fab>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Thread);
