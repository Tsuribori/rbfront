import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import { withStyles } from "@material-ui/core/styles";
import Moment from "react-moment";
import { Lightbox } from "react-modal-image";
import ReactMarkdown from "react-markdown";

const styles = theme => ({
  threadBox: {
    paddingTop: theme.spacing(3)
  },
  titleBox: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: theme.spacing(2)
  },
  subject: {
    minWidth: "80%",
    overflowWrap: "break-word"
  },
  thumbnail: {
    height: theme.spacing(10),
    width: theme.spacing(10),
    borderRadius: "5%"
  },
  postContent: {
    padding: theme.spacing(2)
  },
  message: {
    whiteSpace: "pre-line",
    overflowWrap: "anywhere",
    "& blockquote": {
      margin: 0,
      color: "#22BA6D"
    }
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
        <div className={classes.titleBox}>
          <Typography className={classes.subject} variant="h5" component="h5">
            {thread.subject}
          </Typography>
          {thread.closed && (
            <Tooltip title="Closed">
              <AllInboxIcon fontSize="large" />
            </Tooltip>
          )}
        </div>
        {thread.messages.map(message => (
          <React.Fragment key={message.id}>
            <Card elevation={0} square={true}>
              <Grid container>
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
                  <div className={classes.postContent}>
                    <ReactMarkdown
                      className={classes.message}
                      disallowedTypes={["image"]}
                      linkTarget="_blank"
                      source={message.post}
                    />
                  </div>
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
