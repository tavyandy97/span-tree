import React, { useEffect } from "react";
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

const SPANTREE_OPTIONS_CONSTANT = "spantree-options";

const App = ({ dispatch, options }) => {
  useEffect(() => {
    chrome.storage.local.get([SPANTREE_OPTIONS_CONSTANT], (result) => {
      const optionsFromStorage = result[SPANTREE_OPTIONS_CONSTANT];
      dispatch({
        type: "OPTIONS_CHANGED",
        payload: optionsFromStorage || optionList,
      });
    });
  }, []);

  return (
    <div className="spantree-popup">
      <div className="spantree-options-heading">SpanTree Options</div>
      <Options
        options={options}
        optionList={optionList}
        changeOptions={(newOptions) => {
          chrome.storage.local.set({ [SPANTREE_OPTIONS_CONSTANT]: newOptions });
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
