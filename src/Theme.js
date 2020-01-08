import { createMuiTheme } from "@material-ui/core/styles";

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: "#E30B5C"
    },
    secondary: {
      main: "#00E676"
    }
  }
});

const DarkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#272C34"
    },
    secondary: {
      main: "#47945C"
    }
  }
});

export { Theme, DarkTheme };
