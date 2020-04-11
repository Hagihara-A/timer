import { initState } from "../initState";
import { normalizeTree } from "../reducers/rootReducer";
import produce from "immer";

const { tree } = initState;
test(`normalizeTree`, () => {
  const unNormalizedTree = produce(tree, draft => {
    draft.items["someId"] = {
      id: "someId",
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        repeat: 1,
        count: 0,
        comment: ""
      }
    };
  });

  const normalizedTree = produce(unNormalizedTree, draft =>
    normalizeTree(draft)
  );
  expect(normalizedTree.items["someId"]).toBeUndefined();
  expect(normalizedTree).toEqual(tree);
});
