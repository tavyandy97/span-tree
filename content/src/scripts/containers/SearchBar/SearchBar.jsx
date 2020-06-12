import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import fzy from "fzy.js";

import Backdrop from "../../components/Backdrop";

function SearchBar({ reloading, setReloading }) {
  const [showSearchbar, setShowSearchbar] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      // document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
      <div className="spantree-searchbar">SEARCHBAR COMES HERE</div>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
