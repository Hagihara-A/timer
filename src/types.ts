import { List, Map } from "immutable";
import { ItemId } from '@atlaskit/tree'
export interface TreeDataIm {
    rootId: ItemId
    items: Map<ItemId, TreeItemIm>
}
interface TreeItemIm {
    id: ItemId,
    children: List<ItemId>
    hasChildren?: boolean
    isExpanded?: boolean
    isChildrenLoading?: boolean
    data?: any
}

export interface TimerItem {
    time: number
    timerState: string
    timeLimit: number
}
export interface Timers {
    [index: number]: TimerItem | Timers
}
