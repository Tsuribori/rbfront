import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

class Thread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thread: []
    };
  }

  componentDidMount() {
    axios
      .get(`/api/${this.props.thread_id}`)
      .then(response => {
        this.setState({ thread: response.data });
      })
      .catch();
  }
}
