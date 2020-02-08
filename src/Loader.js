import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  loader: {
    textAlign: "center",
    paddingTop: theme.spacing(2)
  }
});

const Loader = props => (
  <div className={props.classes.loader}>
    <CircularProgress color="secondary" />
  </div>
);

export default withStyles(styles)(Loader);
