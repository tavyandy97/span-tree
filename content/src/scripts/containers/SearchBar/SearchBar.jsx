import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import fzy from "fzy.js";

import { getSearchTerms } from "../../../../../event/src/actions/API";
import { fetchURLDetails } from "../../utils/url";

import "./styles.css";

import Backdrop from "../../components/Backdrop";

function SearchBar({
  reloading,
  setReloading,
  searchTerms,
  getSearchTerms,
  options,
}) {
  const [showSearchbar, setShowSearchbar] = useState(false);

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
    return () => {
      // document.removeEventListener("keydown", handleKeyDown);
    };
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
      <div className="spantree-search">SEARCHBAR COMES HERE</div>
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
