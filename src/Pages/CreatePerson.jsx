import axios from "axios";
import React from "react";
import Multiselect from "multiselect-react-dropdown"
import ReactFormInputValidation from "react-form-input-validation";
import { PersonDetails } from "./PersonDetails";
import { Navigate } from "react-router-dom";

export class CreatePerson extends React.Component{
    constructor(props) {
        super(props);
    this.state = {
        fields: {
            name: "",
            number: "",
        },

        city: "",
        country: "",
        languages: [],
            
        allCountries: [],
        allCities: [],
        allLanguages: [],

        errors: {},

        personCreated : false
    };

    this.form = new ReactFormInputValidation(this);
    this.form.useRules({
        name: 'required',
        number: 'required|numeric'
    })
    
    this.componentDidMount = () => {
        axios.get("https://localhost:7148/api/react/countries")
        .then (response => this.setState({allCountries: response.data})) 

        axios.get("https://localhost:7148/api/react/languages")
        .then (response => this.setState({allLanguages: response.data}))
    }

    this.form.onformsubmit = () => {

        if(!this.state.errors.name && !this.state.errors.number)
        {
            var languageList = [];
            this.state.languages.map ((language) => {
                language.map((id) => {
                    if(!languageList.includes(id.languageId))
                    languageList.push(id.languageId)
                })    
            })
            
            const person = {
                name : this.state.fields.name,
                number: this.state.fields.number,
                city: this.state.city,
                country: this.state.country,
                languages: languageList
            }
            
            fetch('https://localhost:7148/api/react/create/', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(person),
            })
            .then (response => response.status)
            .then(response => response === 201 ? <></> : alert ("Failure. Try again later!"))
            .then(this.state.personCreated = true)
            .then(this.forceUpdate())

        }
    }
                          
    this.setCountry = (e) => {
        this.setState({country : e.target.value})
    }

    this.fetchCities = (e) =>{
        axios.get("https://localhost:7148/api/react/cities/" + e)
        .then(response => this.setState({allCities: response.data}))
    }

    }
    render(){  

        const {personCreated} = this.state;

        if(personCreated){
            return(
                <Navigate to ='/People'/>
            )
        }  
        return(
        <div className="container add-person mt-5">
        <form onSubmit={this.form.handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={this.state.fields.name} onChange={this.form.handleChangeEvent} />
                <label className="error">
                    {this.state.errors.name ? this.state.errors.name : ""}
                </label> <br />
            <input type="tel" name="number" placeholder="Phone Number" value={this.state.fields.number} onChange={this.form.handleChangeEvent} data-attribute-name="phone number" /> 
                <label className="error">
                    {this.state.errors.number ? this.state.errors.number : ""}
                </label> <br />
                
            <select name="country" defaultValue={"default"} required={false} onChange={e => { this.setCountry(e); this.fetchCities(e.target.value) }}>
                <option disabled value="default">Select Country</option>
                {this.state.allCountries.map ((country) => {
                    return <option key={country.countryId} value={country.countryId}>{country.countryName}</option>     
                })} 
            </select>
            <br />
            <select name="city" defaultValue={"default"} required={false} onChange={(e => this.setState({city : e.target.value}))}>
                <option disabled value="default">Select City</option>
                {(this.state.country === "") ? <option className="italic" disabled value="default">Select Country First</option> : <></>}
                {this.state.allCities.map ((city) => {
                    return <option key={city.cityId} value={city.cityId}>{city.cityName}</option>     
                })} 
            </select>
            <br />
            <Multiselect name="languages" class="multiselect" options={this.state.allLanguages} required={true}
                onSelect={e => this.state.languages.push(e)}
                placeholder="Select Languages"
                onRemove={e => this.state.languages.pop(e)}
                displayValue="languageName"
                />
            <br />
            
            <button type="submit" className="btn btn-outline-dark">Submit</button>
        </form>
        </div>
    )
}
    
}

