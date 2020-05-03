import React, { useState, useEffect } from "react";
import SVG from "../SVG";

import TreeList from "../../containers/TreeList/TreeList";
import Resizer from "../../containers/Resizer/Resizer";
import { fetchURLDetails } from "../../utils/url";

import "./styles.css";

function Pane({ toggleOpened, width, firstPageLoad, setFirstPageLoad }) {
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
    <div className="tree-pane" style={{ width: width + "px" }}>
      <div className="pane-main">
        <div className="pane-header">
          <div className="spread">
            <div className="pane-details">
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
          <div className="pane-details" style={{ width: width - 12 + "px" }}>
            <SVG
              icon="branch"
              height="12"
              style={{ verticalAlign: "middle" }}
            />{" "}
            {URLDetails.branchName}
          </div>
        </div>
        <div className="tree-body">
          <TreeList
            firstPageLoad={firstPageLoad}
            setFirstPageLoad={setFirstPageLoad}
          />
        </div>
      </div>
      <Resizer />
    </div>
  );
}

export default Pane;
