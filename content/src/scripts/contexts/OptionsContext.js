import React, { createContext } from "react";
import { connect } from "react-redux";

const OptionsContext = createContext({
  options: {},
});

function OptionsProvider({ children, options }) {
  const defaultOptions = { "auto-theme": false, "compatibility-mode": true };
  Object.keys(defaultOptions).forEach((key) => {
    if (key in options) {
      defaultOptions[key] = options[key];
    }
  });

  return (
    <OptionsContext.Provider
      value={{
        options: defaultOptions,
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
}

const mapStateToProps = (state) => {
  return {
    options: state.options,
  };
};

const mapDispatchToProps = {};

const ConnectedOptionsConext = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OptionsProvider);

export { ConnectedOptionsConext as OptionsProvider, OptionsContext };
