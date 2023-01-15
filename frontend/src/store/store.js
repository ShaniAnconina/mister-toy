import { combineReducers, legacy_createStore as createStore } from 'redux'
import { toyReducer } from './toy.reducer.js'
import { userReducer } from './user.reducer.js'
import { reviewReducer } from './review.reducer.js'

// const { createStore, combineReducers } = Redux
const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()

const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer,
    reviewModule: reviewReducer
})

export const store = createStore(rootReducer, middleware)


