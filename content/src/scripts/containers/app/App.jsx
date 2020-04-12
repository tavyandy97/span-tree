import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import Toggler from "../../components/Toggler";
import Pane from "../../components/Pane";
import {
  applyClosedPageStyling,
  applyOpenedPageStyling,
} from "../../utils/styling";
import { fetchURLDetails } from "../../utils/url";
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

  render() {
    const URLDetails = fetchURLDetails();
    if (!URLDetails.isRepo) return null;

    return this.props.opened ? (
      ReactDOM.createPortal(
        <Pane toggleOpened={this.props.toggleOpened} />,
        parentDiv
      )
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
