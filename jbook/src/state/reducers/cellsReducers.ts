import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from '../cell'

import produce from 'immer'

interface CellsState {
    loading: boolean,
    error: string | null,
    order: string[],
    data: {
        [key: string]: Cell
    }
}

const initialState: CellsState = {
    loading: false,
    error: null,
    order: [],
    data: {}
}

const reducer = produce((state: CellsState = initialState, action: Action) => {
    switch(action.type) {
        case ActionType.MOVE_CELL:
            const { direction } = action.payload
            const index = state.order.findIndex(id => id === action.payload.id)
            const targetIndex = direction === 'up' ? index - 1 : index + 1;

            if (targetIndex < 0 || targetIndex > state.order.length - 1) {
                return state
            }

            state.order[index] = state.order[targetIndex]
            state.order[targetIndex] = action.payload.id
            return state;
        case ActionType.DELETE_CELL:
            const cellId = action.payload;
            state.order = state.order.filter(id => id !== cellId)
            delete state.data[cellId]
            return state;
        case ActionType.UPDATE_CELL:
            const { id, content } = action.payload
            state.data[id].content = content
            return state;
        case ActionType.INSERT_CELL_AFTER:
            const newCell: Cell = {
                content: '',
                type: action.payload.type,
                id: randomId()
            }
            if (action.payload.id) {
                state.order.splice(state.order.findIndex(id => id === action.payload.id) + 1, 0, newCell.id)
            } else {
                state.order.unshift(newCell.id)
            }
            state.data[newCell.id] = newCell
            return state
        default:
            return state
    }
}, initialState)

const randomId = () => {
    return Math.random().toString(36).substr(2, 5);
}

export default reducer