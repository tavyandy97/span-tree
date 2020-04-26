import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import Loader from "../../components/Loader";
import TreeItem from "../../components/TreeItem";
import { fetchURLDetails } from "../../utils/url";
import {
  getInitialTree,
  openDir,
  closeDir,
} from "../../../../../event/src/actions/API";

import "./styles.css";

const renderTreeItems = (tree, close, open, rendering, setRendering) => {
  const URLDetails = fetchURLDetails();

  return (
    <div className="tree-list">
      {rendering ? (
        <div className="loader-wrapper">
          <Loader size="64px" />
        </div>
      ) : null}
      <ul className={rendering ? "parent-list hidden" : "parent-list"}>
        {Object.keys(tree).map((key) => (
          <TreeItem
            key={key}
            name={tree[key].name}
            isTree={tree[key].isTree}
            path={tree[key].path}
            children={tree[key].children}
            open={open}
            close={close}
            remainingURL={URLDetails.baseRemovedURL}
            rendering={rendering}
            setRendering={setRendering}
          />
        ))}
      </ul>
    </div>
  );
};

function TreeList({ tree, getInitialTree, closeDir }) {
  const [loading, setLoading] = useState(true);
  const [rendering, setRendering] = useState(true);
  const initialMount = useRef(true);

  useEffect(() => {
    const URLDetails = fetchURLDetails();
    getInitialTree(
      URLDetails.dirURLParam,
      {
        ref: URLDetails.branchNameURL,
      },
      {
        repoName: URLDetails.dirFormatted,
        branchName: URLDetails.branchName,
      }
    );
  }, []);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      setLoading(false);
    }
  }, [tree]);

  if (loading)
    return (
      <div className="loader-wrapper">
        <Loader size="64px" />
      </div>
    );

  const URLDetails = fetchURLDetails();

  const closeDirectory = (path) => {
    closeDir(path, {
      repoName: URLDetails.dirFormatted,
      branchName: URLDetails.branchName,
    });
  };

  const openDirectory = (path) => {
    openDir(
      URLDetails.dirURLParam,
      path,
      {
        ref: URLDetails.branchNameURL,
        path: path.join("%2F"),
      },
      {
        repoName: URLDetails.dirFormatted,
        branchName: URLDetails.branchName,
        path: path,
      }
    );
  };

  return renderTreeItems(
    tree[URLDetails.dirFormatted][URLDetails.branchName],
    closeDirectory,
    openDirectory,
    rendering,
    setRendering
  );
}

const mapStateToProps = (state) => {
  return {
    tree: state.tree,
  };
};

const mapDispatchToProps = { getInitialTree, closeDir };

export default connect(mapStateToProps, mapDispatchToProps)(TreeList);
