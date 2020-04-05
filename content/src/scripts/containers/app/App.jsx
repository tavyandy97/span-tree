import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import Toggler from "../../components/Toggler";
import TreePane from "../../components/TreePane";
import {
  applyClosedPageStyling,
  applyOpenedPageStyling,
} from "../../utils/styling";
import { toggleOpened } from "../../../../../event/src/actions/UI";
import { getInitialTree } from "../../../../../event/src/actions/API";

import "./App.css";

const parentDiv = document.querySelector("body");

class App extends Component {
  componentDidMount() {
    const pathLiterals = window.location.pathname
      .split("/")
      .filter((pathSub) => pathSub.length !== 0);
    getInitialTree(`${pathLiterals[0]}%2F${pathLiterals[1]}`);
    if (this.props.opened) {
      applyOpenedPageStyling();
    } else {
      applyClosedPageStyling();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.tree !== this.props.tree) {
      console.log(this.props.tree);
    }
    if (this.props.opened) {
      applyOpenedPageStyling();
    } else {
      applyClosedPageStyling();
    }
  }

  renderOpenPane() {
    return ReactDOM.createPortal(
      <TreePane
        opened={this.props.opened}
        pinned={this.props.pinned}
        toggleOpened={this.props.toggleOpened}
        pathLiterals={window.location.pathname
          .split("/")
          .filter((pathSub) => pathSub.length !== 0)}
      />,
      parentDiv
    );
  }

  render() {
    return this.props.opened ? (
      this.renderOpenPane()
    ) : (
      <Toggler
        handleClick={this.props.toggleOpened}
        pinned={this.props.pinned}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    opened: state.opened,
    pinned: state.pinned,
    tree: state.tree,
  };
};

const mapDispatchToProps = { toggleOpened, getInitialTree };

export default connect(mapStateToProps, mapDispatchToProps)(App);
