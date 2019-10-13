import React from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Moment from "react-moment";

const styles = theme => ({
  contentGrid: {
    wordBreak: "break-all",
    flexWrap: "nowrap"
  },
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

function ThreadFormat(props) {
  const classes = props.classes;
  const thread = props.thread;

  return (
    <Container className={classes.threadBox}>
      <div>
        <Typography variant="h5" component="h5" className={classes.title}>
          {thread.subject}
        </Typography>
        {thread.messages.map(message => (
          <Card elevation={0} key={message.id} square={true}>
            <Grid container className={classes.contentGrid}>
              <Grid item>
                <CardMedia
                  className={classes.thumbnail}
                  image={message.media.thumbnail}
                />
              </Grid>
              <Grid item>
                <CardContent>
                  <Typography variant="caption" component="span">
                    <Moment format="YYYY-MM-DD HH:mm:ss">{message.date}</Moment>
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
    </Container>
  );
}

export default withStyles(styles)(ThreadFormat);
