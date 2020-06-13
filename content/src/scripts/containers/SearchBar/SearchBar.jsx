import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import * as fzy from "fzy.js";

import Backdrop from "../../components/Backdrop";
import { getSearchTerms } from "../../../../../event/src/actions/API";
import { fetchURLDetails } from "../../utils/url";

import "./styles.css";
import fileIcons from "../../utils/file-icons";

function getSearchResults(searchTerms, URLDetails, query) {
  if (
    searchTerms &&
    searchTerms[URLDetails.dirFormatted] &&
    searchTerms[URLDetails.dirFormatted][URLDetails.branchName]
  ) {
    const reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
      reHasRegExpChar = RegExp(reRegExpChar.source);
    const escapeRegExp = (string) =>
      reHasRegExpChar.test(string)
        ? string.replace(reRegExpChar, "\\$&")
        : string;
    const regex = new RegExp(
      query
        .split("")
        .filter((x) => x !== " ")
        .map(escapeRegExp)
        .join(".*"),
      "i"
    );
    let resultArray = searchTerms[URLDetails.dirFormatted][
      URLDetails.branchName
    ].filter((ele) => ele.match(regex));
    query = query.replace(/ /g, "");
    resultArray.sort((a, b) => fzy.score(query, b) - fzy.score(query, a));
    resultArray.splice(100);
    return resultArray;
  }
  return [];
}

function SearchBarResult({ index, term, activeResult, setActiveResult }) {
  let fileLocation = term.split("/");
  let fileName = fileLocation.splice(-1);
  let resultClass =
    index === activeResult
      ? "spantree-search-result spantree-result-active"
      : "spantree-search-result";
  console.log(fileName, resultClass, index, activeResult);
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
      <div className="spantree-search-filelocation">{term}</div>
    </div>
  );
}

function SearchBar({
  reloading,
  setReloading,
  searchTerms,
  getSearchTerms,
  options,
}) {
  const [showSearchbar, setShowSearchbar] = useState(false);
  const [searchFor, setSearchFor] = useState("");
  const [activeResult, setActiveResult] = useState(0);

  useEffect(() => {
    const URLDetails = fetchURLDetails();
    getSearchTerms({
      repoName: URLDetails.dirFormatted,
      branchName: URLDetails.branchName,
      compatibilityMode:
        "compatibility-mode" in options && options["compatibility-mode"],
    });
  }, []);

  useEffect(() => {
    document.removeEventListener("keydown", handleKeyDown);
    document.addEventListener("keydown", handleKeyDown);
  }, [showSearchbar]);

  const isMac = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].reduce(
    (accumulator, currentValue) => {
      return (
        window.navigator.platform.indexOf(currentValue) !== -1 || accumulator
      );
    },
    false
  );

  const handleKeyDown = (event) => {
    const isActionKey = isMac ? event.metaKey : event.ctrlKey;
    if (isActionKey && (event.key === "p" || event.key === "P")) {
      event.preventDefault();
      setShowSearchbar(true);
    } else if (isActionKey && event.key === "Enter" && showSearchbar) {
      // Redirect to page
    } else if (event.key === "ArrowUp" && showSearchbar) {
      // Toggle up
    } else if (event.key === "ArrowDown" && showSearchbar) {
      // Toggle down
    } else if (event.key === "Escape" && showSearchbar) {
      setShowSearchbar(false);
    }
  };

  if (!showSearchbar) return null;

  return (
    <Fragment>
      <Backdrop
        showSearchbar={showSearchbar}
        setShowSearchbar={setShowSearchbar}
      />
      <div className="spantree-search">
        <div className="spantree-searchbar">
          <input
            type="text"
            value={searchFor}
            placeholder="🔍 Search In Repository Branch"
            onChange={(e) => setSearchFor(e.target.value)}
            autoFocus
          />
        </div>
        <div className="spantree-search-results">
          {getSearchResults(searchTerms, fetchURLDetails(), searchFor).map(
            (resultTerm, index) => {
              return (
                <SearchBarResult
                  key={index}
                  index={index}
                  term={resultTerm}
                  activeResult={activeResult}
                  setActiveResult={setActiveResult}
                />
              );
            }
          )}
          <div className="only-top-result">
            Showing only the top 100 results
          </div>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    searchTerms: state.searchTerms,
    options: state.options,
  };
};

const mapDispatchToProps = { getSearchTerms };

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
