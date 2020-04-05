import React from "react";

import { paneWidth } from "../../utils/styling";

import "./styles.css";

function TreePane({}) {
  return (
    <div className="tree-pane" style={{ width: paneWidth() }}>
      <div className="pane-header">Gitlab Spantree</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

export default TreePane;
