import React, { createContext } from "react";
import { connect } from "react-redux";

const OptionsContext = createContext({
  options: {},
});

export const defaultOptions = {
  "auto-theme": false,
  "compatibility-mode": true,
};

function OptionsProvider({ children, options }) {
  Object.keys(defaultOptions).forEach((key) => {
    if (key in options.data) {
      defaultOptions[key] = options.data[key];
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

const ConnectedOptionsConext = connect(mapStateToProps)(OptionsProvider);

export { ConnectedOptionsConext as OptionsProvider, OptionsContext };
