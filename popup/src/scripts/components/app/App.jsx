import React, { Component } from "react";

import "./styles.css";
import CheckBox from "../CheckBox/CheckBox";

class App extends Component {
  constructor(props) {
    super(props);
    this.options = [
      {
        name: "Compatibility Mode",
        keyName: "compatibility-mode",
        type: "checkBox",
        defaultVal: false,
      },
    ];
    this.renderOptions = () => {
      return (
        <ul className="options">
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

  componentDidMount() {
    console.log("Pop-up Mounted");
  }

  render() {
    return this.renderOptions();
  }
}

export default App;
