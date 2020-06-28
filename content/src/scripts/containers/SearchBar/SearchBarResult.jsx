import React, { Fragment } from "react";
import * as fzy from "fzy.js";

import fileIcons from "../../utils/file-icons";

function getAlternatingArray(resultsLoading, query, term) {
  const arr = fzy.positions(query, term);
  if (resultsLoading > 0 || query.length === 0) {
    return [];
  }
  let l = 1;
  const res = [arr[0]];
  for (let i = 1; i <= arr.length - 1; i++) {
    let diff = arr[i] - arr[i - 1];
    if (diff === 1) {
      l++;
    } else {
      res.push(l);
      res.push(diff - 1);
      l = 1;
    }
  }
  res.push(l);

  return res;
}

function renderHighlightedFileLocation(resultsLoading, query, term) {
  const arr = getAlternatingArray(resultsLoading, query, term);
  let isFzy = false;
  return (
    <Fragment>
      {arr.map((len, i) => {
        let charClass = "";
        if (isFzy) {
          charClass = "in-fzy";
        }
        isFzy = !isFzy;
        const currString = term.substr(0, len);
        term = term.substr(len);
        return currString.length === 0 ? null : (
          <span key={i} className={charClass}>
            {currString}
          </span>
        );
      })}
      {term.length === 0 ? null : <span className="search-term">{term}</span>}
    </Fragment>
  );
}

function SearchBarResult({
  index,
  term,
  query,
  activeResult,
  setActiveResult,
  resultsLoading,
  handleRedirect,
}) {
  const fileLocation = term.split("/");
  const fileName = fileLocation.splice(-1);
  const resultClass =
    index === activeResult
      ? "spantree-search-result spantree-result-active"
      : "spantree-search-result";

  return (
    <div
      className={resultClass}
      onClick={() => {
        handleRedirect(index);
      }}
      onMouseEnter={() => {
        setActiveResult(index);
      }}
    >
      <div className="spantree-search-file">
        <div className="file-icon">
          <i className={fileIcons.getClassWithColor(fileName, false)}></i>
        </div>
        <div className="spantree-search-filename">{fileName}</div>
      </div>
      <div className="spantree-search-filelocation">
        {renderHighlightedFileLocation(resultsLoading, query, term)}
      </div>
    </div>
  );
}

export default SearchBarResult;
