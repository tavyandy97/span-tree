import React from "react";

import Branch from "./assets/Branch";
import Repo from "./assets/Repo";
import Close from "./assets/Close";
import Half from "./assets/Half";
import Search from "./assets/Search";

function SVG({ icon, height, style }) {
  switch (icon) {
    case "branch":
      return <Branch height={height} style={style} />;
    case "repo":
      return <Repo height={height} style={style} />;
    case "close":
      return <Close height={height} style={style} />;
    case "half":
      return <Half height={height} style={style} />;
    case "search":
      return <Search height={height} style={style} />;
    default:
      return "faulty svg";
  }
}

export default SVG;
