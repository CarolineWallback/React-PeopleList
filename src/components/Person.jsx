import { Link } from "react-router-dom"

export function Person (props) {

    const person = props.person;

    return(
        <tr>
            <td>
                <p>{person.name}</p>
            </td>
            <td>
                <p>{person.phoneNumber}</p>
            </td>
            <td>
                <Link to={person.id} key={person.id} state={{ person: person }}>
                    <button className="btn btn-outline-dark" >View Details</button>
                </Link>
            </td>
        </tr>
    )

}