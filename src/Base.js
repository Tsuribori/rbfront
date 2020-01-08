import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import BrightnessIcon from "@material-ui/icons/Brightness7";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { ThemeProvider } from "@material-ui/styles";
import { withStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import DocumentTitle from "react-document-title";

import { Theme, DarkTheme } from "./Theme.js";
import Home from "./Home.js";
import CreateThread from "./CreateThread.js";
import Privacy from "./Privacy.js";
import Thread from "./Thread.js";
import Public from "./Public.js";
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
      anchorEl: null,
      darkTheme: false
    };
  }

  handleMenu = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  changeTheme = () => {
    const newTheme = this.state.darkTheme ? "0" : "1";
    localStorage.setItem("darkTheme", newTheme);
    this.setState({ darkTheme: !this.state.darkTheme });
  };

  componentDidMount() {
    const darkTheme = localStorage.getItem("darkTheme");
    if (darkTheme === "1") {
      this.setState({ darkTheme: true });
    }
  }

  render() {
    const classes = this.props.classes;
    return (
      <DocumentTitle title={process.env.REACT_APP_SITE_NAME}>
        <ThemeProvider theme={this.state.darkTheme ? DarkTheme : Theme}>
          <CssBaseline>
            <Router>
              <AppBar position="static">
                <Toolbar className={classes.toolBar}>
                  <IconButton component={Link} to="/">
                    <HomeIcon />
                  </IconButton>
                  <div>
                    <IconButton onClick={this.changeTheme}>
                      <BrightnessIcon />
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
                      <MenuItem component={Link} to="/public">
                        Public threads
                      </MenuItem>
                      <MenuItem component={Link} to="/privacy">
                        Privacy
                      </MenuItem>
                    </Menu>
                  </div>
                </Toolbar>
              </AppBar>

              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/create" component={CreateThread} />
                <Route path="/public" component={Public} />
                <Route path="/privacy" component={Privacy} />
                <Route path="/thread/:threadId" component={Thread} />
                <Route component={NotFound} />
              </Switch>
            </Router>
          </CssBaseline>
        </ThemeProvider>
      </DocumentTitle>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Base);
