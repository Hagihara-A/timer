import { combineReducers } from "redux";
import { timersReducer } from "./timersReducer";
import { treeReducer } from "./treeReducer";

export const rootReducer = combineReducers({
  tree: treeReducer,
  timers: timersReducer
});
