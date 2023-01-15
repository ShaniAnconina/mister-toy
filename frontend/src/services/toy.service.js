import { httpService } from "./http.service"

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

const BASE_URL = 'toy/'


export const toyService = {
    query,
    remove,
    save,
    get,
    getEmptyToy,
    getDefaultFilter,
}

function query(filterBy = getDefaultFilter(), sortBy) {
    const queryParams = `?name=${filterBy.name}&inStock=${filterBy.inStock}&labels=${filterBy.labels}&sortBy=${sortBy}`
    return httpService.get(BASE_URL + queryParams)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function get(toyId) {
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

function getDefaultFilter() {
    return { name: '', inStock: '', labels: [] }
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