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
  constructor(props, context) {
    super(props, context);
    this.state = {
      rendering: true,
      setRendering: (rendering) => {
        this.setState((prevState) => {
          return { rendering: rendering, setRendering: prevState.setRendering };
        });
      },
    };
  }

  componentDidMount() {
    const bindToHistory = () => {
      console.log("Rendering set True 4");
      this.state.setRendering(true);
    };
    // window.onpopstate = function (event) {
    //   bindToHistory();
    // };
    let prevHref = window.location.href;
    setInterval(function () {
      if (window.location.href !== prevHref) {
        bindToHistory();
      }
      prevHref = window.location.href;
    }, 10);
    if (this.props.opened) {
      applyOpenedPageStyling(this.props.width);
    } else {
      applyClosedPageStyling();
    }
  }

  componentDidUpdate(_prevProps, _prevState) {
    if (this.props.opened) {
      applyOpenedPageStyling(this.props.width);
    } else {
      applyClosedPageStyling();
    }
  }

  render() {
    const URLDetails = fetchURLDetails();
    if (!URLDetails.isRepo || !URLDetails.isTreeVisible) {
      if (this.props.opened) this.props.toggleOpened();
      applyClosedPageStyling();
      return null;
    }

    return this.props.opened
      ? ReactDOM.createPortal(
          <Pane
            toggleOpened={this.props.toggleOpened}
            width={this.props.width}
            rendering={this.state.rendering}
            setRendering={this.state.setRendering}
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
