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

    async function loadToy() {
        try{
            const toy = await toyService.get(toyId)
            setToy(toy)
        } catch (err){
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }
    }



    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details main-layout">
            <h1>Toy: {toy.name}</h1>
            <p>Price: ${toy.price}</p>
            <button><Link to={`/toy`}>Go Back</Link></button>
            <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
        </section>
    )
}