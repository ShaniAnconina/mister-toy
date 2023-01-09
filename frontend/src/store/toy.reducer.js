
export const SET_TOYS = 'SET_TOYS'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'


const initialState = {
    toys: [],
    isLoading: false,
}


export function toyReducer(state = initialState, action) {
    let toys

    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }
        case REMOVE_TOY:
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state.toys, toys }



        default:
            return state
    }
}


