import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Link } from "react-router-dom";
import LinkFormat from "@material-ui/core/Link";
import MessageIcon from "@material-ui/icons/Message";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import DocumentTitle from "react-document-title";
import InfiniteScroll from "react-infinite-scroller";

const styles = theme => ({
  messageCount: {
    alignItems: "flex-start"
  },
  loader: {
    textAlign: "center"
  },
  empty: {
    textAlign: "center",
    paddingTop: theme.spacing(5)
  }
});

class Public extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threads: [],
      next: "/api/public/",
      loaded: false
    };
  }

  getNext = () => {
    const next = this.state.next;
    this.setState({ next: null }); // Prevent duplicates from loading
    axios.get(next).then(response => {
      this.setState({
        threads: this.state.threads.concat(response.data.results),
        next: response.data.next,
        loaded: true
      });
    });
  };

  render() {
    const classes = this.props.classes;
    return (
      <DocumentTitle title="Public threads">
        <Container>
          {this.state.threads.length === 0 && this.state.loaded && (
            <Typography className={classes.empty} variant="h5">
              No threads here yet!
            </Typography>
          )}
          <InfiniteScroll
            loadMore={this.getNext}
            hasMore={Boolean(this.state.next)}
            loader={
              <div key={0} className={classes.loader}>
                <CircularProgress color="secondary" />
              </div>
            }
          >
            <List>
              {this.state.threads.map(thread => (
                <React.Fragment key={thread.thread_id}>
                  <ListItem>
                    <div className={classes.messageCount}>
                      <ListItemIcon>
                        <MessageIcon />
                      </ListItemIcon>
                      <ListItemText primary={thread.message_count} />
                    </div>
                    <ListItemText>
                      <LinkFormat
                        color="secondary"
                        component={Link}
                        to={`/thread/${thread.thread_id}`}
                      >
                        {thread.subject}
                      </LinkFormat>
                    </ListItemText>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </InfiniteScroll>
        </Container>
      </DocumentTitle>
    );
  }
}

export default withStyles(styles)(Public);
