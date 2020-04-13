import { createStore } from "redux";
import { treeReducer } from "./reducers/treeReducer";

export const store = createStore(treeReducer);
