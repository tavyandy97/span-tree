import React, { useState, useEffect } from "react";
import fzy from "fzy.js";

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
    }
  };

  if (!showSearchbar) return null;

  return <div>TAVEESH ANAND</div>;
}

export default SearchBar;
