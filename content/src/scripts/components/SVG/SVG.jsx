import React from "react";
import Branch from "./assets/Branch";
import Repo from "./assets/Repo";
import Close from "./assets/Close";

function SVG({ icon, height, style }) {
  switch (icon) {
    case "branch":
      return <Branch height={height} style={style} />;
    case "repo":
      return <Repo height={height} style={style} />;
    case "close":
      return <Close height={height} style={style} />;
    default:
      return "faulty svg";
  }
}

export default SVG;
