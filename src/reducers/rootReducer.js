import { fromJS } from "immutable"
import { initState } from "../initState"
import timersReducer from "./timersReducer"
import treeReducer from "./treeReducer"

const rootReducer = (state = initState, action) => {
    const tree = treeReducer(state.get('tree'), action)
    const timers = timersReducer(state.get('timers'), action)
    return fromJS({ tree, timers })
}
export default rootReducer