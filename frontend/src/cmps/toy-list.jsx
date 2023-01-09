import { Link } from "react-router-dom";
import { ToyPreview } from "./toy-preview";

export function ToyList({ toys, onRemoveToy }) {



    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div>
                        <button onClick={() => { onRemoveToy(toy._id) }}>x</button>
                        <button><Link to={`/toy/${toy._id}`}>Details</Link></button>
                        <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
                    </div>
                </li>)}
        </ul>
    )
}