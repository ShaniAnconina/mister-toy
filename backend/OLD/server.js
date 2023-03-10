const express = require('express')
const toyService = require('./services/toy.service.js')
const cors = require('cors')
const app = express()

// App configuration
app.use(express.json())

const corsOptions = {
    origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true
}
app.use(cors(corsOptions))


// --------- Toy API --------- //

// List
app.get('/api/toy', (req, res) => {
    const filterBy = {
        name: req.query.name,
        inStock: req.query.inStock,
        labels: req.query.labels
    }
    const sortBy = req.query.sortBy
    toyService.query(filterBy, sortBy)
        .then(toys => { res.send(toys) })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot get toys')
        })
})

// Update
app.put('/api/toy/:toyId', (req, res) => {
    const toy = req.body
    toyService.save(toy)
        .then((savedToy) => {
            res.send(savedToy)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot update toy')
        })
})

// Create
app.post('/api/toy', (req, res) => {
    const toy = req.body
    toyService.save(toy)
        .then((savedToy) => {
            res.send(savedToy)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot create toy')
        })
})

// Read
app.get('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.get(toyId)
        .then((toy) => {
            res.send(toy)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot get toy')
        })
})

// Remove
app.delete('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.remove(toyId)
        .then(() => {
            res.send({ msg: 'Toy removed successfully', toyId })
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot delete toy')
        })
})




// Listen will always be the last line in our server!
app.listen(3030, () => console.log('Server ready at port 3030! http://localhost:3030'))