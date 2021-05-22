import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { TabIdentifierClient } from "chrome-tab-identifier";

import Toggler from "../../components/Toggler";
import Pane from "../../components/Pane";
import SearchBar from "../SearchBar";
import { toggleOpened } from "../../../../../event/src/actions/UI";
import {
  applyClosedPageStyling,
  applyOpenedPageStyling,
} from "../../utils/styling";
import { browserKey } from "../../utils/browser";
import searchBarWorkerJS from "../../utils/searchBarWorker";
import WebWorker from "./WebWorker";

import "./App.css";

const importFileIconCSS = `${browserKey()}-extension://${chrome.i18n.getMessage(
  "@@extension_id",
)}/libs/file-icons.css`;
const tabIdClient = new TabIdentifierClient();
const parentDiv = document.querySelector("body");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstPageLoad: true,
      reloading: true,
      showSearchbar: false,
      tabId: null,
    };
    this.toggleOpenedThisTab = () => {
      this.props.toggleOpened({
        tabId: this.state.tabId,
      });
    };
    this.setFirstPageLoad = (firstPageLoad) => {
      this.setState({ firstPageLoad });
    };
    this.setReloading = (reloading) => {
      this.setState({ reloading });
    };
    this.shouldShowSpanTree = () => {
      return (
        document.querySelector(".qa-branches-select") !== null &&
        document.querySelector(".nav-sidebar") !== null
      );
    };
    this.setShowSearchbar = (showSearchbar) => {
      this.setState({ showSearchbar });
    };
    this.searchBarWorker = new WebWorker(searchBarWorkerJS);
  }

  componentDidMount() {
    tabIdClient.getTabId().then((tab) => {
      this.setState({
        tabId: tab,
      });
    });
  }

  componentDidUpdate(_prevProps, prevState) {
    const { tabId } = this.state;
    if (tabId !== prevState.tabId) {
      if (this.props.opened[tabId] && this.shouldShowSpanTree()) {
        applyOpenedPageStyling(this.props.width);
      } else {
        applyClosedPageStyling();
      }
    }

    if (tabId) {
      if (this.props.opened[tabId] && this.shouldShowSpanTree()) {
        applyOpenedPageStyling(this.props.width);
      } else {
        applyClosedPageStyling();
      }
    }
  }

  render() {
    const { tabId } = this.state;
    if (!tabId) return null;
    if (!this.shouldShowSpanTree()) {
      if (this.props[tabId].opened) this.toggleOpenedThisTab();
      applyClosedPageStyling();
      return null;
    }

    return (
      <Fragment>
        <link rel="stylesheet" type="text/css" href={importFileIconCSS} />
        {this.props.opened[tabId]
          ? ReactDOM.createPortal(
              <Pane
                toggleOpened={this.toggleOpenedThisTab}
                width={this.props.width}
                firstPageLoad={this.state.firstPageLoad}
                setFirstPageLoad={this.setFirstPageLoad}
                reloading={this.state.reloading}
                setReloading={this.setReloading}
                setShowSearchbarTrue={() => this.setShowSearchbar(true)}
              />,
              parentDiv,
            )
          : ReactDOM.createPortal(
              <Toggler
                handleClick={this.toggleOpenedThisTab}
                pinned={this.props.pinned}
              />,
              document.getElementById("rcr-anchor"),
            )}
        <SearchBar
          worker={this.searchBarWorker}
          showSearchbar={this.state.showSearchbar}
          setShowSearchbar={this.setShowSearchbar}
        />
      </Fragment>
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
