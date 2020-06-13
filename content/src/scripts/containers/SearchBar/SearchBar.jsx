import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import * as fzy from "fzy.js";

import Backdrop from "../../components/Backdrop";
import { getSearchTerms } from "../../../../../event/src/actions/API";
import { fetchURLDetails } from "../../utils/url";

import "./styles.css";

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
    console.log("before sort");
    let resultArray = searchTerms[URLDetails.dirFormatted][
      URLDetails.branchName
    ].filter((ele) => ele.match(regex));
    // resultArray.sort((a, b) => fzy.score(query, b) - fzy.score(query, a));
    resultArray.splice(100);
    console.log("after sort");
    return resultArray;
  }
  return [];
}

function SearchBarResult({ term }) {
  let fileLocation = term.split("/");
  let fileName = fileLocation.splice(-1);
  fileLocation = fileLocation.join("/").concat("/");
  return (
    <div className="spantree-search-result">
      <div className="spantree-search-filename">{fileName}</div>
      <div className="spantree-search-filelocation">{fileLocation}</div>
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
        <input
          type="text"
          className="spantree-searchbar"
          value={searchFor}
          placeholder="🔍 Search In Repository Branch"
          onChange={(e) => setSearchFor(e.target.value)}
          autoFocus
        />
        <div className="spantree-search-results">
          {getSearchResults(searchTerms, fetchURLDetails(), searchFor).map(
            (resultTerm, index) => {
              return <SearchBarResult key={index} term={resultTerm} />;
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
