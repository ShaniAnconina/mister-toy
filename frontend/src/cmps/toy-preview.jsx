import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    console.log('toy.inStock:', toy.inStock)
    const stockStatus = (toy.inStock === 'true') ? 'In stock' : 'Out of stock'
    console.log('stockStatus:', stockStatus)

    return (
        <section className="toy-preview">
            <h1>{toy.name}</h1>
            <p>${toy.price}</p>
            <p>{stockStatus}</p>
            {/* {toy.inStock && <p>In stock</p>}
            {!toy.inStock && <p>Out of stock</p>} */}
        </section>
    )
}