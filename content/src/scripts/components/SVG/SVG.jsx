import React from "react";
import Branch from "./assets/Branch";
import Repo from "./assets/Repo";
import Close from "./assets/Close";

function SVG({ icon, height }) {
  switch (icon) {
    case "branch":
      return <Branch height={height} />;
    case "repo":
      return <Repo height={height} />;
    case "close":
      return <Close height={height} />;
    default:
      return "faulty svg";
  }
}

export default SVG;
