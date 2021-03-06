import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import DocumentTitle from "react-document-title";

const styles = theme => ({
  textBox: {
    textAlign: "center",
    paddingTop: theme.spacing(5)
  },
  statement: {
    paddingTop: theme.spacing(3)
  }
});

function Privacy(props) {
  const classes = props.classes;

  return (
    <DocumentTitle title="Privacy Policy">
      <Container maxWidth="sm" className={classes.textBox}>
        <Typography variant="h5" component="h5">
          Privacy Policy
        </Typography>

        <Typography variant="body1" className={classes.statement}>
          This website stores no information about you. It does not collect user
          metrics or your IP address. The web server stores no access logs.
        </Typography>
      </Container>
    </DocumentTitle>
  );
}

export default withStyles(styles)(Privacy);
