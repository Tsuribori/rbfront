import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  textBox: {
    textAlign: "center",
    paddingTop: theme.spacing(5)
  },
  subTitle: {
    paddingTop: theme.spacing(2)
  }
});

function NotFound(props) {
  const classes = props.classes;

  return (
    <Container maxWidth="sm" className={classes.textBox}>
      <Typography variant="h2" component="h2">
        404
      </Typography>
      <Typography variant="h6" component="h6" className={classes.subTitle}>
        Page doesn't exist. Maybe it never did.
      </Typography>
    </Container>
  );
}

export default withStyles(styles)(NotFound);
