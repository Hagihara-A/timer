import { combineReducers } from "redux";
import { treeReducer } from "./treeReducer";
import { optionsReducer } from "./optionsReducer";
export const reducer = combineReducers({
  tree: treeReducer,
  options: optionsReducer,
});
