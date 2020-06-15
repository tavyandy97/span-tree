export default () => {
  self.addEventListener("message", (e) => {
    if (!e) return;
    let searchTerms = e.data.searchTerms;
    let URLDetails = e.data.URLDetails;
    let query = e.data.query;

    const fzyIsLower = (s) => {
      return s.toLowerCase() === s;
    };

    const fzyIsUpper = (s) => {
      return s.toUpperCase() === s;
    };

    const fzyPreComputeBonus = (haystack) => {
      const SCORE_MATCH_SLASH = 0.9;
      const SCORE_MATCH_WORD = 0.8;
      const SCORE_MATCH_CAPITAL = 0.7;
      const SCORE_MATCH_DOT = 0.6;

      let m = haystack.length;
      let match_bonus = new Array(m);

      let last_ch = "/";
      for (let i = 0; i < m; i++) {
        let ch = haystack[i];

        if (last_ch === "/") {
          match_bonus[i] = SCORE_MATCH_SLASH;
        } else if (last_ch === "-" || last_ch === "_" || last_ch === " ") {
          match_bonus[i] = SCORE_MATCH_WORD;
        } else if (last_ch === ".") {
          match_bonus[i] = SCORE_MATCH_DOT;
        } else if (fzyIsLower(last_ch) && fzyIsUpper(ch)) {
          match_bonus[i] = SCORE_MATCH_CAPITAL;
        } else {
          match_bonus[i] = 0;
        }

        last_ch = ch;
      }

      return match_bonus;
    };

    const fzyCompute = (needle, haystack, D, M) => {
      const SCORE_MIN = -Infinity;
      const SCORE_GAP_LEADING = -0.005;
      const SCORE_GAP_TRAILING = -0.005;
      const SCORE_GAP_INNER = -0.01;
      const SCORE_MATCH_CONSECUTIVE = 1.0;

      let n = needle.length;
      let m = haystack.length;

      let lower_needle = needle.toLowerCase();
      let lower_haystack = haystack.toLowerCase();

      let match_bonus = fzyPreComputeBonus(haystack);

      for (let i = 0; i < n; i++) {
        D[i] = new Array(m);
        M[i] = new Array(m);

        let prev_score = SCORE_MIN;
        let gap_score = i === n - 1 ? SCORE_GAP_TRAILING : SCORE_GAP_INNER;

        for (let j = 0; j < m; j++) {
          if (lower_needle[i] === lower_haystack[j]) {
            let score = SCORE_MIN;
            if (!i) {
              score = j * SCORE_GAP_LEADING + match_bonus[j];
            } else if (j) {
              /* i > 0 && j > 0*/
              score = Math.max(
                M[i - 1][j - 1] + match_bonus[j],
                D[i - 1][j - 1] + SCORE_MATCH_CONSECUTIVE
              );
            }
            D[i][j] = score;
            M[i][j] = prev_score = Math.max(score, prev_score + gap_score);
          } else {
            D[i][j] = SCORE_MIN;
            M[i][j] = prev_score = prev_score + gap_score;
          }
        }
      }
    };

    const fzyScore = (needle, haystack) => {
      const SCORE_MIN = -Infinity;
      const SCORE_MAX = Infinity;

      let n = needle.length;
      let m = haystack.length;

      if (!n || !m) return SCORE_MIN;

      if (n === m) {
        return SCORE_MAX;
      }

      if (m > 1024) {
        return SCORE_MIN;
      }

      let D = new Array(n);
      let M = new Array(n);

      fzyCompute(needle, haystack, D, M);

      return M[n - 1][m - 1];
    };

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
          query.split("").map(escapeRegExp).join(".*"),
          "i"
        );
        let resultArray = searchTerms[URLDetails.dirFormatted][
          URLDetails.branchName
        ].filter((ele) => ele.match(regex));
        resultArray.sort((a, b) => fzyScore(query, b) - fzyScore(query, a));
        resultArray.splice(25);
        return resultArray;
      }
      return [];
    };

    postMessage(getSearchResults(searchTerms, URLDetails, query));
  });
};
