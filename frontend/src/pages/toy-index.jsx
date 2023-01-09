// const { useEffect, useState } = React

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToyList } from "../cmps/toy-list";
import { loadToys, removeToy } from "../store/toy.action";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { Link } from "react-router-dom";
import { UserMsg } from "../cmps/user-msg";


export function ToyIndex() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
    }, [])


    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }


    // if (!toys) return <div>Loading...</div>
    return (
        <section className="toy-index">
            <UserMsg />
            <h1>toy index</h1>
            <button><Link to={`/toy/edit`}>Add Toy</Link></button>
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />
            {(!toys.length && !isLoading) && <h2 className="no-toys-title">No toys to show...</h2>}
            {isLoading && <p>Loading...</p>}
        </section>
    )
}