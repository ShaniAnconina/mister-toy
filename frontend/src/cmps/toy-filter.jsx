import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toyService } from "../services/toy.service";
import { SET_FILTER, SET_SORT } from "../store/toy.reducer";
import MultipleSelectChip from "./multi-select";

export function ToyFilter() {

    const [filterBy, setFilterBy] = useState(toyService.getDefaultFilter())
    const [sortBy, setSortBy] = useState('')
    const [labels, setLabels] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: SET_FILTER, filterBy })
    }, [filterBy])

    useEffect(() => {
        dispatch({ type: SET_SORT, sortBy })
    }, [sortBy])

    useEffect(() => {
        setFilterBy((prevFilter) => ({ ...prevFilter, labels }))
    }, [labels])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterBy((prevFilter) => ({ ...prevFilter, [field]: value, labels }))
        setSortBy((prevSort) => ({ ...prevSort, [field]: value }))
    }

    function onSort({ target }) {
        let { value } = target
        setSortBy(value)
    }

    return (
        <section className="toy-filter full main-layout">
            <div className="toy-filter-container">
                <div className="filters">
                    <input type="text"
                        id="name"
                        className="name"
                        name="name"
                        placeholder="Search toy by name"
                        value={filterBy.name}
                        onChange={handleChange}
                    />

                    <select name="inStock" id="inStock" className="inStock" value={filterBy.inStock} onChange={handleChange}>
                        <option>All</option>
                        <option value='true'>In stock</option>
                        <option value='false'>Out of stock</option>
                    </select>

                    <select name="sortBy" id="sortBy" className="sortBy" onChange={onSort}>
                        <option value="">Sort by</option>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="createdAt">Created</option>
                    </select>

                    <MultipleSelectChip labels={labels} setLabels={setLabels} />
                </div>
                <button><Link to={`/toy/edit`}>Add Toy</Link></button>

            </div>
        </section>
    )
}