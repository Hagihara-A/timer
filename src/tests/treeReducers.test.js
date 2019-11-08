import { sampleState } from "./testData"
import treeReducer, { countAllChildren } from "../reducers/treeReducer";

test('countAllChildren', () => {
    const tree = sampleState.get('tree')
    const parentId = tree.get('rootId')
    const count = countAllChildren(tree, parentId)
    expect(count).toBe(tree.get('items').size -1)
})