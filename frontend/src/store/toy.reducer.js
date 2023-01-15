import { toyService } from "../services/toy.service"

export const SET_TOYS = 'SET_TOYS'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const REMOVE_TOY = 'REMOVE_TOY'
export const UNDO_REMOVE_TOY = 'UNDO_REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_FILTER = 'SET_FILTER'
export const SET_SORT = 'SET_SORT'


const initialState = {
    toys: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter(),
    sortBy: '',
    lastRemovedToy: null
}

export function toyReducer(state = initialState, action) {
    let toys
    let lastRemovedToy
    
    switch (action.type) {
        // Toys (crud)
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }
        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }
        case REMOVE_TOY:
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state.toys, toys }
        case UNDO_REMOVE_TOY:
            ({ lastRemovedToy } = state)
            toys = [lastRemovedToy, ...state.toys]
            return { ...state, toys, lastRemovedToy: null }


        // Is loading
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        // Filter & Sort
        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }
        case SET_SORT:
            return { ...state, sortBy: action.sortBy }


        default:
            return state
    }
}


