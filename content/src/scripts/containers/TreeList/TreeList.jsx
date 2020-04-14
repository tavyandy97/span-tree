import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import Loader from "../../components/Loader";
import TreeItem from "../../components/TreeItem";
import { fetchURLDetails } from "../../utils/url";
import { getInitialTree } from "../../../../../event/src/actions/API";
import { closeDir } from "../../../../../event/src/actions/UI";

import "./styles.css";

const renderTreeItems = (tree, close) => {
  return (
    <div className="tree-list">
      <ul className="parent-list">
        {Object.keys(tree).map((key) => (
          <TreeItem
            name={tree[key].name}
            isTree={tree[key].isTree}
            path={tree[key].path}
            open={null}
            close={close}
          />
        ))}
      </ul>
    </div>
  );
};

function TreeList({ tree, getInitialTree, closeDir }) {
  const [loading, setLoading] = useState(true);
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

  return renderTreeItems(
    tree[URLDetails.dirFormatted][URLDetails.branchName],
    closeDirectory
  );
}

const mapStateToProps = (state) => {
  return {
    tree: state.tree,
  };
};

const mapDispatchToProps = { getInitialTree, closeDir };

export default connect(mapStateToProps, mapDispatchToProps)(TreeList);
