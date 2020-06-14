import React from "react";
import * as fzy from "fzy.js";

import fileIcons from "../../utils/file-icons";

function SearchBarResult({
  index,
  term,
  query,
  activeResult,
  setActiveResult,
}) {
  let fileLocation = term.split("/");
  let fileName = fileLocation.splice(-1);
  let resultClass =
    index === activeResult
      ? "spantree-search-result spantree-result-active"
      : "spantree-search-result";
  query = query.replace(/ /g, "");
  const getAlternatingArray = (arr) => {
    let l = 1;
    let i = 1;
    let res = [arr[0]];
    while (i <= arr.length - 1) {
      let diff = arr[i] - arr[i - 1];
      if (diff === 1) {
        l++;
      } else {
        res.push(l);
        res.push(diff - 1);
        l = 1;
      }
      i++;
    }
    res.push(l);
    return res;
  };
  let charLocations = [];
  let alternatingArray = [];
  if (query.length !== 0) {
    charLocations = fzy.positions(query, term);
    alternatingArray = getAlternatingArray(charLocations);
  }
  let isFzy = false;
  return (
    <div
      className={resultClass}
      onClick={() => {
        console.log(fileName);
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
        {alternatingArray.map((len, i) => {
          let charClass = "";
          if (isFzy) {
            charClass = "in-fzy";
          }
          isFzy = !isFzy;
          const currString = term.substr(0, len);
          term = term.substr(len);
          return (
            <span key={i} className={charClass}>
              {currString}
            </span>
          );
        })}
        <span className="search-term">{term}</span>
      </div>
    </div>
  );
}

export default SearchBarResult;
