import React, { Component } from "react";
import { connect } from "react-redux";

import Toggler from "../../components/Toggler";
import { toggleOpened } from "../../../../../event/src/actions/UI";

import "./App.css";

class App extends Component {
  componentDidMount() {
    // console.log(this.props);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps.opened, this.props.opened);
  }

  render() {
    return (
      <Toggler
        handleClick={this.props.toggleOpened}
        pinned={this.props.pinned}
      />
    );
  }
}

// function App({ opened, pinned, toggleOpened }) {
//   return <Toggler handleClick={toggleOpened} pinned={pinned} />;
// }

const mapStateToProps = state => {
  return {
    opened: state.opened,
    pinned: state.pinned
  };
};

const mapDispatchToProps = { toggleOpened };

export default connect(mapStateToProps, mapDispatchToProps)(App);
