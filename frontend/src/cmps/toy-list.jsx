import { Link } from "react-router-dom";
import { ToyPreview } from "./toy-preview";

export function ToyList({ toys, onRemoveToy }) {

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <button className="x-btn" onClick={() => { onRemoveToy(toy._id) }}>x</button>
                    <ToyPreview toy={toy} />
                    <div>
                        <button><Link to={`/toy/${toy._id}`}>Details</Link></button>
                        <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
                    </div>
                </li>)}
        </ul>
    )
}