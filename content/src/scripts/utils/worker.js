// import * as fzy from "fzy.js";

export default () => {
  self.addEventListener("message", (e) => {
    if (!e) return;
    let searchTerms = e.data.searchTerms;
    let URLDetails = e.data.URLDetails;
    let query = e.data.query;

    const getSearchResults = (searchTerms, URLDetails, query) => {
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
        let resultArray = searchTerms[URLDetails.dirFormatted][
          URLDetails.branchName
        ].filter((ele) => ele.match(regex));
        query = query.replace(/ /g, "");
        let i = 0;
        while (i < 100000) {
          let j = 0;
          while (j < 10000) {
            j++;
          }
          i++;
        }
        // resultArray.sort((a, b) => fzy.score(query, b) - fzy.score(query, a));
        resultArray.splice(25);
        return resultArray;
      }
      return [];
    };

    postMessage(getSearchResults(searchTerms, URLDetails, query));
  });
};
