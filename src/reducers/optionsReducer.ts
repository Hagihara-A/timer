import produce from "immer";
import { initState } from "../initState";
import { Action, Options } from "../types";
import { actionTypes as AT } from "../actions";
const { options } = initState;
export const optionsReducer = produce((options: Options, action: Action) => {
  switch (action.type) {
    case AT.TOGGLE_IS_DRAG_ENABLED: {
      options.isDragEnabled = !options.isDragEnabled;
      break;
    }
    default: {
      break;
    }
  }
}, options);
