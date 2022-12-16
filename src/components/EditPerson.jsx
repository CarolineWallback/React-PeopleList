import Multiselect from "multiselect-react-dropdown";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function EditPerson(props){

    const [person, setPerson] = useState({
        id: props.person.id,
        name: props.person.name,
        number: props.person.phoneNumber,
        cityId: props.person.cityId,
        city: props.details.city,
        countryId: props.details.countryId,
        country: props.details.country,
        languages: props.details.languages,
        languageIds: props.details.languageIds,
        languageModels: props.details.languageModels
    })

    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [allLanguages, setAllLanguages] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {    
        fetchCountries();
        fetchCities(person.countryId);
        fetchLanguages();

    }, [person.countryId]);

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
        console.log(person)   
    };

    const handleSubmit =(e)=>{
        e.preventDefault();
        setPerson({
            id: person.id,
            name: person.name,
            number: person.number,
            cityId: person.cityId,
            countryId: person.countryId,
            languageModels: person.languageModels,
        });

        console.log(person)
    };

    async function UpdatePerson(){
        await axios.put('https://localhost:7148/api/React/' , person)
        .then(response => response.status)

        navigate("/People/")
         
    }

    const onSelect = (selectedList, selectedItem) => {
        person.languageModels.push(selectedItem)
    }
    
    const onRemove = (selectedList, removedItem) => {
       person.languageModels.pop(removedItem)
    }

    return(
        
        <div className="container add-person mt-5">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label>{person.name}</label>
            <input type="text" name="name" placeholder={person.name} onChange={handleChange}></input>
            </div>
            <div className="form-group">
            <label>{person.number}</label>
            <input type="text" name="number" placeholder={person.number} onChange={handleChange}></input>
            </div>
            <div className="form-group">
            <label>{person.country}</label>
            <select name="countryId" defaultValue="default" onChange={handleChange}>
                <option value="default">{person.country}</option>
                {countries.map ((country) => {
                    if(country.countryId !== person.countryId)
                    {
                        return (
                            <option key={country.countryId} value={country.countryId}>{country.countryName}</option>  )
                    }     
                })} 
            </select>
            </div>
            <div className="form-group">
            <label>{person.city}</label>
            <select name="cityId" defaultValue={"default"} onChange={handleChange}>
                <option value="default">{person.city}</option>
                {cities.map ((city) => {
                if(city.cityId !== person.cityId)
                {
                    return <option key={city.cityId} value={city.cityId}>{city.cityName}</option>     
                    } 
                })}
                    
            </select>
            </div>

            <div className="form-group">
            <label>Languages:</label>
            <Multiselect name="languages" class="multiselect" 
                options={allLanguages}  
                selectedValues={person.languageModels} 
                onSelect={onSelect}
                onRemove={onRemove}
                displayValue="languageName"
                /> 
            </div>
            
            <button type="submit" className="btn btn-outline-dark btn-sm" onClick={() => UpdatePerson()}>Update</button>
        </form>
        </div>
    )
}