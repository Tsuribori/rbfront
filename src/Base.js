import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { ThemeProvider } from "@material-ui/styles";
import { withStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import DocumentTitle from "react-document-title";

import Theme from "./Theme.js";
import Home from "./Home.js";
import CreateThread from "./CreateThread.js";
import Privacy from "./Privacy.js";
import Thread from "./Thread.js";
import NotFound from "./NotFound.js";

const styles = theme => ({
  toolBar: {
    display: "flex",
    justifyContent: "space-between"
  }
});

class Base extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleMenu = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const classes = this.props.classes;
    return (
      <DocumentTitle title={process.env.REACT_APP_SITE_NAME}>
        <CssBaseline>
          <ThemeProvider theme={Theme}>
            <Router>
              <AppBar position="static">
                <Toolbar className={classes.toolBar}>
                  <IconButton component={Link} to="/">
                    <HomeIcon />
                  </IconButton>
                  <IconButton onClick={this.handleMenu}>
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                  >
                    <MenuItem component={Link} to="/create">
                      Create thread
                    </MenuItem>
                    <MenuItem component={Link} to="/privacy">
                      Privacy
                    </MenuItem>
                  </Menu>
                </Toolbar>
              </AppBar>

              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/create" component={CreateThread} />
                <Route path="/privacy" component={Privacy} />
                <Route path="/thread/:threadId" component={Thread} />
                <Route component={NotFound} />
              </Switch>
            </Router>
          </ThemeProvider>
        </CssBaseline>
      </DocumentTitle>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Base);
