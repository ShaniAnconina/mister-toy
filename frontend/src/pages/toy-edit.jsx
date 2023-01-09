import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service"
import { saveToy } from "../store/toy.action"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { Link, useNavigate, useParams } from "react-router-dom"

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])

    function loadToy() {
        toyService.get(toyId)
            .then((toy) => setToyToEdit(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        console.log('toyToEdit:', toyToEdit)
        saveToy(toyToEdit)
            .then(() => {
                navigate('/toy')
                showSuccessMsg('Toy saved!')
            })
            .catch(err => {
                showErrorMsg('Cannot save toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        console.log('typeof value:', typeof value)
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }


    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit toy' : 'Add toy'}</h2>

            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name: </label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name..."
                    value={toyToEdit.name}
                    onChange={handleChange}
                />

                <label htmlFor="price">Price: </label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price..."
                    value={toyToEdit.price}
                    onChange={handleChange}
                />

                <label htmlFor="inStock">In Stock? </label>
                <select name="inStock" id="inStock" value={toyToEdit.inStock} onChange={handleChange}>
                    <option value='true'>Yes</option>
                    <option value='false'>No</option>
                </select>

                <div>
                    <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy">Cancel</Link>
                </div>
            </form>
        </section>
    )
}