import React, { Component } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import "./App.css";

import Button from "@material-ui/core/Button";

import * as api from "../api";

export default class App extends Component {
  componentWillMount() {
    api.setup();
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Button variant="contained" color="primary">
            Hello 'Material Design'!!
          </Button>
          <br />
          <a
            href="https://material-ui.com/getting-started/installation/"
            target="_newWin"
          >
            Documentation
          </a>
        </div>
      </Provider>
    );
  }
}
