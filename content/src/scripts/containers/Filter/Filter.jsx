import React, { useState, useEffect } from "react";
import {
  isMergeRequestShown
} from "../../../../../event/src/actions/API";

import "./styles.css";


function Filter({

}) {

  // const [checkedTests, setCheckedTest] = useState();
  // useEffect(() => {
  //   handleChange = () => {
  //     setCheckedTest(!checkedTests, () => {
  // window.location.reload();
  //     });
  //   };
  // }, []);

  return (
    <div className="spantree-filter-body">
      {isMergeRequestShown() ? (
        <div className="spantree-filter-header">
          <input type="checkbox" id="filterTests" name="tests" />
          {/* <input type="checkbox" id="filterTests" name="tests" onClick={handleChange} defaultChecked={checkedTests} /> */}
          <label style={{ paddingRight: "5px" }} >filter src/test</label>

          <input type="checkbox" id="filterRemoved" name="removed" />
          <label style={{ paddingRight: "5px" }} >filter removed</label>

          <input type="checkbox" id="filterRenamed" name="renamed" />
          <label style={{ paddingRight: "5px" }} >filter renamed</label>

          <br />

          <input type="checkbox" id="filteredNewFiles" name="new files" />
          <label style={{ paddingRight: "5px" }} >filter new files</label>

          <input type="checkbox" id="filteredImports" name="imports" />
          <label style={{ paddingRight: "5px" }} >filter imports</label >
        </div >
      ) : null}
    </div>
  );
}

export default Filter;
