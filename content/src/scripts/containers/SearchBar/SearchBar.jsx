import React, { useState, useEffect, useCallback, Fragment } from "react";
import { connect } from "react-redux";

import Backdrop from "../../components/Backdrop";
import SearchBarResult from "./SearchBarResult";
import { getSearchTerms } from "../../../../../event/src/actions/API";
import { fetchURLDetails } from "../../utils/url";
import useEventListener from "../../utils/useEventListener";

import "./styles.css";

function SearchBar({
  worker,
  showSearchbar,
  setShowSearchbar,
  searchTerms,
  getSearchTerms,
  options,
}) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchFor, setSearchFor] = useState("");
  const [activeResult, setActiveResult] = useState(0);
  const [resultsLoading, setResultsLoading] = useState(0);
  const [debounceTimerId, setDebounceTimerId] = useState(null);

  const defaultOptions = { "auto-theme": false, "compatibility-mode": true };
  Object.keys(defaultOptions).forEach((key) => {
    if (key in options) {
      defaultOptions[key] = options.data[key];
    }
  });

  useEffect(() => {
    const URLDetails = fetchURLDetails();
    getSearchTerms({
      repoName: URLDetails.dirFormatted,
      branchName: URLDetails.branchName,
      compatibilityMode:
        "compatibility-mode" in defaultOptions &&
        defaultOptions["compatibility-mode"],
    });
    worker.addEventListener("message", (event) => {
      const searchResultsFromWorker = event.data;
      setSearchResults(searchResultsFromWorker);
      setResultsLoading((resultsLoading) => resultsLoading - 1);
    });
  }, []);

  const handleRedirect = (id, inNewTab) => {
    const URLDetails = fetchURLDetails();
    let finalURL = null;
    if (
      "compatibility-mode" in defaultOptions &&
      defaultOptions["compatibility-mode"]
    ) {
      finalURL = `${window.location.origin}/${URLDetails.dirFormatted}/blob/${
        URLDetails.branchName
      }/${encodeURI(searchResults[id])}`;
    } else {
      finalURL = `${window.location.origin}/${URLDetails.dirFormatted}/-/blob/${
        URLDetails.branchName
      }/${encodeURI(searchResults[id])}`;
    }
    if (inNewTab) {
      window.open(finalURL, "_blank");
      // for overwriting default behavior on Firefox
      window.focus();
    } else {
      window.location.href = finalURL;
    }
  };

  const handleKeyDown = useCallback(
    (event) => {
      const isActionKey = isMac ? event.metaKey : event.ctrlKey;
      if (isActionKey && (event.key === "p" || event.key === "P")) {
        event.preventDefault();
        setShowSearchbar(true);
      } else if (isActionKey && event.key === "Enter" && showSearchbar) {
        handleRedirect(activeResult, true);
      } else if (event.key === "Enter" && showSearchbar) {
        handleRedirect(activeResult, false);
      } else if (event.key === "ArrowUp" && showSearchbar) {
        event.preventDefault();
        setActiveResult(
          (activeResult) =>
            (searchResults.length + activeResult - 1) % searchResults.length
        );
      } else if (event.key === "ArrowDown" && showSearchbar) {
        event.preventDefault();
        setActiveResult(
          (activeResult) => (activeResult + 1) % searchResults.length
        );
      } else if (event.key === "Escape" && showSearchbar) {
        setShowSearchbar(false);
      }
    },
    [showSearchbar, activeResult, searchResults]
  );

  useEventListener("keydown", handleKeyDown);

  useEffect(() => {
    setResultsLoading((resultsLoading) => resultsLoading + 1);
    workerCall();
  }, [searchTerms]);

  useEffect(() => {
    setActiveResult(0);
    debouncedWorkerCall();
  }, [searchFor.replace(/ /g, "")]);

  useEffect(() => {
    const activeItem = document.querySelector(".spantree-result-active");
    if (activeItem) {
      activeItem.scrollIntoView({
        behavior: "auto", // Defines the transition animation.
        block: "nearest", // Defines vertical alignment.
        inline: "start", // Defines horizontal alignment.
      });
    }
  }, [activeResult]);

  const isMac = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].reduce(
    (accumulator, currentValue) => {
      return (
        window.navigator.platform.indexOf(currentValue) !== -1 || accumulator
      );
    },
    false
  );

  const workerCall = () => {
    worker.postMessage({
      searchTerms: searchTerms,
      URLDetails: fetchURLDetails(),
      query: searchFor.replace(/ /g, ""),
    });
  };

  const debouncedWorkerCall = () => {
    if (debounceTimerId) {
      clearTimeout(debounceTimerId);
    } else {
      setResultsLoading((resultsLoading) => resultsLoading + 1);
    }

    setDebounceTimerId(
      setTimeout(() => {
        workerCall();
        setDebounceTimerId(null);
      }, 500)
    );
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
            placeholder="🔍  Search in Repository Branch"
            onChange={(e) => setSearchFor(e.target.value)}
            autoFocus
          />
        </div>
        <div
          className={
            resultsLoading <= 0
              ? "spantree-search-results"
              : "spantree-search-results  spantree-results-loading"
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
                handleRedirect={handleRedirect}
              />
            );
          })}
        </div>
        <div className="spantree-search-help">
          <span className="spantree-search-help-item">
            <code>
              {isMac ? (
                <span className="spantree-search-help-item-icon">⌘</span>
              ) : (
                "Ctrl"
              )}{" "}
              + P
            </code>{" "}
            to Search
          </span>
          <span className="spantree-search-help-item">
            <code>{isMac ? "return" : "Enter"}</code> to Open
          </span>
          <span className="spantree-search-help-item">
            <code>
              {isMac ? (
                <span className="spantree-search-help-item-icon">⌘</span>
              ) : (
                "Ctrl"
              )}{" "}
              + {isMac ? "return" : "Enter"}
            </code>{" "}
            to Open in New Tab
          </span>
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
