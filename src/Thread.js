import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Moment from "react-moment";

const styles = theme => ({
  threadBox: {
    paddingTop: theme.spacing(3)
  },
  title: {
    paddingBottom: theme.spacing(2)
  },
  thumbnail: {
    height: theme.spacing(10),
    width: theme.spacing(10)
  }
});

class Thread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thread: [],
      loaded: false
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

  render() {
    const classes = this.props.classes;
    return (
      <Container className={classes.threadBox}>
        {this.state.loaded && (
          <div>
            <Typography variant="h5" component="h5" className={classes.title}>
              {this.state.thread.subject}
            </Typography>
            {this.state.thread.messages.map(message => (
              <Card elevation={0} key={message.id} className={classes.card}>
                <Grid container wrap="nowrap" zeroMinWidth={true}>
                  <Grid item>
                    <CardMedia
                      className={classes.thumbnail}
                      image={message.media.thumbnail}
                    />
                  </Grid>
                  <Grid item>
                    <CardContent>
                      <Typography variant="caption" component="span">
                        <Moment format="YYYY-MM-DD HH:mm:ss">
                          {message.date}
                        </Moment>
                      </Typography>
                      <Typography variant="body2" component="p">
                        {message.post}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </div>
        )}
      </Container>
    );
  }
}

export default withStyles(styles)(Thread);
