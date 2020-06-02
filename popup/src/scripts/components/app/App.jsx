import React, { Component } from "react";

import CheckBox from "../CheckBox/CheckBox";
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
    this.renderOptions = () => {
      return (
        <ul className="spantree-options">
          {this.options.map((option) => (
            <CheckBox
              name={option.name}
              keyName={option.keyName}
              defaultVal={option.defaultVal}
            />
          ))}
        </ul>
      );
    };
  }

  render() {
    return (
      <div className="spantree-popup">
        <div className="spantree-options-heading">SpanTree Options</div>
        {this.renderOptions()}
      </div>
    );
  }
}

export default App;
