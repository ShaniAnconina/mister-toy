import { asyncStorageService } from "./async-storage.service"
import { httpService } from "./http.service"
import { storageService } from "./storage.service"
import { utilService } from "./util.service"

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'


export const toyService = {
    query,
    remove,
    save,
    get,
    getEmptyToy,

}

function query() {
    // return asyncStorageService.query(STORAGE_KEY)
    return httpService.get(BASE_URL)
}

function remove(toyId) {
    // return asyncStorageService.remove(STORAGE_KEY, toyId)
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    // if (toy._id) {
    //     return asyncStorageService.put(STORAGE_KEY, toy)
    // } else {
    //     return asyncStorageService.post(STORAGE_KEY, toy)
    // }
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function get(toyId) {
    // return asyncStorageService.get(STORAGE_KEY, toyId)
    return httpService.get(BASE_URL + toyId)

}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        createdAt: Date.now(),
        inStock: 'true'
    }
}

// function _createToys() {
//     let toys = storageService.loadFromStorage(STORAGE_KEY)
//     if (!toys || !toys.length) {
//         toys = []
//         toys.push(_createToy('Doll'))
//         toys.push(_createToy('Robot'))
//         toys.push(_createToy('Cube'))
//         toys.push(_createToy('Jelly'))
//         toys.push(_createToy('Pokemon'))
//         storageService.saveToStorage(STORAGE_KEY, toys)
//     }
//     return toys
// }

// function _createToy(name = 'New Toy') {
//     return {
//         _id: utilService.makeId(),
//         name,
//         price: utilService.getRandomIntInclusive(10, 100),
//         labels: ['Doll', 'Battery Powered', 'Baby'],
//         createdAt: Date.now(),
//         inStock: 'true'
//     }
// }