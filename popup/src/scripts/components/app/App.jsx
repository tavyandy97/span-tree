import React from "react";
import { connect } from "react-redux";

import Options from "../options";

import "./styles.css";

const optionList = [
  {
    name: "Compatibility Mode",
    keyName: "compatibility-mode",
    type: "CheckBox",
    defaultVal: true,
  },
  {
    name: "Auto Theme",
    keyName: "auto-theme",
    type: "CheckBox",
    defaultVal: false,
  },
];

const App = ({ dispatch, options }) => {
  return (
    <div className="spantree-popup">
      <div className="spantree-options-heading">SpanTree Options</div>
      <Options
        options={options.data}
        optionList={optionList}
        changeOptions={(newOptions) => {
          dispatch({
            type: "OPTIONS_CHANGED",
            payload: newOptions,
          });
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    options: state.options,
  };
};

export default connect(mapStateToProps)(App);
