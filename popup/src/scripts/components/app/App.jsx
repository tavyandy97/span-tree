import React, { useEffect } from "react";
import localforage from "localforage";
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
  useEffect(() => {
    localforage.getItem("spantree-options", function (err, value) {
      if (err || !value) {
        dispatch({
          type: "OPTIONS_CHANGED",
          payload: optionList,
        });
      } else {
        dispatch({
          type: "OPTIONS_CHANGED",
          payload: value,
        });
      }
    });
  }, []);

  return (
    <div className="spantree-popup">
      <div className="spantree-options-heading">SpanTree Options</div>
      <Options
        options={options}
        optionList={optionList}
        changeOptions={(newOptions) => {
          localforage.setItem("spantree-options", newOptions);
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
