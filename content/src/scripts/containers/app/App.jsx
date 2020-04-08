import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import Toggler from "../../components/Toggler";
import Pane from "../../components/Pane";
import {
  applyClosedPageStyling,
  applyOpenedPageStyling,
} from "../../utils/styling";
import { toggleOpened } from "../../../../../event/src/actions/UI";

import "./App.css";

const parentDiv = document.querySelector("body");

class App extends Component {
  componentDidMount() {
    if (this.props.opened) {
      applyOpenedPageStyling();
    } else {
      applyClosedPageStyling();
    }
  }

  componentDidUpdate(_prevProps, _prevState) {
    if (this.props.opened) {
      applyOpenedPageStyling();
    } else {
      applyClosedPageStyling();
    }
  }

  renderOpenPane() {
    return ReactDOM.createPortal(
      <Pane
        // opened={this.props.opened}
        // pinned={this.props.pinned}
        tree={this.props.tree}
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
  };
};

const mapDispatchToProps = { toggleOpened };

export default connect(mapStateToProps, mapDispatchToProps)(App);
