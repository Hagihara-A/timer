import treeReducer from "./treeReducer"
import timersReducer from "./timersReducer"
import { fromJS } from "immutable"
import { initState } from "../initState"

const rootReducer = (state=initState, action) => {
    const tree = treeReducer(state.get('tree'), action)
    const timers = timersReducer(state.get('tiemrs'), action)
    return fromJS({ tree, timers })
}
export default rootReducer