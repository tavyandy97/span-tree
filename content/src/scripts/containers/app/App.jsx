import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";

class App extends Component {
  componentDidMount() {
    document.addEventListener("click", () => {
      this.props.dispatch({
        type: "ADD_COUNT"
      });
    });
  }

  render() {
    return <div className="panel">Count: {this.props.count}</div>;
  }
}

const mapStateToProps = state => {
  return {
    count: state.count
  };
};

export default connect(mapStateToProps)(App);
