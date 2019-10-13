import React, { Component } from "react";
import Fab from "@material-ui/core/Fab";
import CreateIcon from "@material-ui/icons/Create";
import Drawer from "@material-ui/core/Drawer";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import PublishIcon from "@material-ui/icons/Publish";
import ImageIcon from "@material-ui/icons/Image";
import BackArrow from "@material-ui/icons/ArrowBackIos";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";

import ThreadFormat from "./ThreadFormat.js";

const styles = theme => ({
  fab: {
    position: "absolute",
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
      thread: [],
      loaded: false,
      drawerOpen: false
    };
  }

  componentDidMount() {
    axios
      .get(`/api/thread/${this.props.match.params.threadId}/`)
      .then(response => {
        this.setState({ thread: response.data, loaded: true });
      })
      .catch();
  }

  handleMessageDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
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
          <ClickAwayListener onClickAway={this.handleMessageDrawer}>
            <FormControl className={classes.textBox}>
              <TextField multiline label="Message" />
              <div className={classes.buttonContainer}>
                <div>
                  <IconButton onClick={this.handleMessageDrawer}>
                    <BackArrow />
                  </IconButton>
                </div>
                <div>
                  <IconButton>
                    <ImageIcon />
                  </IconButton>
                  <IconButton>
                    <PublishIcon />
                  </IconButton>
                </div>
              </div>
            </FormControl>
          </ClickAwayListener>
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
