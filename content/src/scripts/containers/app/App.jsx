import React, { Component } from "react";
import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);
    this.style = {
      position: "fixed",
      color: "red",
      top: "50%"
    };
  }

  // componentDidMount() {
  // document.addEventListener('click', () => {
  //   this.props.dispatch({
  //     type: 'ADD_COUNT'
  //   });
  // });
  // }

  render() {
    return <div style={this.style}>Count: {this.props.count}</div>;
  }
}

const mapStateToProps = state => {
  return {
    count: state.count
  };
};

export default connect(mapStateToProps)(App);
