import produce from "immer";

import { FETCH_TREE, OPEN_DIR, CLOSE_DIR, UPDATE_TREE } from "../../types/API";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TREE:
      return {
        ...state,
        [action.reducerDetails.tabId]: mapNodesFromResult(action),
      };
    case OPEN_DIR:
      let objectPath = [action.reducerDetails.tabId];
      for (let i = 0; i < action.payload.length; i++) {
        objectPath.push(action.payload[i]);
        if (i !== action.payload.length - 1) {
          objectPath.push("children");
        }
      }
      objectPath = [...objectPath, "isTree", "isOpen"];
      let propName = objectPath.pop();

      let nextState = produce(state, (draft) => {
        draft = objectPath.reduce((it, prop) => it[prop], draft);
        draft[propName] = true;
      });
      return nextState;
    case UPDATE_TREE:
      objectPath = [action.reducerDetails.tabId];
      for (let i = 0; i < action.reducerDetails.path.length; i++) {
        objectPath.push(action.reducerDetails.path[i]);
        if (i !== action.reducerDetails.path.length - 1) {
          objectPath.push("children");
        }
      }

      propName = objectPath.pop();

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

      nextState = produce(state, (draft) => {
        draft = objectPath.reduce((it, prop) => it[prop], draft);
        if (Object.keys(draft[propName]["children"]) <= 0) {
          draft[propName]["children"] = children;
        }
      });
      return nextState;
    case CLOSE_DIR:
      objectPath = [action.reducerDetails.tabId];
      for (let i = 0; i < action.payload.length; i++) {
        objectPath.push(action.payload[i]);
        if (i !== action.payload.length - 1) {
          objectPath.push("children");
        }
      }

      propName = objectPath.pop();
      nextState = produce(state, (draft) => {
        draft = objectPath.reduce((it, prop) => it[prop], draft);
        draft[propName]["isTree"]["isOpen"] = false;
        // draft[propName]["children"] = {};
      });
      return nextState;

    default:
      return state;
  }
};
function mapNodesFromResult(action) {
  if (action.dataUrl.toString().includes('/merge_requests/')) {
    return action.payload['changes']
      .map((node) => {
        return {
          name: node.old_path,
          path: node.old_path,
          isTree: false,
          children: false,
        };
      })
      .reduce((map, obj) => {
        map[obj.name] = obj;
        return map;
      }, {});
  } else {
    return action.payload
      .map((node) => {
        return {
          name: node.name,
          path: node.path
            .split("/")
            .filter((pathSub) => pathSub.length !== 0),
          isTree: node.type === "tree"
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
  }

};


