import React, { useState, useEffect } from "react";
import SVG from "../SVG";

import TreeList from "../../containers/TreeList/TreeList";
import { paneWidth } from "../../utils/styling";
import { fetchURLDetails } from "../../utils/url";

import "./styles.css";
import Resizer from "../../containers/Resizer/Resizer";

function Pane({ toggleOpened }) {
  const [realoading, setRealoading] = useState(true);
  const [URLDetails, setURLDetails] = useState(fetchURLDetails());

  window.addEventListener("popstate", (event) => {
    setRealoading(true);
  });

  useEffect(() => {
    if (realoading) {
      setURLDetails(fetchURLDetails());
      setRealoading(false);
    }
  }, [realoading]);

  return (
    <div className="tree-pane" style={{ width: paneWidth() }}>
      <div className="pane-main">
        <div className="pane-header">
          <div className="spread">
            <div>
              <SVG
                icon="repo"
                height="12"
                style={{ verticalAlign: "middle" }}
              />{" "}
              {URLDetails.dirFormatted}
            </div>
            <div onClick={toggleOpened} className="close-button">
              <SVG icon="close" height="12" />
            </div>
          </div>
          <div>
            <SVG
              icon="branch"
              height="12"
              style={{ verticalAlign: "middle" }}
            />{" "}
            {URLDetails.branchName}
          </div>
        </div>
        <div className="tree-body">
          <TreeList />
        </div>
      </div>
      <Resizer />
    </div>
  );
}

export default Pane;
