import { flattenTree } from "@atlaskit/tree/dist/cjs/utils/tree";
import { MutableState } from "./types";

export const initState: MutableState = {
  tree: {
    rootId: "root",
    items: {
      root: {
        id: "root",
        children: ["0", "1", "2", "3"],
        hasChildren: true,
        isExpanded: true,
        isChildrenLoading: false
      },
      "0": {
        id: "0",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          elapsedTime: 0,
          timeLimit: 3,
          power: 130,
          comment: ""
        }
      },
      "1": {
        id: "1",
        children: ["1-0", "1-1"],
        hasChildren: true,
        isExpanded: true,
        isChildrenLoading: false,
        data: {
          repeat: 1,
          count: 0,
          comment: ""
        }
      },
      "1-0": {
        id: "1-0",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          elapsedTime: 0,
          timeLimit: 2,
          power: 260,
          comment: ""
        }
      },
      "1-1": {
        id: "1-1",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          elapsedTime: 0,
          timeLimit: 2,
          power: 260,
          comment: ""
        }
      },
      "2": {
        id: "2",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          elapsedTime: 0,
          timeLimit: 5,
          power: 260,
          comment: ""
        }
      },
      "3": {
        id: "3",
        children: ["3-0", "3-1", "3-2"],
        hasChildren: false,
        isExpanded: true,
        isChildrenLoading: false,
        data: {
          repeat: 1,
          count: 0,
          comment: ""
        }
      },
      "3-0": {
        id: "3-0",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          elapsedTime: 0,
          timeLimit: 2,
          power: 150,
          comment: ""
        }
      },
      "3-1": {
        id: "3-1",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          elapsedTime: 0,
          timeLimit: 2,
          power: 150,
          comment: ""
        }
      },
      "3-2": {
        id: "3-2",
        children: ["3-2-0", "3-2-1"],
        hasChildren: true,
        isExpanded: true,
        isChildrenLoading: false,
        data: {
          repeat: 1,
          comment: "",
          count: 0
        }
      },
      "3-2-0": {
        id: "3-2-0",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          elapsedTime: 0,
          timeLimit: 3,
          power: 150,
          comment: ""
        }
      },
      "3-2-1": {
        id: "3-2-1",
        children: [],
        hasChildren: false,
        isExpanded: false,
        isChildrenLoading: false,
        data: {
          elapsedTime: 0,
          timeLimit: 3,
          power: 150,
          comment: ""
        }
      }
    }
  },
  timers: undefined
};

initState.timers = {
  currentTimerId: "0",
  timerList: flattenTree(initState.tree),
  timerTree: initState.tree
};
