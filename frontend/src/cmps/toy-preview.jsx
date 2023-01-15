import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    const stockStatus = (toy.inStock === 'true') ? 'In stock' : 'Out of stock'
    return (
        <section className="toy-preview">
            <h3>{toy.name}</h3>
            <img src={toy.image} />
            <p>${toy.price}</p>
            <p>{stockStatus}</p>
        </section>
    )
}