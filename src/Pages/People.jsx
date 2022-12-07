import {useEffect, useState} from "react";
import axios from "axios";
import { Person } from "../components/Person";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";

export function People () {

    const [people, setPeople] = useState([]);
    const [sortState, setSortState] = useState("none");
    const sortMethods = {
    none: { method: (a, b) => null },
    descending: { method: (a, b) => a.name.localeCompare(b.name) },
    };
  
    useEffect(() => {
        axios.get("https://localhost:7148/api/react")
        .then(response => setPeople(response.data))
    }, []);
    
    if(people.length === 0)
    {
        return(
            <div className="container">
                <h4>No people found</h4>
            </div>
        )
    }
    return(
        
        <div className="container people">
            <h1 className="title">All People</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>PhoneNumber</th>
                    </tr>
                </thead>
                <tbody>
                    {people.sort(sortMethods[sortState].method).map((people) => (                 
                        <Person key={people.id} person={people} />  
                    ))}
                </tbody>
            </Table>
            <button className="btn btn-outline-dark" onClick={() => setSortState("descending")}>Sort People Alpabetically</button>
            <br />
            <Link to="/CreatePerson" className="btn btn-outline-dark mt-1">Create New Person</Link>
        </div>
    )
}