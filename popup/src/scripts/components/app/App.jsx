import React, { Component } from "react";

import Options from "../options";

import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.options = [
      {
        name: "Compatibility Mode",
        keyName: "compatibility-mode",
        type: "CheckBox",
        defaultVal: false,
      },
    ];
  }

  componentDidMount() {
    console.log("MOUNTED");
  }

  render() {
    return (
      <div className="spantree-popup">
        <div className="spantree-options-heading">SpanTree Options</div>
        <Options options={this.options} />
      </div>
    );
  }
}

export default App;
