import React from "react";

import { paneWidth } from "../../utils/styling";

import "./styles.css";

function TreePane({ opened, pinned, toggleOpened, pathLiterals }) {
  return (
    <div className="tree-pane" style={{ width: paneWidth() }}>
      <div className="pane-header">
        <div className="spread">
          <div>
            {pathLiterals[0]} / {pathLiterals[1]}
          </div>
          <div onClick={toggleOpened}>X</div>
        </div>
        <div>master</div>
      </div>
      <div className="tree-body"></div>
    </div>
  );
}

export default TreePane;
