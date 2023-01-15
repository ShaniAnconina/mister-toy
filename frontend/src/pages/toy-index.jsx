import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToyList } from "../cmps/toy-list";
import { loadToys, removeToy } from "../store/toy.action";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { UserMsg } from "../cmps/user-msg";
import { ToyFilter } from "../cmps/toy-filter";


export function ToyIndex() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    const sortBy = useSelector((storeState) => storeState.toyModule.sortBy)

    useEffect(() => {
        loadToys(filterBy, sortBy)
    }, [filterBy, sortBy])

    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed')
        }
        catch (err) {
            showErrorMsg('Cannot remove toy')
        }
    }

    return (
        <section className="toy-index">
            <h1>Toys</h1>
            <ToyFilter />
            <div className="main-layout">
                <UserMsg />
                <ToyList toys={toys} onRemoveToy={onRemoveToy} />
                {(!toys.length && !isLoading) && <h2 className="no-toys-title">No toys to show...</h2>}
                {isLoading && <p>Loading...</p>}
            </div>
        </section>
    )
}