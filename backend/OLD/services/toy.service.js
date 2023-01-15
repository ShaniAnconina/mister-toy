const fs = require('fs');
var toys = require('../data/toy.json');

module.exports = {
    query,
    get,
    remove,
    save
}

function query(filterBy, sortBy) {
    let filteredToys = toys
    if (filterBy.name) {
        const regex = new RegExp(filterBy.name, 'i')
        filteredToys = filteredToys.filter(toy => regex.test(toy.name))
    }
    if (filterBy.inStock) {
        if (filterBy.inStock === 'true') {
            filteredToys = toys.filter(toy => toy.inStock === 'true')
        }
        if (filterBy.inStock === 'false') {
            filteredToys = toys.filter(toy => toy.inStock === 'false')
        }
    }
    if (filterBy.labels.length) {
        filterBy.labels = filterBy.labels.split(',')
        filteredToys = filteredToys.filter(toy => filterBy.labels.every(i => toy.labels.includes(i)))
    }
    if (sortBy === 'createdAt') filteredToys.sort((a, b) => b.createdAt - a.createdAt)
    if (sortBy === 'price') filteredToys.sort((a, b) => a.price - b.price)
    if (sortBy === 'name') {
        filteredToys.sort((a, b) => {
            const nameA = a.name.toUpperCase()
            const nameB = b.name.toUpperCase()
            if (nameA < nameB) return -1
            if (nameA > nameB) return 1
            return 0
        })
    }
    return Promise.resolve(filteredToys)
}

function get(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('Toy not found')
    return Promise.resolve(toy)
}

function remove(toyId) {
    const idx = toys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject('No such toy')
    toys.splice(idx, 1)
    return _writeToysToFile()
}

function save(toy) {
    if (toy._id) {
        const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
        toyToUpdate.name = toy.name
        toyToUpdate.price = +toy.price
        toyToUpdate.labels = toy.labels
        toyToUpdate.inStock = toy.inStock
    } else {
        toy._id = _makeId()
        toy.createdAt = Date.now()
        toys.push(toy)
    }
    return _writeToysToFile().then(() => toy)
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function _writeToysToFile() {
    return new Promise((res, rej) => {
        const data = JSON.stringify(toys, null, 2)
        fs.writeFile('data/toy.json', data, (err) => {
            if (err) return rej(err)
            res()
        })
    })
}