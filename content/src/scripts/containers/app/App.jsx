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
  constructor(props) {
    super(props);
    this.state = {
      firstPageLoad: true,
    };
    this.setFirstPageLoad = (firstPageLoad) => {
      this.setState({ firstPageLoad });
    };
    this.shouldShowSpanTree = () => {
      return (
        document.querySelector(".qa-branches-select") !== null &&
        document.querySelector(".nav-sidebar") !== null
      );
    };
  }

  componentDidMount() {
    if (this.props.opened && this.shouldShowSpanTree()) {
      applyOpenedPageStyling(this.props.width);
    } else {
      applyClosedPageStyling();
    }
  }

  componentDidUpdate(_prevProps, _prevState) {
    if (this.props.opened && this.shouldShowSpanTree()) {
      applyOpenedPageStyling(this.props.width);
    } else {
      applyClosedPageStyling();
    }
  }

  render() {
    if (!this.shouldShowSpanTree()) {
      if (this.props.opened) this.props.toggleOpened();
      applyClosedPageStyling();
      return null;
    }

    return this.props.opened
      ? ReactDOM.createPortal(
          <Pane
            toggleOpened={this.props.toggleOpened}
            width={this.props.width}
            firstPageLoad={this.state.firstPageLoad}
            setFirstPageLoad={this.setFirstPageLoad}
          />,
          parentDiv
        )
      : ReactDOM.createPortal(
          <Toggler
            handleClick={this.props.toggleOpened}
            pinned={this.props.pinned}
          />,
          document.getElementById("rcr-anchor")
        );
  }
}

const mapStateToProps = (state) => {
  return {
    opened: state.opened,
    pinned: state.pinned,
    width: state.width,
  };
};

const mapDispatchToProps = { toggleOpened };

export default connect(mapStateToProps, mapDispatchToProps)(App);
