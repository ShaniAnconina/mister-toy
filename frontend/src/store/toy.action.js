import { toyService } from '../services/toy.service.js'
import { store } from './store.js'
import { SET_TOYS, SET_IS_LOADING, REMOVE_TOY, ADD_TOY, UPDATE_TOY, UNDO_REMOVE_TOY } from './toy.reducer.js'

export async function loadToys(filterBy, sortBy) {
    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        const toys = await toyService.query(filterBy, sortBy)
        store.dispatch({ type: SET_TOYS, toys })
        return toys

    } catch (err) {
        console.log('ERROR', err)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function removeToy(toyId) {
    try {
        store.dispatch({ type: REMOVE_TOY, toyId })
        await toyService.remove(toyId)
    } catch (err) {
        console.log('Had issues Removing toy', err)
        store.dispatch({ type: UNDO_REMOVE_TOY })
        console.log('Had issues Removing toy', err)
        throw err
    }
}

export async function saveToy(toy) {
    const type = (toy._id) ? UPDATE_TOY : ADD_TOY
    try {
        const savedToy = await toyService.save(toy)
        store.dispatch({ type, toy: savedToy })
        return savedToy
    } catch (err) {
        console.error('Cannot save toy:', err)
        throw err
    }
}