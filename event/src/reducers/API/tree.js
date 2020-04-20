import dotProp from "dot-prop-immutable";

import { FETCH_TREE, OPEN_DIR, CLOSE_DIR, UPDATE_TREE } from "../../types/API";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TREE:
      return {
        ...state,
        [action.reducerDetails.repoName]: {
          ...state[action.reducerDetails.repoName],
          [action.reducerDetails.branchName]: action.payload
            .map((node) => {
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
                children: node.type === "tree" ? {} : undefined,
              };
            })
            .reduce((map, obj) => {
              map[obj.name] = obj;
              return map;
            }, {}),
        },
      };
    case OPEN_DIR:
      let objectPath = `${action.reducerDetails.repoName}.${action.reducerDetails.branchName}.`;
      objectPath += action.payload.join(".children.");
      objectPath += ".isTree.isOpen";
      return dotProp.set(state, objectPath, true);
    case UPDATE_TREE:
      objectPath = `${action.reducerDetails.repoName}.${action.reducerDetails.branchName}.`;
      objectPath += action.reducerDetails.path.join(".children.");
      objectPath += ".children";
      const children = action.payload
        .map((node) => {
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
            children: node.type === "tree" ? {} : undefined,
          };
        })
        .reduce((map, obj) => {
          map[obj.name] = obj;
          return map;
        }, {});
      return dotProp.set(state, objectPath, children);
    case CLOSE_DIR:
      objectPath = `${action.reducerDetails.repoName}.${action.reducerDetails.branchName}.`;
      objectPath += action.payload.join(".children.");
      const intermediateState = dotProp.set(
        state,
        objectPath + ".children",
        {}
      );
      objectPath += ".isTree.isOpen";
      return dotProp.set(intermediateState, objectPath, false);

    default:
      return state;
  }
};
