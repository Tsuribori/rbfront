import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Moment from "react-moment";
import { Lightbox } from "react-modal-image";

const styles = theme => ({
  contentGrid: {
    wordBreak: "break-word",
    flexWrap: "wrap"
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
  },
  message: {
    whiteSpace: "pre-line"
  }
});

function ThreadFormat(props) {
  const classes = props.classes;
  const thread = props.thread;
  const [lightbox, setLightbox] = useState(false);
  const [media, setMedia] = useState([]);

  return (
    <Container className={classes.threadBox}>
      {lightbox && (
        <Lightbox
          large={media.image}
          alt={media.media_id}
          onClose={() => setLightbox(false)}
        />
      )}
      <div>
        <Typography variant="h5" component="h5" className={classes.title}>
          {thread.subject}
        </Typography>
        {thread.messages.map(message => (
          <React.Fragment key={message.id}>
            <Card elevation={0} square={true}>
              <Grid container className={classes.contentGrid}>
                <Grid item>
                  <CardMedia
                    className={classes.thumbnail}
                    image={message.media.thumbnail}
                    onClick={() => {
                      setMedia(message.media);
                      setLightbox(true);
                    }}
                  />
                </Grid>
                <Grid item>
                  <CardContent>
                    <Typography variant="caption" component="p">
                      <Moment format="YYYY-MM-DD HH:mm:ss">
                        {message.date}
                      </Moment>
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <CardContent>
                    <Typography
                      variant="body2"
                      component="p"
                      className={classes.message}
                    >
                      {message.post}
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
            <Divider />
          </React.Fragment>
        ))}
        {thread.messages.length === 0 && (
          <Typography variant="body2" component="p">
            No posts here yet!
          </Typography>
        )}
      </div>
    </Container>
  );
}

export default withStyles(styles)(ThreadFormat);
