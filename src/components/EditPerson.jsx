import Multiselect from "multiselect-react-dropdown";
import { useEffect, useState } from "react";
import axios from "axios";


export function EditPerson(props){

    const [person, setPerson] = useState({
        id: props.person.id,
        name: props.person.name,
        number: props.person.phoneNumber,
        cityId: props.person.cityId,
        city: props.details.city,
        countryId: props.details.countryId,
        country: props.details.country,
        languages: props.details.languages
    })

    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [allLanguages, setAllLanguages] = useState([]);

    useEffect(() => {
       
        fetchCountries();
        fetchCities(person.countryId);
        fetchLanguages();
        console.log(person);

    }, []);

    async function fetchCountries(){
        await axios.get("https://localhost:7148/api/react/countries")
        .then (response => setCountries(response.data))
    }

    async function fetchCities (id){
        await axios.get("https://localhost:7148/api/react/cities/" + id)
        .then(response => setCities(response.data))
    }

    async function fetchLanguages (){
        await axios.get("https://localhost:7148/api/react/languages")
        .then(response => setAllLanguages(response.data))
    }
     
    const handleChange =(e)=>{
        setPerson({...person, [e.target.name]: e.target.value});

        if(e.target.name === "countryId")
        {
            fetchCities(e.target.value);
        }
         
    };

    const handleSubmit =(e)=>{
        e.preventDefault();

    };

    async function EditPerson(){
        await axios.put('https://localhost:7148/api/React/' + person)
        .then(response => response.data)
         
    }

    return(
        
        <div className="container add-person mt-5">
        <form onSubmit={handleSubmit}>

            <input type="text" name="name" onChange={handleChange} value={person.name}></input><br />

            <input type="text" name="number" onChange={handleChange} value={person.number}></input><br />

                
            <select name="countryId" onChange={handleChange}>
                {countries.map ((country) => {
                    return (
                    <option key={country.countryId} value={country.countryId}>{country.countryName}</option>  )   
                })} 
            </select>
            <br />

            <select name="cityId" onChange={handleChange}>
                {cities.map ((city) => {
                    return <option key={city.cityId} value={city.cityId}>{city.cityName}</option>     
                })} 
            </select>
            <br />

            {/* <Multiselect name="languages" class="multiselect" options={allLanguages}
                onSelect={e => setPerson.languages.}
                placeholder="Select Languages"
                onRemove={e => setPerson.languages.pop(e)}
                displayValue="languageName"
                /> 
            <br />  */}
            
            <button type="submit" className="btn btn-outline-dark btn-sm">Update</button>
        </form>
        </div>
    )
}