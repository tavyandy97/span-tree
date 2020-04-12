import { FETCH_TREE } from "../../types/API";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TREE:
      return {
        ...state,
        [action.reducerDetails.repoName]: {
          ...state[action.reducerDetails.repoName],
          [action.reducerDetails.branchName]: action.payload.map((node) => {
            return {
              name: node.name,
              path: node.path
                .split("/")
                .filter((pathSub) => pathSub.length !== 0),
              isTree:
                node.type === "tree"
                  ? {
                      isOpen: false,
                    }
                  : false,
            };
          }),
        },
      };
    // let tempState = JSON.parse(JSON.stringify(state));
    // tempState[action.reducerDetails.repoName][
    //   action.reducerDetails.branchName
    // ] = action.payload.map((node) => {
    //   return {
    //     name: node.name,
    //     path: node.path.split("/").filter((pathSub) => pathSub.length !== 0),
    //     isTree:
    //       node.type === "tree"
    //         ? {
    //             isOpen: false,
    //           }
    //         : false,
    //   };
    // });
    // return tempState;
    // return Object.assign({}, state, {
    //   [action.reducerDetails.repoName]: {
    //     [action.reducerDetails.branchName]: action.payload.map((node) => {
    //       return {
    //         name: node.name,
    //         path: node.path
    //           .split("/")
    //           .filter((pathSub) => pathSub.length !== 0),
    //         isTree:
    //           node.type === "tree"
    //             ? {
    //                 isOpen: false,
    //               }
    //             : false,
    //       };
    //     }),
    //   },
    // });
    default:
      return state;
  }
};
