import bundlesReducer from './bundlesReducer'
import cellsReducer from './cellsReducers'
import { combineReducers } from 'redux'

const reducers = combineReducers({
    cells: cellsReducer,
    bundles: bundlesReducer
})

export default reducers;

export type RootState = ReturnType<typeof reducers>