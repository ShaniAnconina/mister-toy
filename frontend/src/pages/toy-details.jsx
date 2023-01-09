import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { showErrorMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.get(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    function onGoBack() {
        navigate('/toy')
    }


    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>Toy: {toy.name}</h1>
            <p>Price: ${toy.price}</p>
            <button onClick={onGoBack}>Go Back</button>
            <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
        </section>
    )
}