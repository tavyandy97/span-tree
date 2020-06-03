import React, { Component } from "react";
import { connect } from "react-redux";

import Options from "../options";

import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.optionList = [
      {
        name: "Compatibility Mode",
        keyName: "compatibility-mode",
        type: "CheckBox",
        defaultVal: false,
      },
    ];
    this.changeOptions = (options) => {
      this.props.dispatch({
        type: "OPTIONS_CHANGED",
        payload: options,
      });
    };
  }

  render() {
    return (
      <div className="spantree-popup">
        <div className="spantree-options-heading">SpanTree Options</div>
        <Options
          options={this.props.options}
          optionList={this.optionList}
          changeOptions={this.changeOptions}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    options: state.options,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
