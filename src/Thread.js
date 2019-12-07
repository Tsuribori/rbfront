import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import CreateIcon from "@material-ui/icons/Create";
import Drawer from "@material-ui/core/Drawer";
import CardActionArea from "@material-ui/core/CardActionArea";
import CircularProgress from "@material-ui/core/CircularProgress";
import RefreshIcon from "@material-ui/icons/Refresh";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import DocumentTitle from "react-document-title";

import ThreadFormat from "./ThreadFormat.js";
import Send from "./Send.js";

const styles = theme => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  refreshButtonContainer: {
    marginBottom: theme.spacing(2)
  },
  refreshButton: {
    textAlign: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    minHeight: theme.spacing(10)
  }
});

class Thread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threadId: this.props.match.params.threadId,
      thread: [],
      title: "Thread",
      loaded: false,
      refreshing: false,
      drawerOpen: false
    };
  }

  loadThread = () => {
    this.setState({ refreshing: true });
    axios
      .get(`/api/thread/${this.state.threadId}/`)
      .then(response => {
        this.setState({
          thread: response.data,
          loaded: true,
          title: response.data.subject
        });
      })
      .catch(error => {
        if (error.response.status === 404) {
          this.props.history.push("/404");
        }
      })
      .then(() => {
        this.setState({ refreshing: false });
      });
  };

  componentDidMount() {
    this.loadThread();
  }

  handleMessageDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  render() {
    const classes = this.props.classes;
    return (
      <DocumentTitle title={this.state.title}>
        <React.Fragment>
          {this.state.loaded && <ThreadFormat thread={this.state.thread} />}
          {!this.state.thread.closed && (
            <Container className={classes.refreshButtonContainer}>
              <CardActionArea
                className={classes.refreshButton}
                onClick={this.loadThread}
              >
                {this.state.refreshing ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <RefreshIcon fontSize="large" color="secondary" />
                )}
              </CardActionArea>
            </Container>
          )}
          <Drawer
            anchor="bottom"
            variant="persistent"
            open={this.state.drawerOpen}
          >
            <Send
              threadId={this.state.threadId}
              loadThread={this.loadThread}
              handleMessageDrawer={this.handleMessageDrawer}
            />
          </Drawer>
          {!this.state.drawerOpen && !this.state.thread.closed && (
            <Fab
              className={classes.fab}
              color="secondary"
              onClick={this.handleMessageDrawer}
            >
              <CreateIcon />
            </Fab>
          )}
        </React.Fragment>
      </DocumentTitle>
    );
  }
}

export default withStyles(styles)(Thread);
