import React, { useState, useEffect, useRef, Fragment } from "react";
import { connect } from "react-redux";

import Backdrop from "../../components/Backdrop";
import SearchBarResult from "./SearchBarResult";
import { getSearchTerms } from "../../../../../event/src/actions/API";
import { fetchURLDetails } from "../../utils/url";

import "./styles.css";

function SearchBar({ worker, searchTerms, getSearchTerms, options }) {
  const [showSearchbar, _setShowSearchbar] = useState(false);
  const showSearchbarRef = useRef(showSearchbar);
  const [searchResults, setSearchResults] = useState([]);
  const [searchFor, setSearchFor] = useState("");
  const [activeResult, setActiveResult] = useState(0);
  const [resultsLoading, setResultsLoading] = useState(0);
  const [debounceTimerId, setDebounceTimerId] = useState(null);
  const setShowSearchbar = (data) => {
    showSearchbarRef.current = data;
    _setShowSearchbar(data);
  };

  useEffect(() => {
    const URLDetails = fetchURLDetails();
    getSearchTerms({
      repoName: URLDetails.dirFormatted,
      branchName: URLDetails.branchName,
      compatibilityMode:
        "compatibility-mode" in options && options["compatibility-mode"],
    });
    document.addEventListener("keydown", handleKeyDown);
    worker.addEventListener("message", (event) => {
      const searchResultsFromWorker = event.data;
      setSearchResults(searchResultsFromWorker);
      setResultsLoading((resultsLoading) => resultsLoading - 1);
    });
  }, []);

  useEffect(() => {
    console.log("searchTerms changed", searchTerms);
    workerCall();
  }, [searchTerms]);

  useEffect(() => {
    debouncedWorkerCall();
  }, [searchFor.replace(/ /g, "")]);

  const isMac = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].reduce(
    (accumulator, currentValue) => {
      return (
        window.navigator.platform.indexOf(currentValue) !== -1 || accumulator
      );
    },
    false
  );

  const workerCall = () => {
    setResultsLoading((resultsLoading) => resultsLoading + 1);
    worker.postMessage({
      searchTerms: searchTerms,
      URLDetails: fetchURLDetails(),
      query: searchFor.replace(/ /g, ""),
    });
  };

  const debouncedWorkerCall = () => {
    setResultsLoading((resultsLoading) => resultsLoading + 1);
    if (debounceTimerId) {
      clearTimeout(debounceTimerId);
      setResultsLoading((resultsLoading) => resultsLoading - 1);
    }
    setDebounceTimerId(
      setTimeout(() => {
        workerCall();
        setDebounceTimerId(null);
        setResultsLoading((resultsLoading) => resultsLoading - 1);
      }, 500)
    );
  };

  const handleKeyDown = (event) => {
    const isActionKey = isMac ? event.metaKey : event.ctrlKey;
    if (isActionKey && (event.key === "p" || event.key === "P")) {
      event.preventDefault();
      setShowSearchbar(true);
    } else if (event.key === "Enter" && showSearchbarRef.current) {
      console.log(
        document.querySelector(
          "div.spantree-result-active > div.spantree-search-filelocation"
        ).innerText
      );
    } else if (event.key === "ArrowUp" && showSearchbarRef.current) {
      event.preventDefault();
      setActiveResult((activeResult) => activeResult - 1);
    } else if (event.key === "ArrowDown" && showSearchbarRef.current) {
      event.preventDefault();
      setActiveResult((activeResult) => activeResult + 1);
    } else if (event.key === "Escape" && showSearchbarRef.current) {
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
        <div
          className={
            resultsLoading <= 0
              ? "spantree-search-results"
              : "spantree-search-results  results-loading"
          }
        >
          {searchResults.map((resultTerm, index) => {
            return (
              <SearchBarResult
                key={index}
                index={index}
                query={searchFor.replace(/ /g, "")}
                term={resultTerm}
                activeResult={activeResult}
                setActiveResult={setActiveResult}
                resultsLoading={resultsLoading}
              />
            );
          })}
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
