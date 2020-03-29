import React, { Component } from "react";
import { connect } from "react-redux";

import Toggler from "../../components/Toggler";
import { toggleOpened } from "../../../../../event/src/actions/UI";
import { getInitialTree } from "../../../../../event/src/actions/API";

import "./App.css";

class App extends Component {
  componentDidMount() {
    const pathLiterals = window.location.pathname
      .split("/")
      .filter(pathSub => pathSub.length !== 0);
    getInitialTree(`${pathLiterals[0]}%2F${pathLiterals[1]}`);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tree !== this.props.tree) {
      console.log(this.props.tree);
    }
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

const mapStateToProps = state => {
  return {
    opened: state.opened,
    pinned: state.pinned,
    tree: state.tree
  };
};

const mapDispatchToProps = { toggleOpened, getInitialTree };

export default connect(mapStateToProps, mapDispatchToProps)(App);
