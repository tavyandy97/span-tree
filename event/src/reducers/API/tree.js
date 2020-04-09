import { FETCH_TREE } from "../../types/API";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TREE:
      if (state.length === 0) {
        return action.payload.map((node) => {
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
        });
      } else {
        return [
          ...state,
          ...action.payload.map((node) => {
            return {
              name: node.name,
              path: node.path,
              isTree:
                node.type === "tree"
                  ? {
                      isOpen: false,
                    }
                  : false,
            };
          }),
        ];
      }
    default:
      return state;
  }
};
