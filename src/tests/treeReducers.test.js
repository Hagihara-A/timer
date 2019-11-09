import { copyItem } from "../actions";
import treeReducer, { getAllChildrenIds } from "../reducers/treeReducer";
import { getNewItemIds } from "../util";
import { sampleState } from "./testData";

test('getAllChildrenIds of id:root', () => {
    const tree = sampleState.get('tree')
    const parentId = tree.get('rootId')
    const children = getAllChildrenIds(tree, parentId)
    expect(children.size).toBe(tree.get('items').size)
})
test('getAllChildrenIds of id:3-2', () => {
    const tree = sampleState.get('tree')
    const parentId = '3-2'
    const children = getAllChildrenIds(tree, parentId)
    expect(children.sort().toJS()).toEqual(['3-2', '3-2-0', '3-2-1'])
})
test('COPY_ITEM', () => {
    const copyId = '3-2'
    const prevTree = sampleState.get('tree')
    const allChildrenIds = getAllChildrenIds(prevTree, copyId)
    const newIds = getNewItemIds(prevTree, allChildrenIds.size)
    const newTree = treeReducer(prevTree, copyItem(copyId))
    expect(newTree.getIn(['items', newIds.get(0), 'children']).size).toBe(prevTree.getIn(['items', allChildrenIds.get(0), 'children']).size)
    expect(newTree.getIn(['items', newIds.get(1), 'children']).size).toBe(prevTree.getIn(['items', allChildrenIds.get(1), 'children']).size)
    expect(newTree.getIn(['items', newIds.get(2), 'children']).size).toBe(prevTree.getIn(['items', allChildrenIds.get(2), 'children']).size)
})