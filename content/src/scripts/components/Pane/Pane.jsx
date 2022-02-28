import React, { useState, useEffect, useContext } from "react";
import { TabIdentifierClient } from "chrome-tab-identifier";

import SVG from "../SVG";
import TreeList from "../../containers/TreeList/TreeList";
import Filter from "../../containers/Filter/Filter";
import Resizer from "../../containers/Resizer";
import { OptionsContext } from "../../contexts/OptionsContext";
import { fetchURLDetails } from "../../utils/url";
import { switchTheme } from "../../utils/themeList";
import getHeaderBackgroundColor from "../../utils/backgroundColor";
import useEventListener from "../../utils/useEventListener";

import "./styles.css";

const tabIdClient = new TabIdentifierClient();

function Pane({
  toggleOpened,
  width,
  firstPageLoad,
  setFirstPageLoad,
  setShowSearchbarTrue,
  reloading,
  setReloading,
}) {
  const { options } = useContext(OptionsContext);
  const [tabId, setTabId] = useState();
  const [headerStyle, setHeaderStyle] = useState(
    getHeaderBackgroundColor(options),
  );

  useEffect(() => {
    tabIdClient.getTabId().then((tab) => {
      setTabId(tab);
    });
  }, []);

  useEffect(() => {
    if (reloading) {
      setReloading(false);
    }
  }, [reloading]);

  useEventListener("popstate", () => {
    setReloading(true);
  });

  useEffect(() => {
    setHeaderStyle(getHeaderBackgroundColor(options));
  }, [options]);

  const URLDetails = fetchURLDetails();

  return (
    <div className="spantree-tree-pane" style={{ width: width + "px" }}>
      <div className="spantree-pane-main">
        <div className="spantree-pane-header" style={headerStyle}>
          <div className="spantree-spread">
            <div className="spantree-pane-details">
              <SVG
                icon="repo"
                height="12"
                style={{ verticalAlign: "middle" }}
              />{" "}
              {URLDetails.dirFormatted}
            </div>
            <div className="spantree-pane-icons">
              <span
                onClick={() => {
                  switchTheme();
                  setTimeout(() => {
                    setHeaderStyle(getHeaderBackgroundColor(options));
                  }, 100);
                }}
                className="spantree-close-button"
              >
                <SVG icon="half" height="9" />
              </span>
              <span onClick={toggleOpened} className="spantree-close-button">
                <SVG icon="close" height="12" />
              </span>
            </div>
          </div>
          <div className="spantree-spread">
            <div
              className="spantree-pane-details"
              style={{ width: width - 12 + "px" }}
            >
              <SVG
                icon="branch"
                height="12"
                style={{ verticalAlign: "middle" }}
              />{" "}
              {URLDetails.branchName}
            </div>
            <span
              onClick={setShowSearchbarTrue}
              className="spantree-close-button"
            >
              <SVG icon="search" height="9" />
            </span>
          </div>
        </div>
        <div className="spantree-tree-body">
          {tabId ? (
            <TreeList
              firstPageLoad={firstPageLoad}
              setFirstPageLoad={setFirstPageLoad}
              tabId={tabId}
            />
          ) : null}
          <Filter />
        </div>
      </div >
      <Resizer />
    </div >
  );
}

export default Pane;
