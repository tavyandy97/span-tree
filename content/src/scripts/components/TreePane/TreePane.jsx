import React from "react";
import SVG from "../SVG";

import { paneWidth } from "../../utils/styling";

import "./styles.css";

function TreePane({ opened, pinned, toggleOpened, pathLiterals }) {
  return (
    <div className="tree-pane" style={{ width: paneWidth() }}>
      <div className="pane-header">
        <div className="spread">
          <div>
            <SVG icon="repo" height="12" style={{ verticalAlign: "middle" }} />{" "}
            {pathLiterals[0]} / {pathLiterals[1]}
          </div>
          <div onClick={toggleOpened} className="close-button">
            {/* <Octicon icon={Octicons.x} scale={0.8} /> */}
            <SVG icon="close" height="12" />
          </div>
        </div>
        <div>
          <SVG icon="branch" height="12" style={{ verticalAlign: "middle" }} />{" "}
          master
        </div>
      </div>
      <div className="tree-body"></div>
    </div>
  );
}

export default TreePane;
